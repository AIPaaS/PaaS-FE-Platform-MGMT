
/**
 * @param {} config
 * 		url:
 * 		loadMask: 遮罩效果, 缺省为true
 * 		baseParams: 固定参数
 * 		paramfields: 指定Grid当前record做为参数字段，缺省为所有
 * 		tableAlign: 表格位置
 * 		label: 
 * 		labelWidth:		缺少为100
 * 		labelAlign:		缺省为right
 * 		autoBreakCell: 内容字宽超过了列宽时自动换行，缺省为:false
 * 方法
 * 		addEvent(key, callback)	添加事件
 * 		renderer:function(value, rowData, rowIndex, row, baseIndex, baseRecord, expander, data)
 * 
 * 事件:	
 * 		beforeload(params, rowIndex, record, table)		返回false则停止加载数据
 * 		load(result, success, rowIndex, record, response, options)
 * 		rowclick(rowIndex, rowData, rowEl, tableEl, baseRowIndex, baseRecord, thisobj)
 * 		rowdblclick(rowIndex, rowData, rowEl, tableEl, baseRowIndex, baseRecord, thisobj)
 * 		rowcontextmenu(rowIndex, rowData, rowEl, tableEl, baseRowIndex, baseRecord, thisobj, e)
 * 		headercontextmenu(headerEl, tableEl, baseRowIndex, baseRecord, thisobj, e)
 */
