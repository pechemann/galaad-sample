import { Router } from 'express';
import { BooksRoutes } from '../routes/BooksRoutes';
import { AppStateService } from '../service/impl/AppStateService';
import { ServiceContainer } from '../ioc/ServiceContainer';
import { BookServiceMock } from '../../mock/BookServiceMock';

/**
 * The factory responsible for creating all routes managed by the app router.
 */
export class RoutesFactory {

    /**
     * The reference to the express <code>Router</code> object.
     */
    private readonly _router: Router;

    /**
     * The reference to the app <code>ServiceContainer</code> object.
     */
    private readonly _container: ServiceContainer;

    /**
     * Create a new <code>RoutesFactory</code> instance.
     * 
     * @param {ServiceContainer} container the reference to the app <code>ServiceContainer</code> object.
     * @param {Router} router the reference to the express <code>Router</code> object. 
     */
    constructor(container: ServiceContainer, router: Router) {
        this._router = router;
        this._container = container;
        this.initServices();
    }

    /**
     * Create a new <code>RoutesFactory</code> instance.
     * 
     * @param {ServiceContainer} container the reference to the app <code>ServiceContainer</code> object.
     * @param {Router} router the reference to the express <code>Router</code> object.
     */
    public static build(container: ServiceContainer, router: Router): RoutesFactory {
        return new RoutesFactory(container, router);
    }

    /**
     * Initialize all app services.
     */
    private initServices(): void {
        this._container.register(new AppStateService());
        this._container.register(new BookServiceMock());
    }

    /**
     * Create all app routes.
     */
    public createRoutes(): void {
        new BooksRoutes(this._container, this._router);
    }
}