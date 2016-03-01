
/**
 * extends: Ext.grid.GridPanel
 * @param {} config: 配制参数, 扩展配制项如下:
 * 		action: 所走的action, 缺少为dynamicAction
 * 		service: 生成树方法所在的类, 缺省为当前service
 * 		method: service中取数据的方法名
 * 		baseParams: 基础参数
 * 		fields: 数据字段, store为空时还采用内部创建方式
 * 		rowClass: 
 * 		root: 根结点对象, 缺省为: {id:"00"}
 * 		rootVisible: 是否显示根结点, 缺省为:false
 */
Ext.ux.PrettyTreeGrid = function(config){
	var thisobj = Context.PrettyTreeGrid = this;
	
	var firstColumn;
	
	var allNodes = [];
	
	if(CU.isEmpty(config)) config = {};
	this.baseParams = CU.isObject(config.baseParams) ? config.baseParams : {};
	var action = CU.isEmpty(config.action) ? dynamicAction : config.action;
	var serviceName = CU.isEmpty(config.service) ? dynamicService : config.service;
	var method = config.method;
	var url = ContextPath+action+"?service="+serviceName+"&baseflag_requestType=1&method="+method;
	var fields = config.fields;
	var RowClass = config.rowClass;
	if(CU.isEmpty(RowClass)) RowClass = EF.getRowClass(fields);
	var rootVisible = config.rootVisible === true;
	var rootData = CU.isEmpty(config.root) ? {id:"00"} : config.root;
	var root = new TreeGridNode({id:rootData.id, text:rootData.text, icon:rootData.icon, leaf:rootData.leaf});
	root.level = rootVisible ? 0 : -1;
	allNodes.push(root);
	
	delete config.action;
	delete config.service;
	delete config.method;
	delete config.fields;
	delete config.rowClass;
	delete config.root;
	delete config.rootVisible;
	delete config.baseParams;
	
	config.loadMask = false;
	config.enableHdMenu = false;
	if(!CU.isEmpty(config.store)) delete config.store;
	config.store = new Ext.data.Store({fields:fields});
	
	Ext.ux.PrettyTreeGrid.superclass.constructor.apply(this, arguments);
	
	var cm = this.getColumnModel();
	for(var i=0; i<cm.config.length; i++) {
		if(!(cm.config[i] instanceof Ext.grid.Column)) continue;
		if(CU.isEmpty(firstColumn)) {
			firstColumn = cm.config[i];
			if(!CU.isEmpty(firstColumn.align)) firstColumn.align = "left";
		}
		if(!CU.isEmpty(cm.config[i].sortable)) cm.config[i].sortable = false;
	}
	
	firstColumn.renderer = function(value,metadate,record,row,col) {
		var id = record.get("id");
		if(CU.isEmpty(id)) return ;
		var node = thisobj.getNodeById(id);
		if(CU.isEmpty(node)) {
			var text = record.get("text");
			var icon = record.get("icon");
			var leaf = record.get("leaf");
			var parentid = record.get("parentid");
			node = new TreeGridNode({id:id,text:text,icon:icon,leaf:leaf,parentid:parentid,record:record});
			var parentnode = thisobj.getNodeById(parentid);
			node.level = parentnode.level + 1;
			allNodes.push(node);
		}
		var html = node.getHtml();
		return html;
	}
	
	var initData = function() {
		if(rootVisible) {
			var record = new RowClass();
			for(var i=0; i<fields.length; i++) {
				record.set(fields[i], rootData[fields[i]]);
			}
			thisobj.store.insert(0, record);
		}else {
			loadData(0, rootData.id);
		}
	}
	
	this.getNodeById = function(id) {
		for(var i=0; i<allNodes.length; i++) {
			if(allNodes[i].id == id) {
				return allNodes[i];
			}
		}
	}
	
	this.getChildsByParentId = function(parentid) {
		var childs = [];
		for(var i=0; i<allNodes.length; i++) {
			if(allNodes[i].parentid === parentid) {
				childs.push(allNodes[i]);
			}
		}
		return childs;
	}
	
	var loadData = function(index, parentid, callback) {
		thisobj.baseParams.node = parentid;
		Ext.Ajax.request({url:url,method:"POST",params:thisobj.baseParams,success:function(response, options) {
			var data = eval(response.responseText);
			if(CU.isArray(data) && data.length>0) {
				for(var i=data.length-1; i>=0; i--) {
					var record = new RowClass();
					for(var j=0; j<fields.length; j++) {
						record.set(fields[j], data[i][fields[j]]);
					}
					thisobj.store.insert(index, record);
				}
			}
			if(CU.isFunction(callback)) callback(CU.isEmpty(data)?0:data.length);
		}});
	}
	
	this.expandNodeById = function(nodeid) {
		var node = thisobj.getNodeById(nodeid);
		if(node.isLeaf()) return ;
		if(node.expanded) {
			thisobj.collapseNode(node);
		}else {
			if(!node.loaded) {
				node.loading();
				var index = thisobj.getNodeIndex(nodeid)+1;
				loadData(index, nodeid, function(result) {
					node.loaded = true;
					node.expanded = true;
					if(result===0) node.leaf = true;
					node.refresh();
				});
			}else {
				expandNode(node);
			}
		}
	}
	
	this.getNodeIndex = function(nodeid) {
		var count = thisobj.store.getCount();
		var index = -1;
		for(var i=0; i<count; i++) {
			if(thisobj.store.getAt(i).get("id") === nodeid) {
				index = i;
				break;
			}
		}
		return index;
	}
	
	var expandNode = function(node) {
		if(node.isLeaf()) return ;
		if(!node.expanded) {
			var childs = thisobj.getChildsByParentId(node.id);
			var index = thisobj.getNodeIndex(node.id)+1;
			for(var i=childs.length-1; i>=0; i--) {
				childs[i].visible = true;
				thisobj.store.insert(index, childs[i].record);
			}
			node.expanded = true;
			node.refresh();
		}
	}
	
	this.collapseNode = function(node) {
		if(node.expanded) {
			var childs = thisobj.getChildsByParentId(node.id);
			for(var i=0; i<childs.length; i++) {
				childs[i].visible = false;
				thisobj.store.remove(childs[i].record);
				if(node.expanded) thisobj.collapseNode(childs[i]);
			}
			node.expanded = false;
			node.refresh();
		}
	}
	
	this.reload = function() {
		this.store.removeAll();
		initData();
	}
	
	this.on("render", function() {
		initData();
	});
	
	
};

