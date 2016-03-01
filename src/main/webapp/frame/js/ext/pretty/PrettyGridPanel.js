
/**
 * extends: Ext.grid.GridPanel
 * @param {} config: 配制参数, 扩展配制项如下:
 * 		url: 远程URL
 * 		fields: 数据字段, store为空时还采用内部创建方式
 * 		paging: 是否分页, true=是  false=不分   缺省为true
 * 		grouping: 是否分组	缺省为false
 * 		autoPageSize: 每页大小是否自动适应屏幕, paging=true才起效果, 缺省为:true
 * 		pageSize: 显示指定页大小, paging==true && autoPageSize==false才起作用, 缺省为:20
 * 		remark: 描述, Ext.grid.RowExpander
 * 		autoBreakHeader: 列头字宽超过了列宽时自动换行， 缺省为:true
 * 		headerFontSize: 列头字体大小  此参数只有当autoBreakHeader=true时才起作用  缺省为:13
 * 		autoBreakCell: 内容字宽超过了列宽时自动换行，缺省为:false
 * 		addAlignMenu: 是否添加对齐方式menu, 缺省为:true
 * 		addRenameMenu: 是否添加重命名列头menu, 缺省为:false
 * 		addBreakCellMenu: 是否添加表格分行显示menu, 缺省为:true
 * 		locking: view为空时才起作用,是否带锁定列模式，缺省为false, 如果为true，则ColumnModel必须为LockingColumnModel
 * 		addExpandBtn: 是否添加"展开所有行"按钮，缺省为true
 * 		enableHdMenu: 设置列头按钮可用性
 */
