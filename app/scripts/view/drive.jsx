/*
* Dropping the idea of infinite scroll. This requires some dedicated time.
* For now, I will go with paging solution. This is quick to get it working.
*/


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
        this.state = { 
            pageNum : 0, 
            pageSize : 100, 
            scrollNumber : 90, 
            reading : false,
            lastScroll : 0,
            render : false,
            bufferSize : 200,
            lastScrollTop: 0,
            files : []
        };
        this.elements = {
            contentContainer: null,
            viewport: null,
            scrollbarHeight: 0
        };
        
        super.registerForBind((jobject) => { this.elements.contentContainer = jobject; }, ".driveContainer");
        super.registerForBind((jobject) => { this.elements.viewport = jobject; }, window);
        super.registerForBind((jobject) => { this.elements.document = jobject; }, document);
    } 

    render() {

    	if (this.model.get("initialized")) {    		
    		let _thBase = this.model.get("ThumbUrl");
    		let _thToken = this.model.get("ThumbToken");
            let _tfiles = this.getPageData();
    		 return (
               <div className="driveContainer">	              
		              {_tfiles.map(file => 
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
            let _files = this.model.get("Files"); 
            if (_files.length > 0) {
                this.addData(_files);                
                this.setState({ render: true });
            }
        }    	
    }

    scrollContent(event) {  
        let stop = this.elements.document.scrollTop();
        let dheight = this.elements.document.height();
        let topPercentScroll = (stop / dheight) * 100;  
        let percentScroll =  ((stop + this.elements.scrollbarHeight) / dheight) * 100;
        this.state.lastScrollTop = stop;
        console.log(topPercentScroll + ' / ' + percentScroll);
        if (!this.state.reading) {
            if (percentScroll > this.state.lastScroll) {                              
                //// scrolling to bottom
                this.state.lastScroll = percentScroll; 
                if (percentScroll > this.state.scrollNumber) {
                    this.state.reading = true;
                    this.state.pageNum++; 
                    this.getData();
                }
            } else {
                //// scrolling to top
                this.state.lastScroll = topPercentScroll;
                if (topPercentScroll < (100 - this.state.scrollNumber) && this.state.pageNum > 0) {
                    this.state.reading = true;
                    this.state.pageNum--;
                    this.getData(); 
                }
            }            
        }       
    }

    addData(_files) {       
        if (this.state.files && this.state.files.length > 0) { 
            if (!this.dataAvailable()) {                
               this.state.files = this.state.files.concat(_files);
            }              
        } else {                
            this.state.files = _files;
        }   
    }

    getPageData() {
         let tfiles = [];
         if (this.state.files && this.state.files.length > this.state.bufferSize) { 
            let skipCount = this.state.files.length - this.state.bufferSize;
            if (skipCount > this.state.pageSize) {
                let sfiles = _.rest(this.state.files, skipCount);
                let yfiles = _.first(sfiles, this.state.bufferSize);
                tfiles = tfiles.concat(yfiles);
            } else {
                tfiles = tfiles.concat(this.state.files);
            }
         } else {
            tfiles = tfiles.concat(this.state.files);
         }

         return tfiles;
    }

    dataAvailable () {
        let expectedItemsCount = (this.state.pageNum + 1) * this.state.pageSize;     
        return this.state.files.length >= expectedItemsCount;
    }

    getData() {
        if (!this.dataAvailable()) {
            let skip = (this.state.pageNum * this.state.pageSize);
            let top = this.state.pageSize;
            this.model.fetch(top, skip);
        }        
    }

    componentDidUpdate() {
        super.componentDidUpdate();        
        this.adjustContainer();      
        this.elements.document.scrollTop(this.state.lastScrollTop);
        this.state.render = false;
        this.state.reading = false;  
        this.elements.document.on("scroll", () => this.scrollContent());            
    }

    componentWillUnmount(){
         this.elements.document.off("scroll");
    }

    adjustContainer() {
        let viewPortHeight = this.elements.viewport.height();
        let viewPortWidth = this.elements.viewport.width();
        this.elements.contentContainer.width(viewPortWidth - 30);
        this.elements.contentContainer.height(viewPortHeight - 1000);
        this.elements.scrollbarHeight = (this.elements.document.height() - this.elements.contentContainer[0].scrollHeight) + 1000;
    }

     componentDidMount() {
       super.componentDidMount();
       this.getData();       
    }
}
