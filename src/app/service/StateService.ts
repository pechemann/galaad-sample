import { Service } from '../ioc/Service';

/**
 * A basic sevice for creating new app states.
 */
export interface StateService extends Service {

    /**
     * Create new app states representations.
     * 
     * @param {string} stateName the reference to the state used to create the new representation.
     * @param {any} stateParams the properties used to resolve resource path tokens.
     */
    getState(stateName: string, stateParams?: any): any;
}