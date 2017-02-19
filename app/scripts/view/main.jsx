import React from 'react';
import Base from 'view/base';
// import count from 'model/count';
import Header from 'view/header';
import Footer from 'view/footer';

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
        return (
        	<div className="main">
	           <Header />
	           
	           <Footer />
			</div>
        );
    }
}
