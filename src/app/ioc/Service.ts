/**
 * The interface that you must implement to create app services.
 */
export interface Service {

    /**
     * Return the name of theis service.
     * 
     * @return {string} name the name of theis service.
     */
    getName(): string;
}