import $ from 'jquery';
import _ from 'underscore';
import React from 'react';
import Base from 'view/base';

'use strict';

export default class Photo extends Base {
    constructor(options) {
        super(options);

         this.elements = {
            contentContainer: null,
            contentImage: null,
            viewport: null,
            document: null            
        };
        
        super.registerForBind((jobject) => { this.elements.contentContainer = jobject; }, ".fullPhoto");
        super.registerForBind((jobject) => { this.elements.contentImage = jobject; }, ".fullPhotoImage");
        super.registerForBind((jobject) => { this.elements.viewport = jobject; }, window);
        super.registerForBind((jobject) => { this.elements.document = jobject; }, document);
    }

    render(){    	
    	return (<div><div className="fullPhoto"><img data-angle="0" className="fullPhotoImage rotate0" src={this.props.url} onLoad={this.imageLoaded.bind(this)} /></div>
    			<div className="navbar-fixed-bottom">
	    			<div className="controls" onClick={this.rotate.bind(this)}> Rotate </div>
	    			<div className="controls"> Close </div>
    			</div>
    		</div>);
    }

    rotate() {    	
    	let currentAngle = this.elements.contentImage.data("angle");
    	let nextAngle = currentAngle + 90;
    	if (nextAngle >= 360) { 
    		nextAngle = 0;
    	}
    	this.elements.contentImage.removeClass("rotate" + currentAngle).addClass("rotate" + nextAngle).data("angle", nextAngle);
    	this.imageLoaded();
    	this.adjustContainer();   
    }

     componentDidUpdate() {
        super.componentDidUpdate();  
        this.adjustContainer();                    
    }

    imageLoaded(){
    	let imageWidth = this.elements.contentImage.width();
    	let imageHeight = this.elements.contentImage.height();
    	let ratio = 0;
    	if (imageHeight > imageWidth) {
    		ratio = imageHeight / this.elements.contentContainer.height();
    	} else {
			ratio = imageWidth / this.elements.contentContainer.width();
    	}

    	let newWidth = imageWidth / ratio;
    	let newHeight = imageHeight / ratio;
    	this.elements.contentImage.width(newWidth);
    	this.elements.contentImage.height(newHeight);
    }

    componentWillUnmount(){
        
    }

    adjustContainer() {
        let viewPortHeight = this.elements.viewport.height();
        let viewPortWidth = this.elements.viewport.width();
        this.elements.contentContainer.width(viewPortWidth - 20);
        this.elements.contentContainer.height(viewPortHeight - 50); 
         
    }

     componentDidMount() {
       super.componentDidMount();   
       this.componentDidUpdate();      
    }
}