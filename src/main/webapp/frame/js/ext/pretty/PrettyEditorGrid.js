
/**
 * extends: Ext.grid.EditorGridPanel
 * @param {} config: 配制参数, 扩展配制项如下:
 * 		url: 
 * 		fields: 数据字段, store为空时还采用内部创建方式
 * 		autoBreakHeader: 列头字宽超过了列宽时自动换行， 缺省为:true
 * 		headerFontSize: 列头字体大小  此参数只有当autoBreakHeader=true时才起作用  缺省为:13
 * 		addContextMenu: 是否添加右键, 缺省为:true
 * 		initRowObj: 添加行时初始值  {field:value,field:value,....}
 * 		editable: 是否可编辑
 * 		pointStartEditing: 添加新行时是否指定编辑, 缺省为true
 */
Ext.ux.PrettyEditorGrid = function(config){
	var thiz = this;
	
	this.rowClass = null;
	this.popupMenu = null;
	this.pasteBoard = [];
	this.popConfig = {exw:1,exh:1};	
	if(CU.isEmpty(config)) config = {};
	
	var fields = config.fields;
	var autoBreakHeader = !(config.autoBreakHeader === false);
	var headerFontSize = CU.isEmpty(config.headerFontSize) ? 13 : config.headerFontSize;
	var addContextMenu = config.addContextMenu !== false;
	this.initRowObj = config.initRowObj;
	this.editable = config.editable !== false;
	
	if(CU.isArray(fields) && CU.isEmpty(config.store)) {
		var storeconfig = {url:config.url,fields:fields};
		config.store = EF.getStore(storeconfig);
	}
	Ext.ux.PrettyEditorGrid.superclass.constructor.apply(this, arguments);
	this.on("beforeedit", function(e) {return thiz.editable;});
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
	if(addContextMenu) {
		var cut = EF.getMenuItem({text:"剪切", handler:function() { thiz.cut();}});
		var copy = EF.getMenuItem({text:"复制", handler:function() { thiz.copy(); }});
		var paste = EF.getMenuItem({text:"粘贴", handler:function() { thiz.paste(); }});
		var insert = EF.getMenuItem({text:"插入行", handler:function() { thiz.insert(); }});
		var add = EF.getMenuItem({text:"添加新行", handler:function() { thiz.add(); }});
		var delseled = EF.getMenuItem({text:"删除选中行", handler:function() { thiz.deleteSelectedRows(); }});
		var delnoseled = EF.getMenuItem({text:"删除未选行", handler:function() { thiz.deleteNoSelectedRows(); }});
		var delall = EF.getMenuItem({text:"删除所有行", handler:function() { thiz.deleteAll(); }});
		var clearcontent = EF.getMenuItem({text:"清除内容", handler:function() { thiz.clearContent(); }});
		var selectall = EF.getMenuItem({text:"全选", handler:function() { thiz.selectAll(); }});
		var clearseled = EF.getMenuItem({text:"取消选择", handler:function() { thiz.clearSelecteds(); }});
		this.popupMenu = new EF.getMenu({items:[cut,copy,paste,"-",insert,add,"-",delseled,delnoseled,delall,"-",clearcontent,selectall,clearseled]});
		this.on("contextmenu", function(e) {
			var sm = thiz.getSelectionModel();
			var hasseleds = sm.hasSelection();
			cut.setDisabled(!hasseleds);
			copy.setDisabled(!hasseleds);
			paste.setDisabled((!hasseleds && thiz.store.getCount()>0) || thiz.pasteBoard.length==0);
			insert.setDisabled(!hasseleds);
			delseled.setDisabled(!hasseleds);
			clearcontent.setDisabled(!hasseleds);
			clearseled.setDisabled(!hasseleds);
			EU.showPopupMenu(thiz.popupMenu,thiz.popConfig.exw,thiz.popConfig.exh,thiz.getWidth(),thiz.getHeight(),12);
		});
	}
	
	/**
	 * 获取选中行
	 */
	this.getSelectedRows = function() {
		return this.getSelectionModel().getSelections();
	};
	
	/**
	 * 剪切选中行
	 */
	this.cut = function() {
		this.copy();
		this.deleteSelectedRows();
	};
	
	/**
	 * 考贝选中行
	 */
	this.copy = function() {
		this.clearPasteBoard();
		var sm = this.getSelectionModel();
		var count = this.store.getCount();
		for(var i=0; i<count; i++) {
		    if(sm.isSelected(i)) {
			   	var record = this.store.getAt(i);
			   	var newrecord = {};
			   	for(var j=0; j<fields.length; j++) {
					newrecord[fields[j]] = record.get(fields[j]);
				}
				this.pasteBoard.push(newrecord);
		    }
		}
	};
	
	/**
	 * 粘贴
	 */
	this.paste = function() {
		var index = -1;
		var sm = this.getSelectionModel();
		var count = this.store.getCount();
		for(var i=0; i<count; i++) {
		    if(sm.isSelected(i)) {
			    index = i;
		    }
		}
		index ++ ;
		for(var i=this.pasteBoard.length-1; i>=0; i--) {
			var record = this.addRow(index);
			for(var j=0; j<fields.length; j++) {
				record.set(fields[j], this.pasteBoard[i][fields[j]]);
			}
		}
	};
	
	/**
	 * 插入行, 插入至当前选中行之前, 如果没有选中行则插入至末尾
	 */
	this.insert = function() {
		this.addRow();
	};
	
	/**
	 * 添加新行
	 */
	this.add = function(selected) {
		return this.addRow(this.store.getCount(), selected);
	};
	
	/**
	 * 删除选中行
	 */
	this.deleteSelectedRows = function() {
		this.deleteRow();
	};
	
	/**
	 * 删除未选中行
	 */
	this.deleteNoSelectedRows = function() {
		var sm = this.getSelectionModel();
		var seleds = sm.getSelections();
		if(CU.isEmpty(seleds) || seleds.length==0) this.deleteAll();
		var count = this.store.getCount();
		var noseleds = [];
		for(var i=0; i<count; i++) {
			var record = this.store.getAt(i);
			if(seleds.indexOf(record) < 0) noseleds.push(record);
		}
		for(var i=0; i<noseleds.length; i++) {
			this.store.remove(noseleds[i]);
		}
	};
	
	/**
	 * 删除所有行
	 */
	this.deleteAll = function() {
		this.store.removeAll();
	};
	
	/**
	 * 清空选中行内容
	 */
	this.clearContent = function() {
		var sm = this.getSelectionModel();
		var seleds = sm.getSelections();
		if(CU.isEmpty(seleds) || seleds.length==0) return ;
		for(var i=0; i<seleds.length; i++) {
			for(var j=0; j<fields.length; j++) {
				seleds[i].set(fields[j], "");
			}
		}
	};
	
	/**
	 * 清空表格所有内容
	 */
	this.clearAllContent = function() {
		var count = this.store.getCount();
		for(var i=0; i<count; i++) {
			var record = this.store.getAt(i);
			for(var j=0; j<fields.length; j++) {
				record.set(fields[j], "");
			}
		}
		
	};
	
	/**
	 * 选中所有行
	 */
	this.selectAll = function() {
		var sm = this.getSelectionModel();
		sm.selectAll();
	};
	
	/**
	 * 取消选择
	 */
	this.clearSelecteds = function() {
		var sm = this.getSelectionModel();
		sm.clearSelections();
	};
	
	
	/**
	 * 添加行
	 * @param index: 指定添加位置, 缺省时:如果找到选中行则插入选中行之前,否则添加到最后一行, index<0插入第一行, index>totalRow插入最后一行
	 * @return 新添行 record
	 */
	this.addRow = function(index, selected) {
		if(CU.isEmpty(this.rowClass)) this.rowClass = EF.getRowClass(fields);
		var count = this.store.getCount();
		var sm = this.getSelectionModel();
		if(CU.isEmpty(index)) {
			if(sm.hasSelection()) {
				for(var i=0; i<count; i++) {
				    if(sm.isSelected(i)) {
					    index = i;
				    }
				}
			}else {
				index = count;
			}
		}else if(index < 0) {
			index = 0;
		}else if(index > count) {
			index = count;
		}
		var record = new this.rowClass(CU.clone(this.initRowObj));
		this.stopEditing();
		this.store.insert(index, record);
		var cm = thiz.getColumnModel();
		var col = 0;
		for(var i=0; i<cm.config.length; i++) {
			if(!CU.isEmpty(cm.config[i].dataIndex)) {
				col = i;
				break;
			}
		}
		if(thiz.rendered && thiz.pointStartEditing!==false && selected!==false) {
			sm.clearSelections();
			if(CU.isFunction(sm.selectRow)) sm.selectRow(index);
			this.startEditing(index, col);
		}
		return record;
	};
	
	/**
	 * 删除行
	 * @param index: 指定删除位置, 缺省为删除选中行
	 * @return index<0||index>totalRow  返回-1, index缺省而没有找到选中行返回-2, 正常返回array[record]
	 */
	this.deleteRow = function(index) {
		var count = this.store.getCount();
		if(index<0 || index>=count) return -1;
		var sm = this.getSelectionModel();
		var delRecords;
		if(CU.isEmpty(index)) {
			var seleds = sm.getSelections();
			if(CU.isEmpty(seleds) || seleds.length==0) return -2;
			delRecords = seleds;
			for(var i=0; i<seleds.length; i++) {
				this.store.remove(seleds[i]);
			}
		}else {
			delRecords = [this.store.getAt(index)];
			this.store.removeAt(index);
		}
		return delRecords;
	};
	
	/**
	 * 获取查询字段
	 */
	this.getFields = function() {
		return fields;
	};
	
	/**
	 * 设置查询字段
	 */
	this.setFields = function(fs) {
		fields = fs;
	};
	
	/**
	 * 获取RowClass
	 */
	this.getRowClass = function() {
		if(CU.isEmpty(this.rowClass)) this.rowClass = EF.getRowClass(fields);
		return this.rowClass;
	};
	
	/**
	 * 设置RowClass
	 */
	this.setRowClass = function(rowClass) {
		this.rowClass = rowClass;
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
		EU.executeQuery(thiz, null, callback, errorcallback);
	};
	
	/**
	 * 获取store中的所有数据,数据结构:{companyid:['01','02','03',...], dataIndex:['row1value','row2value','row3value',...],...}
	 * @param fillNull: 是否过滤null\undefined值, 缺省为true
	 */
	this.getData = function(fs, fillNull) {
		return EU.getStoreData(this.store, (CU.isEmpty(fs)?fields:fs), fillNull);
	};
	
	this.getDataList = function(fs, fillNull) {
		return EU.getStoreList(this.store, (CU.isEmpty(fs)?fields:fs), fillNull);
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
			for(var i=0; i<fields.length; i++) {
				if(field === fields[i]) {
					exists = true;
					break;
				}
			}
		}else {
			exists = field>=0 && field<fields.length;
			if(exists) field = fields[field];
		}
		if(!exists) return ;
		return EU.getStoreDataAt(this.store, field, fillNull);
	};
	
	/**
	 * 加载数据
	 * @param data: 对应record的数组
	 * @param filter: 是否过滤掉已存在的记录, 即pkfield所对应的值已存在则不添加	缺省为false
	 * @param pkfield: 主键字段名	缺省为 'id'
	 * @param fields: 指定添加的字段, 缺省为当前所定义的字段
	 * @param fillNull: 是否过滤null\undefined值, 缺省为true
	 * @param selected 是否默认选中
	 */
	this.loadData = function(data, filter, pkfield, fs, fillNull, selected) {
		if(!CU.isArray(data) || data.length==0) return ;
		var inids = [];
		if(filter===true) {
			inids = [];
			if(CU.isEmpty(pkfield)) pkfield =  "id";
			var incount = thiz.store.getCount();
			for(var i=0; i<incount; i++) {
				var record = thiz.store.getAt(i);
				inids.push(record.get(pkfield));
			}
		}
		if(CU.isEmpty(fs)) fs = fields;
		for(var i=0; i<data.length; i++) {
			if(filter===true) {
				var id = data[i][pkfield];
				if(inids.indexOf(id) > -1) continue ;
			}
			var record = thiz.add(selected);
			for(var j=0; j<fs.length; j++) {
				var value = data[i][fs[j]];
				if(fillNull!==false && (value===null || value===undefined)) value = "";
				record.set(fs[j],value);
			}
		}
	};
	
	/**
	 * 获取右健菜单
	 */
	this.getPopupMenu = function() {
		return this.popupMenu;
	};
	
	/**
	 * 设置右键菜单
	 */
	this.setPopupMenu = function(menu) {
		this.popupMenu = menu;
	};
	
	/**
	 * 获取当前粘贴板
	 */
	this.getPasteBoard = function() {
		return this.pasteBoard;
	};
	
	/**
	 * 清空粘贴板
	 */
	this.clearPasteBoard = function() {
		while(this.pasteBoard.length > 0) this.pasteBoard.pop();
	};
	
	/**
	 * config: 
	 * 		exw: 右键组件与页面左边所空的宽度
	 * 		exh: 右键组件与页面上边所空的高度
	 */
	this.setPopConfig = function(config) {
		if(CU.isEmpty(config)) return ;
		if(!CU.isEmpty(config.exw)) this.popConfig.exw = config.exw;
		if(!CU.isEmpty(config.exh)) this.popConfig.exw = config.exh;
	};
	/**
	 * 设置是否可编辑
	 */
	this.setEditable = function(editable) {
		this.editable = editable !== false;
	};
};

Ext.extend(Ext.ux.PrettyEditorGrid, Ext.grid.EditorGridPanel, {
	autoSizeColumns: true,
	autoScroll: true,
	stripeRows: true,
	cellHeight: 50, 
	clicksToEdit: 2,
	loadMask: true,
	enableHdMenu: false,
	pointStartEditing:true
});

