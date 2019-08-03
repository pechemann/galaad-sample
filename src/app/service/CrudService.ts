import { Service } from '../ioc/Service';

/**
 * A generic service that exposes CRUD operations.
 */
export interface CrudService<T> extends Service {

    /**
     * Find a list of all items registered in the associated dataset.
     * 
     * @param {Function} callback the callback method invoked at the end of this process.
     */
    readAll(callback: (error: any, data: Array<T>)=> void): void;

    /**
     * Find the item with the specified ID in the list registered in the associated dataset.
     * 
     * @param {string} id the ID of the item to find.
     * @param {Function} callback the callback method invoked at the end of this process.
     */
    read(id: string, callback: (error: any, data: T)=> void): void;

    /**
     * Remove the item with the specified ID from the list registered in the associated dataset.
     * 
     * @param {string} id the ID of the item to remove.
     * @param {Function} callback the callback method invoked at the end of this process.
     */
    delete(id: string, callback: (error: any, found: boolean)=> void): void;
    
   /**
    * Create a new item initialized with the specified data.
    * 
    * @param {any} data the data used to initialize the item to create.
    * @param {Function} callback the callback method invoked at the end of this process.
    */
   create(data: any, callback: (error: any, id: string)=> void): void;

   /**
    * Update the specified item.
    * 
    * @param {T} item the item to update.
    * @param {Function} callback the callback method invoked at the end of this process.
    */
   update(item: T, callback: (error: any)=> void): void;
}