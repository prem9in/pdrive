import _ from 'underscore';
import React from 'react';
import Base from 'view/base';
import fileList from 'model/filelist';

'use strict';

export default class VideoThumb extends Base {
    constructor(options) {
        super(options);
         this.model = fileList;
    }

    render(){
        let fileData = this.props.file;
    	let videos = this.model.get("Videos");
    	let videoInfo = _.find(videos, function(vdo){ return vdo.Id == fileData.Id; });
    	let thBase = this.model.get("ThumbUrl");
    	let thToken = this.model.get("ThumbToken");
    	let url = thBase + fileData.FullPath + thToken;
    	if (videoInfo) {
    			return (<div className="thumbContainer">
	    					<div className="thumbCont">
	               				<img src={url}></img>
	               			</div>
                            {/* 
                            <div className="videoFileInfo">
                                <div className="col-sm-5">Name</div><div className="col-sm-7">{fileData.Name}</div>
                                <div className="col-sm-5">Duration</div><div className="col-sm-7">{videoInfo.Duration}</div>
                                <div className="col-sm-5">Resolution</div><div className="col-sm-7">{videoInfo.Height + "x" + videoInfo.Width}</div>                            
                                <div className="col-sm-5">Size</div><div className="col-sm-7">{fileData.Size}</div>
                            </div>
                            */}	               			
               		</div>);
    	} else {
			return (
                <div className="thumbContainer">
                <div className="thumbCont">
               			<img src={url}></img>               			
               		</div>
            </div>);
    	}
    	
    }
}