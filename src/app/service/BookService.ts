import { Book } from '../business/Book';
import { CrudService } from './CrudService';

/**
 * A basic service that exposes CRUD operations over <code>Book</code> objects.
 */
export interface BookService extends CrudService<Book> {}