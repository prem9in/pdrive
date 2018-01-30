import _ from 'underscore';
import React from 'react';
import Base from 'view/base';

'use strict';

export default class PagingControls extends Base {
    constructor(options) {
        super(options);
    }

    render() {
    	if (this.props.showPagingControls) {
    		let items = [];
    		items.push(this.renderPrevious());
    		items.push(this.renderCurrent());
    		items.push(this.renderNext());
    		return (<div className="pagingControls navbar-fixed-bottom">{items}</div>);
    	} else {
    		return null;
    	}
    }

    renderCurrent() {
    	return (
    		<div className="currentPage">{this.props.pageNum + 1} of {this.props.totalPage}</div>
    	);
    }

    renderPrevious() {
    	if (this.props.pageNum > 0) {
    		return (
    			<div className="previous" onClick={this.props.prevHandler}>{this.props.resources.getString("PreviousMsg")}</div>
    			);
    	} else {
    		return (<div className="emptyPrevious">&nbsp;</div>);
    	}
    }

     renderNext() {
    	if (this.props.pageNum < this.props.totalPage) {
    		return (
    			<div className="next" onClick={this.props.nextHandler}>{this.props.resources.getString("NextMsg")}</div>
    			);
    	} else {
    		return  (<div className="emptyNext">&nbsp;</div>);;
    	}
    }
}
