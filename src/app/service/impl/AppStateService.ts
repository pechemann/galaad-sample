import { HateoasContext, RsHateoasContext } from 'jsax-rs';

/**
 * The defaunt implementation of the <code>AppStateService</code> interface.
 */
export class AppStateService implements AppStateService {

    /**
     * The reference to the application HATEOAS context.
     */
    @RsHateoasContext()
    private _context: HateoasContext;

    /**
     * @inheritdoc
     */
    public getName(): string {                 
        return 'StateService';
    }

    /**
     * @inheritdoc
     */
    public getState(stateName: string, stateParams?: any): any {                 
        return this._context.getResourceStateRepresentation(stateName, stateParams);
    }
}