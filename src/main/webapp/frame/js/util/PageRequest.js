

/**
 * 页面Request
 * @param config: 
 * 		params: request.params
 * 		attributes: request.attributes
 */
function PageRequest(config) {
	var thiz = this;
	this.index = -1;
	this.params = config.params;
	this.attributes = config.attributes;
	this.OpenArguments = window.dialogArguments;
	this.ParentWindow = CU.isObject(this.OpenArguments)&&CU.isObject(this.OpenArguments.ParentWindow) ? this.OpenArguments.ParentWindow : window;
	this.OpenParams = CU.isObject(this.OpenArguments) ? this.OpenArguments.OpenParams : null;
	
	
	this.get = function(key, filterNull) {
		var v = CU.isObject(this.OpenParams) ? this.OpenParams[key] : null;
		if(CU.isEmpty(v)) v=this.getParam(key, filterNull);
		return v;
	};
	
	this.getParam = function(key, filterNull) {
		if(CU.isEmpty(thiz.params)) return null;
		var vs = thiz.params[key];
		if(CU.isArray(vs)) {
			vs = vs.length>0 ? vs[0] : "";
		}
		if(filterNull===true && (vs===undefined||vs===null)) vs = "";
		return vs===undefined ? null : vs;
	};
	this.getParams = function(key) {
		var vs = null;
		if(CU.isObject(thiz.params)) vs = thiz.params[key];
		if((vs===null||vs===undefined)&&CU.isObject(this.OpenParams)) {
			vs = this.OpenParams[key];
			if(vs!==null&&vs!==undefined&&!CU.isArray(vs))vs=[vs];
		}
		return CU.isArray(vs) ? vs : null;
	};
	this.setReturnValue = function(value) {
		window.returnValue = value;
		if(window.opener) {
			try {
				window.opener.returnValue = value;
			}catch(e) {
			}
		}
	};
	this.getAttribute = function(key) {
		if(CU.isEmpty(thiz.attributes)) return null;
		return thiz.attributes[key];
	};
	this.getParentWindow = function() {
		return thiz.ParentWindow;
	};
	this.closeWindow = function(value) {
		if(value !== undefined) thiz.setReturnValue(value);
		window.close();
	};
	
	
	this.pageInfo = null;
	
	this.moveFirst = function() {thiz.pageInfo.pageIndex=0;thiz.refreshPage();};
	this.movePrevious = function() {thiz.pageInfo.pageIndex--;thiz.refreshPage();};
	this.moveNext = function() {thiz.pageInfo.pageIndex++;thiz.refreshPage();};
	this.moveLast = function() {thiz.pageInfo.pageIndex=thiz.pageInfo.array.length-1;thiz.refreshPage();};
	this.refreshPage = function() {
		var length = thiz.pageInfo.array.length;
		var index = thiz.pageInfo.pageIndex;
		index = index<0 ? 0 : (index>=length ? length-1 : index);
		var empty = length == 0;
		thiz.pageInfo.buttons.first.setDisabled(empty||index==0);
		thiz.pageInfo.buttons.prev.setDisabled(empty||index==0);
		thiz.pageInfo.buttons.next.setDisabled(empty||index==length-1);
		thiz.pageInfo.buttons.last.setDisabled(empty||index==length-1);
		thiz.pageInfo.handler(empty?"":thiz.pageInfo.array[index], thiz.pageInfo.array);
	};
	this.setPageInfo = function(array, currid, handler) {
		if(CU.isEmpty(array))array=CU.isEmpty(currid) ? [] : [currid];
		if(thiz.pageInfo == null)thiz.getPageButtons();
		if(typeof(array)=="string")array=array.split(",");
		thiz.pageInfo.array = array;
		var pageIndex = -1;
		thiz.pageInfo.currid = CU.isEmpty(currid) ? array[0] : ((pageIndex=array.indexOf(currid))>-1 ? currid : array[0]);
		thiz.pageInfo.handler = handler;
		thiz.pageInfo.pageIndex = pageIndex==-1 ? 0 : pageIndex;
		thiz.refreshPage();
	};
	this.getPageInfo = function() {
		return thiz.pageInfo;
	};
	this.getPageButtons = function() {
		if(thiz.pageInfo == null)thiz.pageInfo = {buttons:{
			first:EF.getButton({iconCls:"x-tbar-page-first",handler:thiz.moveFirst}),
			prev:EF.getButton({iconCls:"x-tbar-page-prev",handler:thiz.movePrevious}),
			next:EF.getButton({iconCls:"x-tbar-page-next",handler:thiz.moveNext}),
			last:EF.getButton({iconCls:"x-tbar-page-last",handler:thiz.moveLast})
		}};
		return [thiz.pageInfo.buttons.first,thiz.pageInfo.buttons.prev,thiz.pageInfo.buttons.next,thiz.pageInfo.buttons.last];
	};

}