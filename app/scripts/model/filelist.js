import _ from 'underscore';
import Backbone from 'backbone';
import Base from 'model/base';


'use strict';

class FileList extends Base {
    

    get url() {
        return 'https://cfunc.azurewebsites.net/api/list?code=1fPMnpFSGVCX3qMGVa4KsBrXYWvIdEuKIj0pjxi8ON9BX5bfY0zeRA=='; 
        //return 'http://localhost:7071/api/list'; 
    }

    defaults() {
        return {
            "Url": "",
            "ThumbUrl": "",
            "Photos": [],
            "Files": [],
            "DriveToken": "",
            "ThumbToken": "",
            "initialized": false,
            "TotalCount": 0
        }
    }   

    fetch(top, skip) {
       var options = { url : this.url };
       options.url = options.url + "&top=" + top + "&skip=" + skip;
       super.fetch(options);
    }

    parse(response, options) {
        if (response) {
             return _.extend(this.defaults(), {
                initialized: true
            }, response);
        }
        return _.extend(this.defaults(), {
            initialized: true
        });
    }

    save() {
        throw 'Save is not supported on FileList';
    }
}

const fileList = new FileList();
export {
    fileList as
    default
};