Ext.ux.PrettyGridPanel = function(config){
	var thiz = this;
	
	if(CU.isEmpty(config)) config = {};
	this.url = config.url;
	this.fields = config.fields;
	this.gps={targetOperate:""};
	this.gps.paging = !(config.paging === false);
	thiz.gps.sortAlias = config.sortField;
	thiz.gps.sortType = config.sortType;
	
	this.pageSize = CU.isEmpty(config.pageSize) ? 20 : config.pageSize;
	this.grouping = config.grouping === true;
	var autoPageSize = !(config.autoPageSize === false);
	
	this.remark = config.remark;
	var autoBreakHeader = !(config.autoBreakHeader === false);
	var headerFontSize = CU.isEmpty(config.headerFontSize) ? 13 : config.headerFontSize;
	var autoBreakCell = config.autoBreakCell === true;
	var addAlignMenu = !(config.addAlignMenu === false);
	var addRenameMenu = config.addRenameMenu == true;
	var addBreakCellMenu = !(config.addBreakCellMenu === false);
	var locking = config.locking === true;
	
	var addExpandBtn = config.addExpandBtn !== false;
	
	
	var initPlugins = function(){if(!CU.isArray(config.plugins)){if(CU.isEmpty(config.plugins)){config.plugins=[];}else{var tplugin=config.plugins;config.plugins=[];config.plugins.push(tplugin);}}};
	if(CU.isArray(thiz.fields) && CU.isEmpty(config.store)) {var scfg = {url:thiz.url,fields:thiz.fields};config.store = thiz.gps.paging ? EF.getPagingStore(scfg) : EF.getStore(scfg);}
	
	if(thiz.gps.paging) {
		if(thiz.grouping) {
			var bbarconfig = {displayInfo:true,pageSize:thiz.pageSize,paguu:function(start,pageSize,baseParams,pagingbar){thiz.reloadGrouping(start,pageSize);}};
		 	config.bbar = new Ext.ux.PrettyPagingToolbar(bbarconfig);
		}else {
			var bbarconfig = {store:config.store,displayInfo:true,beforePageText:"第",afterPageText:"页&nbsp;&nbsp;共{0}页",pageTextAlign:"center",displayMsg:"第&nbsp;{0}&nbsp;至&nbsp;{1}&nbsp;条记录&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;共&nbsp;{2}&nbsp;条",emptyMsg:"没有数据",pageSize:thiz.pageSize};
		 	if(addExpandBtn && CU.isObject(thiz.remark)) {bbarconfig.items = [EF.getButton({pressed:false,enableToggle:true,text:"展开所有行",toggleHandler:function(btn,pressed){if(pressed){thiz.expandRows();}else{thiz.collapseRows();}}})];}
		 	config.bbar = EF.getPagingToolbar(bbarconfig);
		}
	}
	if(CU.isObject(thiz.remark)) {initPlugins();config.plugins.push(thiz.remark);}
	
	if(thiz.grouping) {
		initPlugins();
		config.plugins.push(new Ext.grid.GroupSummary());
		thiz.gps.groupAlias = CU.isEmpty(config.groupAlias) ? config.store.groupField : groupAlias;
		if(CU.isArray(thiz.gps.groupAlias)) {
			var ga = "";
			for(var i=0; i<thiz.gps.groupAlias.length; i++) {
				if(i > 0) ga += ",";
				ga += thiz.gps.groupAlias[i];
			}
			thiz.gps.groupAlias = ga;
		}
		for(var i=0; i<config.cm.getColumnCount(); i++) {
			var column = config.cm.getColumnById(config.cm.getColumnId(i));
			if(column.dataIndex==thiz.gps.groupAlias) {
				if(!CU.isEmpty(column.groupAlias)) thiz.gps.groupAlias = column.groupAlias;
				break;
			}
		}
	}
	if(thiz.grouping && CU.isEmpty(config.view)) {config.view = new Ext.grid.GroupingView({groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Items" : "Item"]})'});}
	if(thiz.grouping && CU.isEmpty(config.view.groupTextTpl)) config.view.groupTextTpl = '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Items" : "Item"]})';
	if(locking && CU.isEmpty(config.view)) config.view = new Ext.ux.grid.LockingGridView({lockText:"锁定",unlockText:"解锁"});
	if(config.summary==true){config.columnLines=config.columnLines!==false;config.disableSelection=config.disableSelection!==false;config.enableHdMenu=config.enableHdMenu===true;}
	Ext.ux.PrettyGridPanel.superclass.constructor.apply(this, arguments);
	if(this.summary===true) {thiz.getView().on("refresh",function(){var s=thiz.store;var view=thiz.view;var count=s.getCount();for(var i=0;i<count;i++){var gr=s.getAt(i).get(CU.BG.GSR);switch(gr){case "1":gr="group-sum-row";break;case "2":gr="group-notsum-row";break;case "99":gr="group-total-row";break;}if(!CU.isEmpty(gr)) view.addRowClass(i,gr);}});}
	this.on("headerclick", function(g, index) {
		if(thiz.remoteSort===true) {
			if(thiz.view.headersDisabled || !thiz.view.cm.isSortable(index)) return;
	        g.stopEditing(true);
			var cm = thiz.getColumnModel();
			var column = cm.getColumnById(cm.getColumnId(index));
			if(CU.isEmpty(column.sortType)) column.sortType = "asc";
			thiz.sort(column, column.sortType=="asc"?"desc":"asc");
			thiz.store.sortInfo = {field:column.dataIndex, direction:column.sortType.toUpperCase()};
			return false;
		}
	});
	
	if(thiz.remoteSort===true) thiz.store.remoteSort = true;
	if(thiz.remoteSort===true) {
		var cm = thiz.getColumnModel();
		for(var i=0; i<cm.getColumnCount(); i++) {
			var column = cm.getColumnById(cm.getColumnId(i));
			if(CU.isEmpty(thiz.gps.sortAlias)) {
				thiz.gps.sortAlias = CU.isEmpty(column.sortAlias) ? column.dataIndex : column.sortAlias;
				break;
			}else {
				if(column.dataIndex==thiz.gps.sortAlias) {
					if(!CU.isEmpty(column.sortAlias)) thiz.gps.sortAlias = column.sortAlias;
					break;
				}
			}
		}
	}
	if(autoPageSize && thiz.gps.paging) {
		thiz.on("resize", function() {
			var height = CU.isEmpty(thiz.tbar) ? thiz.getInnerHeight()-27 : thiz.getInnerHeight()-54;
			thiz.pageSize = parseInt(height/23,10);
			if(thiz.getColumnModel().getTotalWidth() > thiz.getInnerWidth()) thiz.pageSize -- ;
			thiz.getBottomToolbar().pageSize = thiz.pageSize;
		});
		thiz.store.on("beforeload", function() {
			if(CU.isEmpty(thiz.store.baseParams)) thiz.store.baseParams = {};
			thiz.store.baseParams["pageSize"] = thiz.pageSize;
		});
	}
	if(autoBreakHeader) {
		var cm = thiz.getColumnModel();
		for(var i=0; i<cm.config.length; i++) {
			if(!(cm.config[i] instanceof Ext.grid.Column)) continue;
			var header = cm.config[i].hiddenheader = cm.config[i].header;
			var newheader = EU.getGridBreakHeader(header, headerFontSize, cm.getColumnWidth(i));
			cm.setColumnHeader(i, newheader);
		}
 		thiz.on("columnresize", function(col, newSize) {
 			var cm = thiz.getColumnModel();
 			var header = cm.config[col].hiddenheader;
 			cm.setColumnHeader(col, EU.getGridBreakHeader(header, headerFontSize, newSize));
 		});
	}
	
	thiz.on("render", function() {
		var hmenu = thiz.view.hmenu;
		if(CU.isEmpty(hmenu)) return ;
		if(autoBreakHeader) {
			if(!CU.isObject(hmenu.items) || !CU.isArray(hmenu.items.items)) return ;
			var hitems = hmenu.items.items;
			for(var i=0; i<hitems.length; i++) {
				if(hitems[i].itemId != "columns") continue;
				hitems[i].menu.on("beforeshow", function(menu) {
					if(!CU.isObject(menu.items) || !CU.isArray(menu.items.items)) return ;
					var fielditems = menu.items.items;
					for(var j=0; j<fielditems.length; j++) {
						var text = fielditems[j].text;
						if(CU.isEmpty(text) || text.indexOf("<br>")<0) continue ;
						fielditems[j].setText(text.replace(/<br>/g, ""));
					}
				});
				break;
			}
		}
		if(addAlignMenu) {
			var align_left = {text:"居左",iconCls:"btn_align_left",handler:function() {
				if(EU.setGridColumnAlign(thiz, "left")){
					if(autoBreakCell) EU.breakGridCell(thiz);
				}
			}};
			var align_center = {text:"居中",iconCls:"btn_align_center",handler:function() {
				if(EU.setGridColumnAlign(thiz, "center")) {
					if(autoBreakCell==true) EU.breakGridCell(thiz);
				}
			}};
			var align_right = {text:"居右",iconCls:"btn_align_right",handler:function() {
				if(EU.setGridColumnAlign(thiz, "right")){
					if(autoBreakCell==true) EU.breakGridCell(thiz);
				}
			}};
			hmenu.add({id:"aligntype",text:"对齐方式",iconCls:"btn_aligntype",menu:{items:[align_left,align_center,align_right]}});
		}
		if(addBreakCellMenu) {
			var breakcell_yes = {text:"单元格分行",iconCls:"btn_grid_group_by",handler:function() {
				if(autoBreakCell) return;
				autoBreakCell = true; EU.breakGridCell(thiz);}};
			var breakcell_no = {text:"单元格不分行",iconCls:"btn_grid_no_group",handler:function() {
				if(!autoBreakCell) return;
				autoBreakCell = false;
				var cm = thiz.getColumnModel();
				if(!CU.isEmpty(cm)) cm.setConfig(cm.config);
			}};
			hmenu.add({text:"表格内容",iconCls:"btn_grid",menu:{items:[breakcell_yes,breakcell_no]}});
		}
		if(addRenameMenu) {
			var mi_rename = {text:"重命名",handler:function() {
				var column = thiz.view.cm.getColumnById(thiz.view.cm.getColumnId(thiz.view.hdCtxIndex));
				if(CU.isEmpty(column)) return ;
				thiz.reHeadName(column);
			}};
			hmenu.add(mi_rename);
		}
		var hitems = hmenu.items.items;
		for(var i=0; i<hitems.length; i++) {
			if(thiz.gps.paging && thiz.grouping && hitems[i].itemId=="groupBy") {
				hitems[i].setHandler(function() {
					var column = thiz.view.cm.getColumnById(thiz.view.cm.getColumnId(thiz.view.hdCtxIndex));
					thiz.gps.groupAlias = CU.isEmpty(column.groupAlias) ? column.dataIndex : column.groupAlias;
					thiz.gps.targetOperate = "group";
					thiz.reloadGrouping(0,thiz.pageSize,function() {thiz.view.onGroupByClick();});
				});
			}
			if(thiz.remoteSort===true && (hitems[i].itemId=="asc"||hitems[i].itemId=="desc")) {
				hitems[i].setHandler(function(item) {
					var column = thiz.view.cm.getColumnById(thiz.view.cm.getColumnId(thiz.view.hdCtxIndex));
					thiz.sort(column, item.itemId);
					hmenu.hide();
					return false;
				});
			}
		}
		hmenu.on("beforeshow",function(a) {
			var hitems = hmenu.items.items;
			for(var i=0; i<hitems.length; i++) {
				if(hitems[i].itemId == "groupBy") {
					var column = thiz.view.cm.getColumnById(thiz.view.cm.getColumnId(thiz.view.hdCtxIndex));
					hitems[i].setVisible(column.grouping!==false);
				}
			}
		});
	});
	thiz.store.on("load", function() {
		if(autoBreakCell) EU.breakGridCell(thiz);
	});
	thiz.on("columnmove", function() {
		if(autoBreakCell) EU.breakGridCell(thiz);
	});
	thiz.on("sortchange", function() {
		if(autoBreakCell) EU.breakGridCell(thiz);
	});
	
	this.sort = function(column, sortType) {
		thiz.gps.sortAlias = CU.isEmpty(column.sortAlias) ? column.dataIndex : column.sortAlias;
		thiz.gps.sortType = column.sortType = sortType;
		if(thiz.grouping) {
			thiz.gps.targetOperate = "sort";
			thiz.reloadGrouping(0,thiz.pageSize);
		}else {
			thiz.store.baseParams["gps"]=CU.toString(thiz.gps);
			thiz.store.reload({params:{start:0}});
		}
	};
	this.reHeadName = function(column) {
		EU.showMsg({msg:"列头重命名",option:2,value:column.header,prompt:true,callback:function(op,v) {
			if(op != "ok") return;
			v = CU.trim(v);
			if(v.length == 0) {
				EU.showMsg({msg:"列头不可以为空!",callback:function() {
					thiz.reHeadName(column);
				}});
				return 
			}else {
				var cm = thiz.getColumnModel();
				var index = cm.getIndexById(column.id);
				cm.setColumnHeader(index, v);
			}
		}});
	};
	
	/**
	 * 执行查询
	 * @param params: 查询所带参数
	 * @param callback: 查询之后所执行方法
	 */
	this.executeQuery = function(params, callback, errorcallback) {
		var ps=CU.isEmpty(params) ? {} : params;
		if(CU.isEmpty(thiz.store.baseParams))thiz.store.baseParams={};
		thiz.store.baseParams["cdt"] = CU.toString(ps);
		if(CU.isEmpty(thiz.gps.targetOperate)) thiz.gps.targetOperate = (thiz.grouping?"group":"sort");
		thiz.store.baseParams["pageSize"]=thiz.pageSize;
		if(thiz.gps.paging && thiz.grouping) {
			thiz.reloadGrouping(0,thiz.pageSize,callback, errorcallback);
		}else {
			if(thiz.remoteSort===true) {
				thiz.gps.sortType = CU.isEmpty(thiz.gps.sortType) ? "asc" : thiz.gps.sortType;
			}
			thiz.store.baseParams["gps"]=CU.toString(thiz.gps);
			EU.executeQuery(thiz, null, callback, errorcallback);
		}
	};
	this.parseCdtString = function(array) {
		if(CU.isEmpty(array)) return "";
		var s = [];
		for(var i=0,count=0; i<array.length; i++) {
			if(CU.isEmpty(array[i].fieldLabel)) continue;
			var v = "";
			if(array[i] instanceof Ext.form.Checkbox) {
				v = array[i].getValue() ? "是" : "否";
			}else {
				if(CU.isEmpty(array[i].el)||CU.isEmpty(array[i].el.dom)||CU.isEmpty(v=array[i].el.dom.value)) continue;
			}
			if(count > 0) s.push("、 ");
			s.push(array[i].fieldLabel, "：", v);
			count ++ ;
		}
		return s.join("");
	};
	
	this.reloadGrouping = function(start, pageSize, callback, errorcallback) {
		var params = {};
		params[CU.BG.GBV]=CU.toString(thiz.gps);
		params[CU.BG.PS]=pageSize;
		params[CU.BG.AV]=thiz.store.baseParams[CU.BG.AV];
		params["start"]=start;
		if(!CU.isEmpty(thiz.loadMask)) thiz.loadMask.show();
		EU.ajax({action:"/ExtGrid.do",service:thiz.service,method:thiz.method,params:params,msg:false,errorcallback:function(e,result,response, options) {
			if(!CU.isEmpty(thiz.loadMask)) thiz.loadMask.hide();
			if(!CU.isEmpty(result) && CU.isEmpty(result.success)) {this.callback(result);return;}
			if(CU.isFunction(errorcallback)) errorcallback(result,response, options);
		},callback:function(result) {
			if(!CU.isEmpty(thiz.loadMask)) thiz.loadMask.hide();
			thiz.store.loadData(result.valueList);
			var pagingbar = thiz.getBottomToolbar();
			pagingbar.currentPage = parseFloat(result.currentPage, 10);
			pagingbar.totalPages = parseFloat(result.totalPages, 10);
			pagingbar.totalRows = parseFloat(result.totalRows, 10);
			pagingbar.refreshFace();
			if(CU.isFunction(callback)) callback(result);
		}});
	};
	/**
	 * 判断当前Grid是否分页
	 */
	this.isPaging = function() {
		return thiz.gps.paging === true;
	};
	/**
	 * 获取store中的所有数据,数据结构:{companyid:['01','02','03',...], dataIndex:['row1value','row2value','row3value',...],...}
	 * @param fillNull: 是否过滤null\undefined值, 缺省为true
	 */
	this.getData = function(fs, fillNull) {
		return EU.getStoreData(this.store, (CU.isEmpty(fs)?thiz.fields:fs), fillNull);
	};
	
	/**
	 * 指定返回列数据
	 * @param field: number\string, field是number型表示第几列, field是string型表示dataIndex=field列
	 * @param fillNull: 是否过滤null\undefined值, 缺省为true
	 * @return 如果找到了field对应列, 则返回[], 否则返回undefined
	 */
	this.getDataAt = function(field, fillNull) {
		var exists = false;
		if(typeof(field) == "string") {
			for(var i=0; i<thiz.fields.length; i++) {
				if(field === thiz.fields[i]) {
					exists = true;
					break;
				}
			}
		}else {
			exists = field>=0 && field<thiz.fields.length;
			if(exists) field = thiz.fields[field];
		}
		if(!exists) return ;
		return EU.getStoreDataAt(this.store, field, fillNull);
	};
	
	this.expandRows = function() {
		var length = thiz.store.getCount();
		for(var i=0; i<length; i++)thiz.remark.expandRow(i);
	};
	this.collapseRows = function() {
		var length = thiz.store.getCount();
		for(var i=0; i<length; i++)thiz.remark.collapseRow(i);
	};
};

Ext.extend(Ext.ux.PrettyGridPanel, Ext.grid.GridPanel, {
	autoSizeColumns: true,
	autoScroll: true,
	stripeRows: true,
	cellHeight: 50,
	loadMask: true
});


