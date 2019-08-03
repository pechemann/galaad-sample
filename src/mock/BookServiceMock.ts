
import { BookService } from '../app/service/BookService';
import { Book } from '../app/business/Book';
import { BOOK_LIST } from './BOOK_LIST';
import { BookFactory } from '../app/util/BookFactory';
import { HttpStatusCode } from 'jsax-rs';

/**
 * A mock service that manages <code>Book</code> objects.
 */
export class BookServiceMock implements BookService {

    /**
     * The factory used to create new <code>Book</code> objects.
     */
    private readonly _bookFactory: BookFactory = null;

    /**
     * Create a new <code>BookServiceMock</code> instance.
     */
    constructor() {
        this._bookFactory = new BookFactory();
    }

    /**
     * @inheritdoc
     */
    public getName(): string {
        return 'BookService';
    }

    /**
     * @inheritdoc
     */
    public readAll(callback: (error: any, data: Array<Book>)=> void): void {
        callback(null, BOOK_LIST);
    }

    /**
     * @inheritdoc
     */
    public read(id: string, callback: (error: any, data: Book)=> void): void {
        const book: Book = BOOK_LIST.find((book: Book)=> book.id === id);
        callback(null, book);
    }

    /**
     * @inheritdoc
     */
    public delete(id: string, callback: (error: any, found: boolean)=> void): void {
        const book: Book = BOOK_LIST.find((book: Book)=> book.id === id);
        if (book) {
            BOOK_LIST.splice(BOOK_LIST.indexOf(book), 1);
        }
        callback(null, book ? true : false);
    }

    /**
     * @inheritdoc
     */
    public create(data: any, callback: (error: any, id: string)=> void): void {
        const book: Book = this._bookFactory.create(data);
        BOOK_LIST.push(book);
        callback(null, book.id);
    }

    /**
     * @inheritdoc
     */
    public update(data: any, callback: (error: any)=> void): void {
        const book: Book = BOOK_LIST.find((item: Book)=> {
            return item.id === data.id;
        });
        if (book) {
            book.name = data.name;
            book.author = data.author;
            book.year = data.year;
            callback(null);
        } else {
            callback(HttpStatusCode.NOT_FOUND);
        }
    }
}