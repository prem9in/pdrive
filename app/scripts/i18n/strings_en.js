'use strict';
class Resources {
    constructor() {
        this.resources = new Map();

        // in future we can load localized text files .. at present setting this via code.
        this.resources.set('LoadingMsg', 'Loading ...');  
        this.resources.set('GreetMsg', 'Hello World!');  
        this.resources.set('CountLabel', 'Current Count Value : ');  
        this.resources.set('IncreaseMsg', 'Increase');  
        this.resources.set('DecreaseMsg', 'Decrease');
        this.resources.set('SyncSummaryLabel', 'Sync Summary');
        this.resources.set('LastSyncLabel', 'Last synced at');
        this.resources.set('BeginSyncLabel', 'Begin Sync');
        this.resources.set('DecreaseMsg', 'Decrease');
        this.resources.set('PreviousMsg', ' < Previous Page ');
        this.resources.set('NextMsg', ' Next Page > ');
       
    }
   
    getString(key) {
        let result = key;
        if (this.resources.has(key)) {
            return this.resources.get(key);
        }
        else {
            return "Key_Not_found_" + result;
        }
    }
}

const resources = new Resources();
export {
    resources as
    default
};
