import _ from 'underscore';
import React from 'react';
import Base from 'view/base';
import fileList from 'model/filelist';
import VideoThumb from 'view/videothumb';
import PhotoThumb from 'view/photothumb';
import PagingControls from 'view/pagingcontrols';
import Video from 'view/video';
import Photo from 'view/photo';

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
            scrollNumber : 95, 
            reading : false,
            lastScroll : 0,
            render : false,
            lastScrollTop: 0,
            files : [],
            showPagingControls: false,
            totalPage: 5,
            mode: 0,
            selectedFile : {
                index: 0,
                file: null
            }
        };

        this.elements = {
            contentContainer: null,
            viewport: null,
            scrollbarHeight: 0,
            document: null
        };
        
        super.registerForBind((jobject) => { this.elements.contentContainer = jobject; }, ".driveContainer");
        super.registerForBind((jobject) => { this.elements.viewport = jobject; }, window);
        super.registerForBind((jobject) => { this.elements.document = jobject; }, document);
    } 

    render() {

    	if (this.model.get("initialized")) {  
            if (this.state.mode == 1) {
                let _fBase = this.model.get("Url");
                let _fToken = this.model.get("DriveToken");
                let _ffile = this.state.selectedFile.file;
                let _furl = _fBase + _ffile.FullPath + _fToken;
                if (_ffile.Type == "Photo") {
                    return (<Photo selectedFile={this.state.selectedFile} url={_furl} closeHandler={this.handleClose.bind(this)} swipeHandler={this.handleSwipe.bind(this)} />
                        );
                } else if (_ffile.Type == "Video") {
                    return (<Video selectedFile={this.state.selectedFile} closeHandler={this.handleClose.bind(this)} swipeHandler={this.handleSwipe.bind(this)} />
                                    );
                }
            } else {
                let _thBase = this.model.get("ThumbUrl");
                let _thToken = this.model.get("ThumbToken");
                let _tfiles = this.getPageData();
                 return (
                    <div>
                        <div className="driveContainer">                  
                              {_tfiles.map(file => 
                                    this.renderItem(file, _thBase, _thToken)
                            )}
                       </div>
                       <PagingControls showPagingControls={this.state.showPagingControls} pageNum={this.state.pageNum} totalPage={this.state.totalPage} nextHandler={this.handleNextPage.bind(this)} prevHandler={this.handlePrevPage.bind(this)}></PagingControls>
                   </div>
                );
            } 		
    		
    	} else {
        return (
               <div>{this.props.resources.getString("LoadingMsg")}</div>
	        );
	    }
    }

    handleClose(selectedFile) {

    }

    handleSwipe(selectedFile, swipe) {

    }

    renderItem(file, thBase, thToken) {
    	let url = thBase + file.FullPath + thToken;
        if (file.Type == "Photo") {
            return (<PhotoThumb file={file} showHandler={this.handleShowFile.bind(this)} />
                );
        } else if (file.Type == "Video") {
            return (<VideoThumb file={file} showHandler={this.handleShowFile.bind(this)} />
                            );
        } else {
            return (<div className="thumbCont">
                        <img src={url} onClick={this.handleShowFile.bind(this)}></img>
                    </div>);
        }    	
    }

    handleShowFile(selectedFile) {
        let fileIndex = _.find(this.state.files, function(file){ return file.Id == selectedFile.Id; });
        this.state.selectedFile.index = fileIndex;
        this.state.selectedFile.file = selectedFile;
        this.state.mode = 1;
        this.setState({ render: true });
    }

    handleNextPage() {         
         if (!this.state.reading && this.state.pageNum <  this.state.totalPage) {           
            this.state.pageNum++;                
            this.freeze();
         }                
    }

    handlePrevPage() {
        if (!this.state.reading && this.state.pageNum > 0) {           ;
            this.state.pageNum--; 
            this.freeze();
        }          
    }

    freeze() {
        this.state.reading = true;
        this.state.lastScrollTop = 0; 
        this.model.set({initialized: false}, {silent: true});  
        this.getData();
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
        let percentScroll =  ((stop + this.elements.scrollbarHeight) / dheight) * 100;
        if (!this.state.reading) {  
            if (percentScroll > this.state.lastScroll) {                              
                //// scrolling to bottom
                if (percentScroll > this.state.scrollNumber) {
                   this.setState({ showPagingControls: true });                   
                }
            } else if (percentScroll < this.state.lastScroll) {                              
                //// scrolling to top
                if (percentScroll <= this.state.scrollNumber) {
                   this.setState({ showPagingControls: false });                   
                }
            } 

            this.state.lastScrollTop = stop;
            this.state.lastScroll = percentScroll;     
        } else {
             //// stop scroll
             this.elements.document.scrollTop(this.state.lastScrollTop);
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

        let tcount = this.model.get("TotalCount"); 
        this.state.totalPage = Math.ceil(tcount / this.state.pageSize);
    }

    getPageData() {
         let tfiles = [];
         if (this.state.files) {
             if (this.state.files.length <= this.state.pageSize) { 
                tfiles = this.state.files;
             } else {
                let skip = (this.state.pageNum * this.state.pageSize);
                let top = this.state.pageSize;
                let xfiles = _.rest(this.state.files, skip);
                let yfiles = _.first(xfiles, top);
                tfiles = yfiles;
             }
         }

         return tfiles;
    }

    dataAvailable () {
        let expectedItemsCount = (this.state.pageNum + 1) * this.state.pageSize;     
        return this.state.files.length >= expectedItemsCount;
    }

    getData() {
        if (this.dataAvailable()) {
           this.model.set({initialized: true}, {silent: true});   
           this.setState({ render: true });
        } else {            
            let skip = (this.state.pageNum * this.state.pageSize);
            let top = this.state.pageSize;
            this.model.fetch(top, skip);
        }       
    }

    componentDidUpdate() {
        super.componentDidUpdate();        
        this.adjustContainer();
        this.state.render = false;
        this.state.reading = false;  
        this.elements.document.on("scroll", () => this.scrollContent());            
    }

    componentWillUnmount(){
         this.elements.document.off("scroll");
    }

    adjustContainer() {
        if (this.state.mode == 0) {
            let viewPortHeight = this.elements.viewport.height();
            let viewPortWidth = this.elements.viewport.width();
            this.elements.contentContainer.width(viewPortWidth - 30);
            this.elements.contentContainer.height(viewPortHeight - 1000);
            this.elements.scrollbarHeight = (this.elements.document.height() - this.elements.contentContainer[0].scrollHeight) + 1000;
            if (this.state.lastScrollTop == 0) {
                this.elements.document.scrollTop(this.state.lastScrollTop);
            } 
        }            
    }

     componentDidMount() {
       super.componentDidMount();
       this.getData();       
    }
}
