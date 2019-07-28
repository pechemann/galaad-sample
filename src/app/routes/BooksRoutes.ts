import { Router, Request, Response } from 'express';
import { RsState, StateType, Application, TransitionMapping, RsTransition, RsMapTransition, HttpStatusCode, HttpMethod, RsTransitionFromState } from 'jsax-rs';
import { BOOK_LIST } from '../../mock/BOOK_LIST';
import { Book } from '../business/Book';
import { AppStateService } from '../util/AppStateService';

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
     * The reference to the service used to create app state representations.
     */
    private readonly _stateService: AppStateService;

    /**
     * Create a new <code>BooksRoutes</code> instance.
     * 
     * @param router the reference to the express <code>Router</code> object.
     * @param stateService the reference to the service used to create app state representations.
     */
    constructor(router: Router, stateService: AppStateService) {
        this._router = router;
        this._stateService = stateService;
        this.initRoutes();
    }

    /**
     * Initialize all app routes.
     */
    private initRoutes(): void {
        this.getBooks();
        this.getBook();
        this.deleteBook();
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
            const appState: Application = this._stateService.getState('getBooks');
            const result: any = {
                data: BOOK_LIST,
                application: appState
            };
            res.send(result);
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
            const stateParams: any = { bookId: bookId };
            const appState: Application = this._stateService.getState('getBook', stateParams);
            const book: Book = BOOK_LIST.find((book: Book)=> book.id === bookId);
            const result: any = {
                data: book,
                application: appState
            };
            const status: HttpStatusCode = book ? HttpStatusCode.OK : HttpStatusCode.NOT_FOUND;
            res.status(status).send(result);
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
        this._router.post('/books/:bookId', (req: Request, res: Response) => {
            /*const stateParams: any = { bookId: bookId };
            const appState: Application = this._stateService.getState('createBook', stateParams);
            const book: Book = BOOK_LIST.find((book: Book)=> book.id === bookId);
            const result: any = {
                data: book,
                application: appState
            };
            const status: HttpStatusCode = book ? HttpStatusCode.OK : HttpStatusCode.NOT_FOUND;
            res.status(status).send(result);*/
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
            const stateParams: any = { bookId: bookId };
            const appState: Application = this._stateService.getState('deleteBook', stateParams);
            const book: Book = BOOK_LIST.find((book: Book)=> book.id === bookId);
            if (book) {
                BOOK_LIST.splice(BOOK_LIST.indexOf(book), 1);
            }
            const status: HttpStatusCode = book ? HttpStatusCode.OK : HttpStatusCode.NOT_FOUND;
            res.status(status).send({ application: appState });
        });
    }
}