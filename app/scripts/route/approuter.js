import _ from 'underscore';
import Backbone from 'backbone';
import Index from 'view/index';
import stateManager from 'route/statemanager';
import appRouteMap from 'route/routemaps';
import { mode } from 'model/enums';

'use strict';

export default class AppRouter extends Backbone.Router {
    constructor() {  
        /// any runtime changes to route can be done here.    
        super(appRouteMap);
    }

    rendersync() {
           this.render({ mode: mode.sync});
    }
    
    render(state) {
       
        // set default state and change as needed via args to this method.
        let appstate = _.extend({}, state);
       
        stateManager.change(appstate);

        new Index({ el: document.body }).render();
    }   
}
