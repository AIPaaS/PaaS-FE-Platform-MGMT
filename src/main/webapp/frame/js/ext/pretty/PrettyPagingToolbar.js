
/**
 * extends: Ext.Toolbar
 * @param {} config
 * 		paguu: 工具条与分页相关按钮点击后的回调事件paguu(start, pageSize, params, this)
 */
Ext.ux.PrettyPagingToolbar = function(config) {
	var thiz = this;
	if(CU.isEmpty(config)) config = {};
	
	this.baseParams = null;
	this.currentPage = 1;
	this.pageSize = 20;
	this.totalPages = 1;
	this.totalRows = 0;
	this.paguu = config.paguu;
	
	this.moveFirst = function() {
		thiz.currentPage = 1;
		thiz.paguuing();
	}
	this.movePrevious = function() {
		thiz.currentPage -- ;
		thiz.paguuing();
	}
	this.onPagingKeyDown = function(field, e) {
		var key = e.getKey();
		if(key !== e.ENTER) return ;
		var page = thiz.inputItem.getValue();
		if(CU.isEmpty(page)) page = 1;
		thiz.currentPage = parseInt(page, 10);
		thiz.paguuing();
	}
	this.onPagingBlur = function(e) {
		thiz.inputItem.setValue(thiz.currentPage);
	}
	this.moveNext = function() {
		thiz.currentPage ++ ;
		thiz.paguuing();
	}
	this.moveLast = function() {
		thiz.currentPage = thiz.totalPages;
		thiz.paguuing();
	}
	this.refresh = function() {
		thiz.paguuing();
	}
	
	this.first = new Ext.Toolbar.Button({tooltip:"第一页",overflowText:"第一页",disabled:true,iconCls:'x-tbar-page-first',handler:thiz.moveFirst,scope:this});
	this.prev = new Ext.Toolbar.Button({tooltip:"前一页",overflowText:"前一页",disabled:true,iconCls:'x-tbar-page-prev',handler:thiz.movePrevious,scope:this});
	this.inputItem = new Ext.form.NumberField({style:"text-align:center;",cls:'x-tbar-page-number',disabled:true,value:1,allowDecimals:false,allowNegative:false,enableKeyEvents:true,selectOnFocus:true,listeners:{scope:thiz,keydown:thiz.onPagingKeyDown,blur:thiz.onPagingBlur}});
	this.afterTextItem = new Ext.Toolbar.TextItem({text:"页&nbsp;&nbsp;共1页"});
	this.next = new Ext.Toolbar.Button({tooltip:"下一页",overflowText:"下一页",disabled:true,iconCls:'x-tbar-page-next',handler: thiz.moveNext,scope: this});
	this.last = new Ext.Toolbar.Button({tooltip:"最后页",overflowText:"最后页",disabled:true,iconCls:'x-tbar-page-last',handler:thiz.moveLast,scope:this});
	this.refresh = new Ext.Toolbar.Button({tooltip:"刷新",overflowText:"刷新",iconCls:'x-tbar-loading',handler:thiz.refresh,scope:this});
	this.displayItem = new Ext.Toolbar.TextItem({text:"没有数据"});
	config.items = [this.first,this.prev,"-","第",this.inputItem,this.afterTextItem,"-",this.next,this.last,"-",this.refresh,"->",this.displayItem];
	if(!config.displayInfo)this.displayItem.hide();
	
	this.setPageInfo = function(p) {
		if(CU.isEmpty(p)) return;
		if(!CU.isEmpty(p.currentPage)) thiz.currentPage = typeof(p.currentPage)=="string" ? parseInt(p.currentPage, 10) : p.currentPage;
		if(!CU.isEmpty(p.pageSize)) thiz.pageSize = typeof(p.pageSize)=="string" ? parseInt(p.pageSize, 10) : p.pageSize;
		if(!CU.isEmpty(p.totalPages)) thiz.totalPages = typeof(p.totalPages)=="string" ? parseInt(p.totalPages, 10) : p.totalPages;
		if(!CU.isEmpty(p.totalRows)) thiz.totalRows = typeof(p.totalRows)=="string" ? parseInt(p.totalRows, 10) : p.totalRows;
		thiz.refreshFace();
	}
	this.refreshFace = function() {
		var disabled = thiz.totalPages === 0;
		thiz.first.setDisabled(disabled||thiz.currentPage<=1);
		thiz.prev.setDisabled(disabled||thiz.currentPage<=1);
		thiz.inputItem.setDisabled(disabled);
		thiz.next.setDisabled(disabled||thiz.currentPage>=thiz.totalPages);
		thiz.last.setDisabled(disabled||thiz.currentPage>=thiz.totalPages);
		if(thiz.totalPages===0) {
			thiz.inputItem.setValue(1);
			thiz.afterTextItem.setText("页&nbsp;&nbsp;共1页");
			if(thiz.displayInfo)thiz.displayItem.setText("没有数据");
		}else {
			thiz.inputItem.setValue(thiz.currentPage);
			thiz.afterTextItem.setText("页&nbsp;&nbsp;共"+thiz.totalPages+"页");
			var start = (thiz.currentPage-1) * thiz.pageSize + 1;
			var end = thiz.currentPage * thiz.pageSize;
			if(thiz.displayInfo)thiz.displayItem.setText("第&nbsp;"+start+"&nbsp;至&nbsp;"+end+"&nbsp;条记录&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;共&nbsp;"+thiz.totalRows+"条");
		}
	}
	Ext.ux.PrettyPagingToolbar.superclass.constructor.apply(this, arguments);
	thiz.paguuing = function() {
		var start = (thiz.currentPage-1) * thiz.pageSize;
		if(CU.isFunction(thiz.paguu)) thiz.paguu(start, thiz.pageSize, thiz.baseParams, thiz);
	}
};
Ext.extend(Ext.ux.PrettyPagingToolbar, Ext.Toolbar, {
});