Ext.ux.PrettyGridExpander = function(config) {
	var thiz = this;
	if(CU.isEmpty(config)) config = {};
	this.loadMask = config.loadMask !== false;
	this.baseParams = CU.isEmpty(config.baseParams) ? {} : config.baseParams;
	this.recordstates = {};
	
	var beforeloadEvents = [];
	var loadEvents = [];
	var rowclickEvents = [];
	var rowdblclickEvents = [];
	var rowcontextmenuEvents = [];
	var headercontextmenuEvents = [];
	
	var buffer = [];
	if(config.addspacerow!==false) buffer.push("<br>");
	var tabWidth = 0;
	for(var i=0; i<config.cm.length; i++) {
		tabWidth += config.cm[i].width;
	}
	var labelWidth = CU.isEmpty(config.label) ? 0 : (CU.isEmpty(config.labelWidth)?100:config.labelWidth);
	buffer.push("<table id='Parent_GridExpander_TableId_{BaseFlag_BaseGrid_GridExpander_Record_Id}' border='0' style='width:"+(labelWidth+tabWidth)+"px;' cellpadding='0' cellspacing='0' class='x-form-item x-form-item-label' bordercolorlight='#cccccc' bordercolordark='#ffffff'><tr>");
	if(!CU.isEmpty(config.label)) buffer.push("<td width='"+labelWidth+"' align='"+(CU.isEmpty(config.labelAlign)?"right":config.labelAlign)+"'>"+config.label+"</td>");
	buffer.push("<td align='"+(CU.isEmpty(config.tableAlign)?"left":config.tableAlign)+"'>");
	buffer.push(CU.createTableHtml({id:"GridExpander_TableId_{BaseFlag_BaseGrid_GridExpander_Record_Id}",cm:config.cm,style:"width:"+tabWidth+"px;"}));
	buffer.push("</td></tr></table>");
	config.tpl = new Ext.Template(buffer.join(""));
	
	Ext.ux.PrettyGridExpander.superclass.constructor.apply(this, arguments);
	this.getBodyContent = function(record, index){
        if(!this.enableCaching){
            return this.tpl.apply(record.data);
        }
        var content = this.bodyContent[record.id];
        if(content) delete this.bodyContent[record.id];
        content = this.tpl.apply(record.data);
        this.bodyContent[record.id] = content;
        return content;
    },
	this.onRender = function(e) {
		Ext.ux.PrettyGridExpander.superclass.onRender.call(this, e);
		thiz.grid.store.on("beforeload",function(store) {
			var length = thiz.grid.store.getCount();
			for(var i=0; i<length; i++) {
				thiz.collapseRow(i);
				var record = thiz.grid.store.getAt(i);
				var el = document.getElementById("Parent_GridExpander_TableId_"+record.get("BaseFlag_BaseGrid_GridExpander_Record_Id"));
				if(CU.isEmpty(el)) continue ;
				el.parentNode.removeNode(el);
			}
			for(var key in thiz.recordstates) delete thiz.recordstates[key];
		});
		thiz.grid.store.on("load", function(store,records,params) {
			var count = store.getCount();
			for(var i=0; i<count; i++) {
				var record = store.getAt(i);
				record.set("BaseFlag_BaseGrid_GridExpander_Record_Id",CU.getId());
			}
		});
	};
	this.beforeExpand = function(record, body, rowIndex) {
		if(this.fireEvent('beforeexpand', this, record, body, rowIndex) === false) return false;
		var record = thiz.grid.store.getAt(rowIndex);
		var expandedid = "Expanded_"+record.get("BaseFlag_BaseGrid_GridExpander_Record_Id");
		if(this.tpl && this.lazyRender && thiz.recordstates[expandedid]!==true && !CU.isEmpty(body)){
            body.innerHTML = thiz.getBodyContent(record, rowIndex);
            var tableid = "GridExpander_TableId_"+record.get("BaseFlag_BaseGrid_GridExpander_Record_Id");
            var table = document.getElementById(tableid);
            var header = table.rows[0];
            header.oncontextmenu = function() {for(var i=0; i<headercontextmenuEvents.length; i++) headercontextmenuEvents[i](this, table, rowIndex, record, thiz, event);};
            thiz.recordstates[expandedid] = true;
			load(rowIndex, table, record, undefined);
        }
		return true;
	};
	var removeAll = function(table) {
		while(table.rows.length > 1) table.deleteRow(1);
	};
	var addRow = function(table, rowData, baseIndex, baseRecord, data, addevent, grouping) {
		var index = table.rows.length;
		var row = table.insertRow(index);
		row.bgColor='#ffffff';
		var cm = thiz.cm;
		for (var i=0; i<cm.length; i++) {
			var cell = row.insertCell();
			cell.className = "table_seditor_td";
			cell.align = CU.isEmpty(cm[i].align) ? "left" : cm[i].align;
			if(thiz.autoBreakCell!==true) cell.height = 23;
			cell.style.paddingTop = "3px";
			cell.style.paddingBottom = "3px";
			if(cm[i] instanceof Ext.grid.RowNumberer) {
				cell.bgColor = "#FEF5E2";
				cell.innerHTML = index;
			}else {
				var value = rowData[cm[i]["dataIndex"]];
				if(grouping === true) {
					if(CU.isFunction(cm[i].grouprenderer)) value = cm[i].grouprenderer(value, rowData, index-1, row, baseIndex, baseRecord, thiz, data);
				}else {
					if(CU.isFunction(cm[i].renderer)) value = cm[i].renderer(value, rowData, index-1, row, baseIndex, baseRecord, thiz, data);
				}
				if(CU.isEmpty(value)) value = "&nbsp;";
				cell.innerHTML = value;
			}
		}
		if(addevent !== false) {
			row.onmouseover = function() {this.bgColor='#e0e0e0';};
			row.onmouseout = function() {this.bgColor='#ffffff';};
			row.onclick = function() {for(var i=0; i<rowclickEvents.length; i++) rowclickEvents[i](index-1, rowData, this, table, baseIndex, baseRecord, thiz, data);};
			row.ondblclick = function() {for(var i=0; i<rowdblclickEvents.length; i++) rowdblclickEvents[i](index-1, rowData, this, table, baseIndex, baseRecord, thiz, data);};
			row.oncontextmenu = function() {for(var i=0; i<rowcontextmenuEvents.length; i++) rowcontextmenuEvents[i](index-1, rowData, this, table, baseIndex, baseRecord, thiz, event, data);};
		}
		return row;
	};
	var getGroupRow = function(data) {
		var grouprow = {};
		if(data===undefined || data===null) return grouprow;
		var cm = thiz.cm;
		for (var i=0; i<cm.length; i++) {
			var group = cm[i].group;
			if(!CU.isObject(group)) continue ;
			var summaryType = group.summaryType;
			var fieldType = group.fieldType;
			var key = cm[i].dataIndex;
			var value = 0;
			if(summaryType == "count") {
				value = data.length;
			}else {
				for(var j=0; j<data.length; j++) {
					var tv = data[j][key];
					if(tv===undefined || tv===null) tv = 0;
					tv = fieldType=="int" ? parseInt(tv, 10) : parseFloat(tv);
					value += tv;
				}
				if(summaryType == "avg") value = data.length==0 ? 0 : value/data.length;
			}
			grouprow[key] = value;
		}
		return grouprow;
	};
	var load = function(rowIndex, table, record, params, callback) {
		if(thiz.loadMask) {
			if(thiz.loadMask===true) thiz.loadMask = new Ext.LoadMask(table.parentNode);
			thiz.loadMask.el = Ext.get(table.parentNode);
			thiz.loadMask.show();
		}
		if(CU.isEmpty(params)) params = {};
		for(var key in thiz.baseParams) {
			params[key] = thiz.baseParams[key];
		}
		if(CU.isArray(thiz.paramfields) && thiz.paramfields.length>0) {
			for(var i=0; i<thiz.paramfields.length; i++) {
				params[thiz.paramfields[i]] = record.get(thiz.paramfields[i]);
			}
		}else {
			for(var key in record.data) {
				params[key] = record.data[key];
			}
		}
		for(var i=0; i<beforeloadEvents.length; i++) {
			if(beforeloadEvents[i](params, rowIndex, record, table)===false) return;
		}
		RS.ajax({url:config.url,ps:params,msg:false,cb:function(result) {
			thiz.loadMask.hide();
			result = CU.toStoreData(result);
			removeAll(table);
			if(!CU.isEmpty(result)) {
				for(var i=0; i<result.length; i++) {
					addRow(table, result[i], rowIndex, record, result);
				}
				if(thiz.grouping === true) addRow(table, getGroupRow(result), rowIndex, record, result, thiz.grouprowevent===true, true);
			}
			for(var i=0; i<loadEvents.length; i++) loadEvents[i](result, true, rowIndex, record, table);
			if(CU.isFunction(callback)) callback(result, true, rowIndex, record, table);
		}, errcb:function(response, options) {
			for(var i=0; i<loadEvents.length; i++) {
				loadEvents[i](null, false, rowIndex, record, response, options);
				if(CU.isFunction(callback)) callback(null, false, rowIndex, record, response, options);
			}
		}});
	};
	this.reload = function(rowIndex, params, callback) {
		var record = thiz.grid.store.getAt(rowIndex);
		if(typeof rowIndex == "string") rowIndex = parseInt(rowIndex, 10);
		var table = thiz.getTableEl(rowIndex);
		if(CU.isEmpty(table)) {thiz.expandRow(rowIndex); return;}
		load(rowIndex, table, record, params, callback);
	};
	
	this.removeAllRows = function(rowIndex) {
		var table = thiz.getTableEl(rowIndex);
		if(CU.isEmpty(table)) return ;
		removeAll(table);
	};
	
	this.addRow = function(rowIndex, rowData) {
		var table = thiz.getTableEl(rowIndex);
		if(CU.isEmpty(table)) return ;
		return addRow(table, rowData, rowIndex, record);
	};
	this.addEvent = function(key, callback) {
		if(!CU.isFunction(callback)) return ;
		if(key == "beforeload") {
			beforeloadEvents.push(callback);
		}else if(key == "load") {
			loadEvents.push(callback);
		}else if(key == "rowclick") {
			rowclickEvents.push(callback);
		}else if(key == "rowdblclick") {
			rowdblclickEvents.push(callback);
		}else if(key == "rowcontextmenu") {
			rowcontextmenuEvents.push(callback);
		}else if(key == "headercontextmenu") {
			headercontextmenuEvents.push(callback);
		}
	};
	this.getTableEl = function(rowIndex) {
		var record = thiz.grid.store.getAt(rowIndex);
		var tableid = "GridExpander_TableId_"+record.get("BaseFlag_BaseGrid_GridExpander_Record_Id");
		return document.getElementById(tableid);
	};
};
Ext.extend(Ext.ux.PrettyGridExpander, Ext.ux.grid.RowExpander, {	
	tableAlign : "left",
	grouping : false
});




















