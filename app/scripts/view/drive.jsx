import $ from 'jquery';
import _ from 'underscore';
import React from 'react';
import Base from 'view/base';
import fileList from 'model/filelist';
import VideoThumb from 'view/videothumb';
import PhotoThumb from 'view/photothumb';

'use strict';

export default class Drive extends Base {

	constructor(options) {
        super(options);		
        this.model = fileList;
        this.model.on('change', () => {
                        this.update();
                    });
        this.state = { pageNum : 0, pageSize: 100, scrollNumber : 0 };
        this.elements = {
            contentContainer: null,
            viewport: null
        };
        
        super.registerForBind((jobject) => { this.elements.contentContainer = jobject; }, ".driveContainer");
        super.registerForBind((jobject) => { this.elements.viewport = jobject; }, window);
    } 

    render() {

    	if (this.model.get("initialized")) {
    		let _files = this.model.get("Files");
    		let tFiles = _.first(_files, 100); 
    		let _thBase = this.model.get("ThumbUrl");
    		let _thToken = this.model.get("ThumbToken");
    		 return (
               <div className="driveContainer">	              
		              {tFiles.map(file => 
		               		this.renderItem(file, _thBase, _thToken)
		           	)}
               </div>
	        );
    	} else {
        return (
               <div>{this.props.resources.getString("LoadingMsg")}</div>
	        );
	    }
    }

    renderItem(file, thBase, thToken) {
    	let url = thBase + file.FullPath + thToken;
        if (file.Type == "Photo") {
            return (<PhotoThumb file={file} />
                );
        } else if (file.Type == "Video") {
            return (<VideoThumb file={file} />
                            );
        } else {
            return (<div className="thumbCont">
                        <img src={url}></img>
                    </div>);
        }    	
    }

    update() {
        if (this.model.get("initialized")) {
            let files = this.model.get("Files");
            if (files.length > 0) {
                let currentPageNumber = this.state.pageNum;
                this.setState({
                    pageNum: 1
                });
            }
        }    	
    }

    scrollContent(event) {
        console.log('scroll');
    }

    getData() {
        let skip = (this.state.pageNum * this.state.pageSize);
        let top = this.state.pageSize;
        this.model.fetch(top, skip);
    }

    componentDidUpdate() {
        super.componentDidUpdate();        
        this.adjustContainer();      
        this.elements.viewport.scroll(() => this.scrollContent);
    }

    componentWillUnmount(){
         
    }

    adjustContainer() {
        let viewPortHeight = this.elements.viewport.height();
        let viewPortWidth = this.elements.viewport.width();
        this.elements.contentContainer.width(viewPortWidth - 30);
        this.elements.contentContainer.height(viewPortHeight - 1000);
    }

     componentDidMount() {
       super.componentDidMount();
       this.getData();       
    }
}
