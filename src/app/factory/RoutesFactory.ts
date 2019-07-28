import { Router } from 'express';
import { BooksRoutes } from '../routes/BooksRoutes';
import { AppStateService } from '../util/AppStateService';

/**
 * The factory responsible for creating all routes managed by the app router.
 */
export class RoutesFactory {

    /**
     * The reference to the express <code>Router</code> object.
     */
    private readonly _router: Router;

    /**
     * Create a new <code>RoutesFactory</code> instance.
     * 
     * @param router the reference to the express <code>Router</code> object.
     */
    constructor(router: Router) {
        this._router = router;
    }

    /**
     * Create a new <code>RoutesFactory</code> instance.
     * 
     * @param router the reference to the express <code>Router</code> object.
     */
    public static build(router: Router): RoutesFactory {
        return new RoutesFactory(router);
    }

    /**
     * Create all app routes.
     */
    public createRoutes(): void {
        const stateService: AppStateService = new AppStateService();
        new BooksRoutes(this._router, stateService);
    }
}