import _ from 'underscore';
import React from 'react';
import Base from 'view/base';

'use strict';

export default class Photo extends Base {
    constructor(options) {
        super(options);

         this.elements = {
            contentContainer: null,
            viewport: null,
            document: null            
        };
        
        super.registerForBind((jobject) => { this.elements.contentContainer = jobject; }, ".fullPhoto");
        super.registerForBind((jobject) => { this.elements.viewport = jobject; }, window);
        super.registerForBind((jobject) => { this.elements.document = jobject; }, document);
    }

    render(){    	
    	return (<div className="fullPhoto"></div>
    		);
    }

     componentDidUpdate() {
        super.componentDidUpdate();  
        this.adjustContainer();                    
    }

    componentWillUnmount(){
        
    }

    adjustContainer() {
        let viewPortHeight = this.elements.viewport.height();
        let viewPortWidth = this.elements.viewport.width();
        this.elements.contentContainer.width(viewPortWidth - 20);
        this.elements.contentContainer.height(viewPortHeight - 20); 
        this.elements.contentContainer.css("background-image", "url('" + this.props.url + "')");   
    }

     componentDidMount() {
       super.componentDidMount();   
       this.componentDidUpdate();      
    }
}