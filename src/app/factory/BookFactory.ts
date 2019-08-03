import { Book } from '../business/Book';

/**
 * A basic factory for creating new <code>Book</code> objects.
 */
export class BookFactory {

    /**
     * Create and return a new <code>Book</code> object, built for the specified context.
     * 
     * @param {any} context the initialization context used to build the new <code>Book</code> object.
     * 
     * @return {Book} a new <code>Book</code> object.
     */
    public create(context: any): Book {
        const name: string = context.name;
        const bookId: string = name.replace(' ', '-').toLowerCase();
        return {
            id: bookId,
            name: name,
            author: context.author,
            year: context.year
        };
    }
}