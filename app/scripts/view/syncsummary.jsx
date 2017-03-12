import React from 'react';
import Base from 'view/base';

'use strict';

export default class SyncSummary extends Base {

	constructor(options) {
        super(options);		
    }

    beginSync() {
	    
    }

    render() {
        return (
            <section>
               <div>{this.props.resources.getString("SyncSummaryLabel")}</div>
                <div>{this.props.resources.getString("LastSyncLabel") + ": yyyy-MM-dd HH:mm" }</div>
                <p>
                    <button type="button" onClick={this.beginSync.bind(this)} className="btn btn-primary">{this.props.resources.getString("BeginSyncLabel")}</button>
                </p>
            </section>
        );
    }
}
