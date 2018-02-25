import _ from 'underscore';
import React from 'react';
import Base from 'view/base';
import fileList from 'model/filelist';

'use strict';

export default class PhotoThumb extends Base {
    constructor(options) {
        super(options);
         this.model = fileList;
    }

    render(){
    	let fileData = this.props.file;
    	let photos = this.model.get("Photos");
    	let photoInfo = _.find(photos, function(photo){ return photo.Id == fileData.Id; });
    	let thBase = this.model.get("ThumbUrl");
    	let thToken = this.model.get("ThumbToken");
    	let url = thBase + fileData.FullPath + thToken;
    	if (photoInfo) {
    			return (<div className="thumbContainer">
	    					<div className="thumbCont">
	               				<img src={url} onClick={this.handleShowFile.bind(this)}></img>
	               			</div>
                            {/* 
                            <div className="photoFileInfo">
                                <div className="col-sm-5">Name</div><div className="col-sm-7">{fileData.Name}</div>
                                <div className="col-sm-5">Camera</div><div className="col-sm-7">{photoInfo.CameraMake + " " + photoInfo.CameraModel}</div>
                                <div className="col-sm-5">Resolution</div><div className="col-sm-7">{photoInfo.Height + "x" + photoInfo.Width}</div>
                                <div className="col-sm-5">Taken</div><div className="col-sm-7">{photoInfo.TakenDateTime}</div>
                                <div className="col-sm-5">Size</div><div className="col-sm-7">{fileData.Size}</div>
                            </div>
                            */}	               			
               			</div>);
    	} else {
			return (
                <div className="thumbContainer">
                <div className="thumbCont">
               			<img src={url} onClick={this.handleShowFile.bind(this)}></img>               			
               		</div>
                </div>);
    	}
    	
    }

    handleShowFile() {
        this.props.showHandler(this.props.file);
    }
}