Ext.extend(Ext.ux.PrettyTreeGrid, Ext.grid.GridPanel, {
	autoSizeColumns: true,
	autoScroll: true,
	stripeRows: true,
	cellHeight: 50,
	enableColumnMove:false,
	sm: new Ext.grid.CheckboxSelectionModel({singleSelect:true})
});

/**
 * @param {} config
 * 		id: 
 * 		text:
 * 		icon:
 * 		leaf:
 * 		parentid: 
 * 		record:
 */
function TreeGridNode(config) {
	var thisobj = this;
	
	this.id = config.id;
	this.text = config.text;
	this.icon = config.icon;
	this.leaf = config.leaf;
	this.parentid = config.parentid;
	this.record = config.record;
	
	this.level;				//级别
	this.tabspace = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
	this.visible = true;	//是否显示
	this.expanded = false;	//是否展开
	this.loaded = false;	//是否取过数据
	
	
	
	this.getBowImg = function() {
		return ContextPath+"/framework/images/icons/16x18/"+(this.isLeaf() ? "s.gif" : (this.expanded?"elbow-end-minus-nl.gif":"elbow-end-plus-nl.gif"));
	}
	this.getIconImg = function() {
		return CU.isEmpty(this.icon) ? ContextPath+"/framework/images/icons/16x18/"+(this.isLeaf() ? "leaf.gif" : (this.expanded?"folder-open.gif":"folder.gif")) : this.icon;
	}
	
	this.getHtml = function() {
		var html = "";
		var bowimg = "<img id='treegrid_bowimg_"+thisobj.id+"' onclick='treeGridNode_expand(\""+thisobj.id+"\")' class='ux-gridtree-bowimg' src='"+thisobj.getBowImg()+"' ></img>";
		var iconimg = "<img id='treegrid_iconimg_"+thisobj.id+"' ondblclick='treeGridNode_expand(\""+thisobj.id+"\")' class='ux-gridtree-iconimg' src='"+thisobj.getIconImg()+"' ></img>";
		var texthtml = "<span class='ux-gridtree-text' ondblclick='treeGridNode_expand(\""+thisobj.id+"\")'>"+thisobj.text+"</span>";
		html += thisobj.getTabHtml() + bowimg + iconimg + "&nbsp;" + texthtml;
		return html;
	}
	
	this.getTabHtml = function() {
		if(CU.isEmpty(thisobj.level) || thisobj.level<=0) return "";
		var tabhtml = "";
		for(var i=0; i<thisobj.level; i++) {
			tabhtml += thisobj.tabspace;
		}
		return tabhtml;
	}
	
	this.refresh = function() {
		var bowimg = document.getElementById("treegrid_bowimg_"+thisobj.id);
		if(!CU.isEmpty(bowimg)) bowimg.src = thisobj.getBowImg();
		var iconimg = document.getElementById("treegrid_iconimg_"+thisobj.id)
		if(!CU.isEmpty(iconimg)) iconimg.src = thisobj.getIconImg();
	}
	
	this.loading = function() {
		var iconimg = document.getElementById("treegrid_iconimg_"+thisobj.id);
		if(!CU.isEmpty(iconimg)) iconimg.src = ContextPath+"/framework/images/icons/16x16/loading.gif";
	}
	
	this.isLeaf = function() {
		return this.leaf===true || this.leaf===1 || this.leaf==="1";
	}
	
}


function treeGridNode_expand(nodeid) {
	Context.PrettyTreeGrid.expandNodeById(nodeid);
}





