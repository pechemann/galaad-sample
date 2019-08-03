import { Router, Request, Response } from 'express';
import { RsState, StateType, Application, TransitionMapping, RsTransition, RsMapTransition, HttpStatusCode, HttpMethod, RsTransitionFromState } from 'jsax-rs';
import { Book } from '../business/Book';
import { AppStateService } from '../util/AppStateService';
import { ServiceContainer } from '../ioc/ServiceContainer';
import { BookService } from '../service/BookService';

/**
 * The routes associated with the <code>books</code> resource. Allows to manage a collection of <code>Book</code>
 * objects.
 */
export class BooksRoutes {

    /**
     * Defines the transition for the <code>books</code> resource and the <code>GET</code> HTP method.
     */
    @RsTransitionFromState('getBooks')
    public getBooksTransition: TransitionMapping;

    /**
     * Defines the transition for the <code>books/:bookId</code> resource and the <code>GET</code> HTP method.
     */
    @RsTransitionFromState('getBook')
    public getBookTransition: TransitionMapping;

    /**
     * The reference to the express <code>Router</code> object.
     */
    private readonly _router: Router;

    /**
     * The reference to the express <code>Router</code> object.
     */
    private readonly _bookService: BookService;

    /**
     * The reference to the service used to create app state representations.
     */
    private readonly _stateService: AppStateService;

    /**
     * Create a new <code>BooksRoutes</code> instance.
     * 
     * @param {ServiceContainer} container the reference to the app <code>ServiceContainer</code> object.
     * @param {Router} router the reference to the express <code>Router</code> object.
     * @param {AppStateService} stateService the reference to the service used to create app state representations.
     */
    constructor(container: ServiceContainer, router: Router, stateService: AppStateService) {
        this._router = router;
        this._stateService = stateService;
        this._bookService = container.get<BookService>('BookService');
        this.initRoutes();
    }

    /**
     * Initialize all app routes.
     */
    private initRoutes(): void {
        this.getBooks();
        this.getBook();
        this.deleteBook();
        this.updateBook();
        this.createBook()
    }

    /**
     * Define the route to get all books from the collection. 
     */
    @RsState({
        resource: '/books',
        type: StateType.COLLECTION,
        method: HttpMethod.GET
    })
    private getBooks(): void {
        this._router.get('/books', (req: Request, res: Response) => {
            this._bookService.readAll((err: any, books: Book[])=> {
                if (err) {
                    res.sendStatus(HttpStatusCode.INTERNAL_SERVER_ERROR);
                } else {
                    const appState: Application = this._stateService.getState('getBooks');
                    const result: any = {
                        data: books,
                        application: appState
                    };
                    res.send(result);
                }
            });
        });
    }
    
    /**
     * Define the route to get the book, with the specified ID, from the collection. 
     */
    @RsState({
        resource: '/books/:bookId',
        type: StateType.COLLECTION,
        method: HttpMethod.GET
    })
    @RsTransition({
        resource: '/books/:bookId',
        type: StateType.COLLECTION,
        method: HttpMethod.DELETE
    })
    @RsMapTransition('getBooksTransition')
    private getBook(): void {
        this._router.get('/books/:bookId', (req: Request, res: Response) => {
            const bookId: string = req.params.bookId;
            this._bookService.read(bookId, (err: any, book: Book)=> {
                if (err) {
                    res.sendStatus(HttpStatusCode.INTERNAL_SERVER_ERROR);
                } else {
                    const stateParams: any = { bookId: bookId };
                    const appState: Application = this._stateService.getState('getBook', stateParams);
                    const result: any = {
                        data: book,
                        application: appState
                    };
                    const status: HttpStatusCode = book ? HttpStatusCode.OK : HttpStatusCode.NOT_FOUND;
                    res.status(status).send(result);
                }
            });
        });
    }

    /**
     * Define the route to add book to the collection. 
     */
    @RsState({
        resource: '/books',
        type: StateType.COLLECTION,
        method: HttpMethod.POST
    })
    @RsMapTransition('getBookTransition')
    @RsMapTransition('getBooksTransition')
    private createBook(): void {
        this._router.post('/books', (req: Request, res: Response) => {
            const data: Book = req.body;
            this._bookService.create(data, (err: any, id: string)=> {
                const stateParams: any = { bookId: id };
                const appState: Application = this._stateService.getState('createBook', stateParams);
                if (err) {
                    res.sendStatus(HttpStatusCode.INTERNAL_SERVER_ERROR);
                } else {
                    const result: any = {
                        data: id,
                        application: appState
                    };
                    res.status(HttpStatusCode.CREATED).send(result);
                }
            });
        });
    }
    
    /**
     * Define the route to add book to the collection. 
     */
    @RsState({
        resource: '/books/:bookId',
        type: StateType.COLLECTION,
        method: HttpMethod.PUT
    })
    @RsMapTransition('getBookTransition')
    @RsMapTransition('getBooksTransition')
    private updateBook(): void {
        this._router.put('/books/:bookId', (req: Request, res: Response) => {
            const data: Book = req.body;
            const bookId: string = req.params.bookId;
            this._bookService.update(data, (err: any)=> {
                const stateParams: any = { bookId: bookId };
                const appState: Application = this._stateService.getState('updateBook', stateParams);
                if (err) {
                    res.sendStatus(err);
                } else {
                    const result: any = {
                        application: appState
                    };
                    res.status(HttpStatusCode.OK).send(result);
                }
            });
        });
    }
    
    /**
     * Define the route to remove the book, with the specified ID, from the collection. 
     */
    @RsState({
        resource: '/books/:bookId',
        type: StateType.COLLECTION,
        method: HttpMethod.DELETE
    })
    @RsMapTransition('getBooksTransition')
    private deleteBook(): void {
        this._router.delete('/books/:bookId', (req: Request, res: Response) => {
            const bookId: string = req.params.bookId;
            this._bookService.delete(bookId, (err: any, found: boolean)=> {
                if (err) {
                    res.sendStatus(HttpStatusCode.INTERNAL_SERVER_ERROR);
                } else {
                    const stateParams: any = { bookId: bookId };
                    const appState: Application = this._stateService.getState('deleteBook', stateParams);
                    const status: HttpStatusCode = found ? HttpStatusCode.OK : HttpStatusCode.NOT_FOUND;
                    res.status(status).send({ application: appState });
                }
            });
        });
    }
}