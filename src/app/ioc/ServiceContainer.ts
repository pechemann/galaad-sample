import { Service } from './Service';

/**
 * A basic container for managing app services.
 */
export class ServiceContainer {

    /**
     * The map that stores bean objects.
     */
    private readonly _services: Map<string, any> = null;

    /**
     * Create a new <code>ServiceContainer</code> instance.
     */
    constructor() {
        this._services = new Map<string, any>();
    }

    /**
     * Add the specified servie into the list of services managed by this container.
     * 
     * @param {Service} service the service to add to this container.
     */
    public register(service: Service): void {
        this._services.set(service.getName(), service);
    }

    /**
     * Return the service with the specified name.
     * 
     * @param {string} name the name of the service to get.
     * 
     * @return {T} the service with the specified name.
     */
    public get<T>(name: string): T {
        return this._services.get(name) as T;
    }
}