import React from 'react';
import Base from 'view/base';
// import count from 'model/count';
import Header from 'view/header';
import {mode} from 'model/enums';
import SyncSummary from 'view/syncsummary';
import Drive from 'view/drive';

'use strict';

export default class Main extends Base {

	constructor(options) {
        super(options);		
    }   

    render() {
		let content = this.props.stateManager.get("mode") == mode.sync ? <SyncSummary />: <Drive />;
        return (
        	<div className="main">
				{ content }
			</div>
        );
    }
}
