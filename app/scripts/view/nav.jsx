import React from 'react';
import Base from 'view/base';

'use strict';

export default class Nav extends Base {

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
                <nav class="navbar navbar-inverse">
                  <div class="container-fluid">
                    <div class="navbar-header">
                      <a class="navbar-brand" href="#">The Drive</a>
                    </div>                
                    <ul class="nav navbar-nav navbar-right">
                      <li><a href="#"><span class="glyphicon glyphicon-user"></span>Prem</a></li>                     
                    </ul>
                  </div>
                </nav>
	           <div className="content"> </div>
	           <footer className="footer"> </footer>
			</div>
        );
    }
}
