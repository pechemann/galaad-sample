import { HateoasContext, RsHateoasContext } from 'jsax-rs';

/**
 * A basic sevice for creating new app states.
 */
export class AppStateService {

    /**
     * The reference to the application HATEOAS context.
     */
    @RsHateoasContext()
    private _context: HateoasContext;

    /**
     * Create new app states representations.
     * 
     * @param stateName the reference to the state used to create the new representation.
     * @param stateParams the properties used to resolve resource path tokens.
     */
    public getState(stateName: string, stateParams?: any): any {                 
        return this._context.getResourceStateRepresentation(stateName, stateParams);
    }
}