import React from 'react';
import Base from 'view/base';
// import count from 'model/count';
import Header from 'view/header';
import Footer from 'view/footer';
import {mode} from 'model/enums';
import SyncSummary from 'view/syncsummary';
import Drive from 'view/drive';

'use strict';

export default class Main extends Base {

	constructor(options) {
        super(options);
		/*
		this.state = { countModel: count };
		this.registerForChange(this.state.countModel);
		this.registerForFetch(this.state.countModel);
		*/
    }

   

    render() {
		debugger;
		let content = this.props.stateManager.get("mode") == mode.sync ? <SyncSummary />: <Drive />;
        return (
        	<div className="main">
	           <Header />
				{ content }
	           <Footer />
			</div>
        );
    }
}
