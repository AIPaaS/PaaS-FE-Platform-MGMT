
/**
 * extends: Ext.Panel
 * @param {} config
 * 		fileSize: 缺省为10  单位为MB
 * 		fileTypes: 缺省为: *.*
 * 		fieldLabel: 
 * 		labelWidth: 缺省68
 *      textWidth: 缺省30
 *      labelAlign: 缺省为right
 * 		disable: 是否不可编辑
 */
Ext.ux.PrettyUploadTextField = Ext.extend(Ext.ux.PrettyTextField, {
	setDisabled : function(disable) {
		Ext.ux.PrettyUploadTextField.superclass.setDisabled.call(this, true);
	},
	setReadOnly : function (readOnly) {
	}
});
Ext.ux.PrettyUploadField = function(config) {
	var thiz = this;
	
	if(CU.isEmpty(config)) config = {};
	
	thiz.fileSize = CU.isEmpty(config.fileSize) ? 10 : config.fileSize;
	thiz.fileTypes = CU.isEmpty(config.fileTypes) ? "*.*" : config.fileTypes;
	
	config.layout = "column";
	config.border = false;
	var width = config.width;
	var btnwidth = 20;
	if(!CU.isEmpty(width)) config.width = width - btnwidth;
	
	if(config.allowBlank===false&&!CU.isEmpty(config.fieldLabel)) config.fieldLabel += "<font color='red'>*</font>";
	this.text = new Ext.ux.PrettyUploadTextField(config);
	if(!CU.isEmpty(width)) config.width = width;
	
	this.disable = false;
	this.divId = "div_upload_img_"+CU.getId();
	this.divParentId = this.divId + "_parent";
	this.divDisableImgId = this.divId + "_disabled_img";
	this.button = EF.getLabel({width:btnwidth,html:"<div id='"+thiz.divParentId+"' style='custor:hand;background:url("+ContextPath+"/frame/images/icons/16x16/upload_exists.gif) no-repeat;'><div id='"+thiz.divId+"'></div></div><img id='"+thiz.divDisableImgId+"' style='display:none' src='"+ContextPath+"/frame/images/icons/16x16/upload_disable.gif'></img>"});
	
	config.items = [thiz.text, thiz.button];
	Ext.ux.PrettyUploadField.superclass.constructor.apply(this, arguments);
	
	this.onFileQueued = function(file) {
		thiz.swfupload.startUpload();
		thiz.setImageType(true);
	};
	this.onFileQueueError = function(file) {
    	if(CU.isEmpty(file)) return ;
    	EU.showMsg({msg:"文件：\""+file.name+"\"\r\n 超过了指定大小："+thiz.fileSize+"MB!不能上传!"});
    };
    this.onUploadError = function(file, errorCode, message) {
    	thiz.setImageType(false);
    	EU.showMsg({msg:"文件：\""+file.name+"\"\r\n 上传失败："+message+"!"});
    };
    this.onUploadSuccess = function(file, serverData) {
    	var result = eval("("+serverData+")");
    	thiz.setImageType(false);
    	thiz.text.setValue(result.data);
    };
    
    
	thiz.button.on("afterrender",function() {
		var settings = {
			upload_url: CU.getServerLink({url:"/sys/frame/cross/tmpfile/upload"}),
			flash_url : ContextPath+"/frame/swf/upload/swfupload.swf", 
			file_post_name:"formFile",
			file_size_limit:thiz.fileSize+" MB",
			file_types: thiz.fileTypes,
			
			file_upload_limit:0,
			use_query_string:false,
			button_width : btnwidth,
			button_height : 20,
			button_placeholder_id: thiz.divId,
			//button_image_url : ContextPath+"/frame/images/icons/16x16/upload_exists.gif",
			button_window_mode : SWFUpload.WINDOW_MODE.TRANSPARENT,
			button_cursor : SWFUpload.CURSOR.HAND,
			button_action: SWFUpload.BUTTON_ACTION.SELECT_FILE,  //单选
			file_queued_handler : thiz.onFileQueued,
			file_queue_error_handler : thiz.onFileQueueError,
			upload_error_handler : thiz.onUploadError,
			upload_success_handler : thiz.onUploadSuccess
		};
		thiz.swfupload = new SWFUpload(settings);
		thiz.text.setDisabled(true);
	});
	
	
	this.setImageType = function(loading) {
		var img = loading ? "loading.gif" : "upload_exists.gif";
		document.getElementById(thiz.divParentId).style.background = "url("+ContextPath+"/frame/images/icons/16x16/"+img+") no-repeat";
	};
	this.setValue = function(value) {
		thiz.text.setValue(value);
	};
	this.getValue = function() {
		return thiz.text.getValue();
	};
	this.setDisabled = function(disable) {
		thiz.disable = disable;
		document.getElementById(thiz.divParentId).style.display = disable?"none":"";
		document.getElementById(thiz.divDisableImgId).style.display = disable?"":"none";
    };
};
Ext.extend(Ext.ux.PrettyUploadField, Ext.Panel, {
});


