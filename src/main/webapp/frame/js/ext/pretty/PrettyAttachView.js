
/**
 * extends: Ext.Panel
 * @param {} config
 * 		tablename: 来源表 
 * 		fieldname: 来源字段
 * 		fieldvalue: 来源字段ID
 *		maxsize: 缺省为10  单位为MB
 *		tbarposition: top||tbar||true=tbar	bottom||bbar||false=bbar	缺省为true
 */
Ext.ux.PrettyAttachView = function(cfg) {
	var thiz = this;
	if(CU.isEmpty(cfg)) cfg = {};
	this.attachs = null;
	this.currattachid = "";
	this.iframeid = CU.isEmpty(cfg.id)?"AttachView_IFId_"+CU.getId():cfg.id;
	if(CU.isEmpty(cfg.maxsize))cfg.maxsize = 10;
	cfg.html = "<iframe id='"+thiz.iframeid+"' width='100%' height='100%' frameborder='0' src=''/>";
	var paguu = function(start, pageSize, baseParams, pagingbar) {var page=start+1;thiz.refreshPaging(page);thiz.preview(page);};
	thiz.pagingbar = new Ext.ux.PrettyPagingToolbar({displayInfo:false,paguu:paguu,pageSize:1});
	thiz.pagingbar.insertButton(11,{text:"下载",iconCls:"btn_download",handler:function() {if(CU.isEmpty(thiz.currattachid)){EU.showMsg({msg:"没有找到下载文件!"});return;}thiz.download(thiz.currattachid);}});
	thiz.pagingbar.insertButton(12,new Ext.Toolbar.Separator());
	thiz.fileNameItem = new Ext.Toolbar.TextItem({text:""});
	thiz.pagingbar.insertButton(13,thiz.fileNameItem);
 	if(!CU.isEmpty(cfg.tbarposition)&&cfg.tbarposition!="top"&&cfg.tbarposition!="tbar"&&cfg.tbarposition!=true) {
 		cfg.bbar = thiz.pagingbar;
 	}else {
 		cfg.tbar = thiz.pagingbar;
 	}
	Ext.ux.PrettyAttachView.superclass.constructor.apply(this, arguments);
	this.executeQuery = function(tablename, fieldname, fieldvalue) {
		if(CU.isEmpty(tablename))tablename=thiz.tablename;
		if(CU.isEmpty(fieldname))fieldname=thiz.fieldname;
		if(CU.isEmpty(fieldvalue))fieldvalue=thiz.fieldvalue;
		EU.RS({service:"FileAttach",method:"queryList",params:[tablename,fieldname,fieldvalue],callback:function(r) {
			thiz.currattachid = "";
			thiz.attachs = r;
			thiz.refreshPaging(1);
			thiz.preview(1);
		}});
	};
	this.refreshPaging = function(page) {
		var pages = CU.isEmpty(thiz.attachs) ? 0 : thiz.attachs.length;
		page = CU.isEmpty(page)?1:(page<1?1:(page>pages?pages:page));
		var pagingbar = thiz.getBottomToolbar();
		thiz.pagingbar.totalPages = pages;
		thiz.pagingbar.totalRows = pages;
		thiz.pagingbar.currentPage = page;
		thiz.pagingbar.refreshFace();
	};
	this.preview = function(page) {
		var pages = CU.isEmpty(thiz.attachs) ? 0 : thiz.attachs.length;
		page = CU.isEmpty(page)?1:(page<1?1:(page>pages?pages:page));
		if(page==0 || page>pages) return ;
		var att = thiz.attachs[page-1];
		thiz.currattachid = att.id;
		thiz.fileNameItem.setText("<font color='blue'>"+att.originalname+"</font>");
		document.getElementById(thiz.iframeid).src = "about:blank";
		var suffix = att.filesuffix;
		if(suffix=="21" || suffix=="22" || suffix=="31" || suffix=="99") {
			EU.showMsg({msg:"当前文档无法预览,您是否需要下载?",buttons:{ok:"下载",cancel:"取消"},callback:function(r) {
				if(r!="ok") return ;
				thiz.download(att.id);
			}});
		}else {
			var filesize = parseFloat(att.filesize)/1000;
			if(filesize > thiz.maxsize) {
				EU.showMsg({msg:"当前文档过大,可能会影响您网络速度!<br>您是否需要继续预览?",buttons:{yes:"继续预览",no:"下载",cancel:"取消"},callback:function(r) {
					if(r == "yes") {
						thiz.previewFile(att.id);
					}else if(r == "no") {
						thiz.download(att.id);
					}
				}});
			}else {
				thiz.previewFile(att.id);
			}
		}
	};
	this.previewFile = function(attachid) {
		var url = CU.getServerLink({action:"/HttpForward.do",service:"FileAttach",method:"previewFile",params:{"BASEFLAG_AppendValues":CU.toString([attachid])}});
		document.getElementById(thiz.iframeid).src = url+"&date="+new Date().getTime();
	};
	this.download = function(attachid) {
		PU.download({service:"FileAttach",method:"download",params:[attachid]});
	};
};
Ext.extend(Ext.ux.PrettyAttachView, Ext.Panel, {
	layout:"fit",
	border:false
});


