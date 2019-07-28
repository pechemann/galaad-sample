/**
 * A basic interface to represent books in the application.
 */
export interface Book {

    /**
     * The unique identifier of the book in the book collection.
     */
    id: string;
    
    /**
     * The name of the book.
     */
    name: string;
    
    /**
     * The author of the book.
     */
    author: string;
    
    /**
     * The publish date of the book.
     */
    year: string;
}