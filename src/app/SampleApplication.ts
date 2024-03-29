import express from 'express';
import { Express, Router } from 'express';
import { RsApplication, ApplicationContext, RsHateoasContext, HateoasContext } from 'jsax-rs';
import { RoutesFactory } from './factory/RoutesFactory';
import { ServiceContainer } from './ioc/ServiceContainer';

/**
 * JSAX-RS HATEOAS / Galaad sample application.
 */
@RsApplication({
    name:       'galaad-sample',
    apiPath:    '/api'
})
export class SampleApplication {

    /**
     * The reference to the application HATEOAS context.
     */
    @RsHateoasContext()
    private _context: HateoasContext;

    /**
     * Start the application.
     */
    public run(): void {
        const app: Express = express();
        const router: Router = Router();
        const container: ServiceContainer = new ServiceContainer();
        const context: ApplicationContext = this._context.getApplicationContext();
        const apiPath: string = context.getApiPath();
        RoutesFactory.build(container, router).createRoutes();
        app.use(express.json());
        app.use(apiPath, router);
        app.listen(3000);
        console.log(`application "${context.getName()}" listening on port 3000`);
        console.log(`application api path is "${apiPath}"`);
    }
}