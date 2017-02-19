import React from 'react';
import Base from 'view/base';
import count from 'model/count';

'use strict';

export default class Main extends Base {

	constructor(options) {
        super(options);
		this.state = { countModel: count };
		this.registerForChange(this.state.countModel);
		this.registerForFetch(this.state.countModel);
    }

    increase() {
    	let newValue = this.state.countModel.get("value") + 1;
    	this.state.countModel.set({value: newValue});
    }

    decrease() {
    	let newValue = this.state.countModel.get("value") - 1;
    	this.state.countModel.set({value: newValue});
    }

    render() {
        return (
        	<div className="main">
	           <header className="header"> </header>
	           <div className="content"> </div>
	           <footer className="footer"> </footer>
			</div>
        );
    }
}
