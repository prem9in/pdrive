import React from 'react';
import Base from 'view/base';

'use strict';

export default class Header extends Base {

	constructor(options) {
        super(options);		
    }


    render() {
        return (
               <nav className="navbar navbar-inverse navbar-fixed-top">
                  <div className="container-fluid">
                    <div className="navbar-header">
                      <a className="navbar-brand" href="#">The Drive</a>
                    </div>                
                    <ul className="nav navbar-nav navbar-right">
                      <li><a href="#"><span className="glyphicon glyphicon-user"></span>Prem</a></li>                     
                    </ul>
                  </div>
                </nav>	        
        );
    }
}
