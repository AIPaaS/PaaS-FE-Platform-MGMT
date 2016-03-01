/**
 * Ext组件生成工厂
 */
function ExtFactory() {
	var thiz = this;
	
	
	this.getStore = function(config) {
		config.url = CU.getServerLink({url:config.url});
		var store = new Ext.data.JsonStore(config);
		store.on("exception", function(dataProxy, type, action, options, response, arg) {
			store.response = response;
		});
		return store;
	};
	this.getPagingStore = function(config) {
		config.url = CU.getServerLink({url:config.url});
		if(CU.isEmpty(config.root)) config.root = "data";
		if (CU.isEmpty(config.totalProperty)) config.totalProperty = "totalRows";
		var store = new Ext.data.JsonStore(config);
		store.on("exception", function(dataProxy, type, action, options, response, arg) {
			store.response = response;
		});
		return store;
	};
	this.getGroupingStore = function(config) {if(CU.isEmpty(config.url)) config.url = CU.getServerLink({action:config.action,service:config.service,method:config.method});var store=new Ext.data.GroupingStore(config);store.on("exception", function(dataProxy, type, action, options, response, arg) {store.response=response;});return store;};
	this.getPagingToolbar = function(config) {var toolbar = new Ext.PagingToolbar(config);toolbar.inputItem.style = "text-align:center;";return toolbar;};
	this.getClientStore = function(array) {var items = [];if(array!=undefined && array!=null) {for(var i=0; i<array.length; i++) {items[i] = [array[i].codeid,array[i].codename];}}return new Ext.data.Store({proxy: new Ext.data.MemoryProxy(items),reader: new Ext.data.ArrayReader({},[{name:'codeid'},{name:'codename'}])});};
	this.getListBoxStore = function(array) {var store = new Ext.data.Store({proxy: new Ext.data.MemoryProxy(),reader: new Ext.data.JsonReader({},['codeid','codename']),data:array});return store;};
	this.getColumnModel = function(array) {return new Ext.grid.ColumnModel(array);};
	this.getLockingColumnModel = function(array) {return new Ext.ux.grid.LockingColumnModel(array);};
	this.getLabel = function(config) {if(CU.isEmpty(config)) config = {};if(CU.isEmpty(config.readOnly)) config.readOnly = true;return new Ext.form.Label(config);};
	this.getTextField = function(config) {if(CU.isEmpty(config)) config = {};if(config.allowBlank===false&&!CU.isEmpty(config.fieldLabel)) config.fieldLabel += "<font color='red'>*</font>";return new Ext.ux.PrettyTextField(config);};
	this.getUploadField = function(config) {return new Ext.ux.PrettyUploadField(config);};
	this.getSelectField = function(config) {if(CU.isEmpty(config))config ={};if(config.allowBlank===false&&!CU.isEmpty(config.fieldLabel)) config.fieldLabel += "<font color='red'>*</font>";return new Ext.ux.PrettySelectField(config);};
	this.getTextArea = function(config) {if(CU.isEmpty(config))config={};if(config.allowBlank===false&&!CU.isEmpty(config.fieldLabel)) config.fieldLabel += "<font color='red'>*</font>";return new Ext.ux.PrettyTextArea(config);};
	this.getNumberField = function(config) {if(CU.isEmpty(config)) config = {};if(config.allowBlank===false&&!CU.isEmpty(config.fieldLabel)) config.fieldLabel += "<font color='red'>*</font>";if(CU.isEmpty(config.decimalPrecision)) config.decimalPrecision = 2;return new Ext.ux.PrettyNumberField(config);};
	this.getDateField = function(config) {if(CU.isEmpty(config)) config = {};if(config.allowBlank===false&&!CU.isEmpty(config.fieldLabel)) config.fieldLabel += "<font color='red'>*</font>";return new Ext.ux.PrettyDateField(config);};
	this.getDatetimeField = function(config) {if(CU.isEmpty(config)) config = {};if(config.allowBlank===false&&!CU.isEmpty(config.fieldLabel)) config.fieldLabel += "<font color='red'>*</font>";return new Ext.ux.PrettyDateTimeField(config);};
	this.getSpinnerField = function(config) {return new Ext.ux.form.SpinnerField(config);};
	this.getCheckBox = function(config) {if(CU.isEmpty(config)) config = {};if(config.allowBlank===false&&!CU.isEmpty(config.fieldLabel)) config.fieldLabel += "<font color='red'>*</font>";return new Ext.form.Checkbox(config);};
	this.getRadio = function(config) {if(CU.isEmpty(config)) config = {};if(config.allowBlank===false&&!CU.isEmpty(config.fieldLabel)) config.fieldLabel += "<font color='red'>*</font>";return new Ext.form.Radio(config);};
	this.getTextItem = function(config) {return new Ext.Toolbar.TextItem(config);};
	this.getButton = function(config) {var btn = new Ext.Button(config);if(!CU.isEmpty(config) && !CU.isEmpty(config.name)) {btn.on("render",function() {btn.el.dom.name = config.name;});}return btn;};
	this.getProgressBar = function(config) {return new Ext.ProgressBar(config);};
	this.getMenuItem = function(config) {return new Ext.menu.Item(config);};
	this.getCheckItem = function(config) {return new Ext.menu.CheckItem(config);};
	this.getMenu = function(config) {return new Ext.menu.Menu(config);};
	this.getCheckColumn = function(config) {return new Ext.grid.CheckColumn(config);};
	this.getToolBar = function(config) {return new Ext.Toolbar(config);};
	this.getFieldSet = function(config) {if(CU.isEmpty(config)) config = {};if(CU.isEmpty(config.collapsible)) config.collapsible = false;if(CU.isEmpty(config.autoHeight)) config.autoHeight = true;if(CU.isEmpty(config.autoWidth)) config.autoWidth = true;return new Ext.form.FieldSet(config);};
	this.getTreeRoot = function(config) {if(CU.isEmpty(config)) config = {};if(CU.isEmpty(config.draggable)) config.draggable = false;return new Ext.tree.AsyncTreeNode(config);};
	this.getTreeNode = function(config) {return new Ext.ux.PrettyTreeNode(config);};
	this.getComboBox = function(config) {if(CU.isEmpty(config)) config = {};if(config.allowBlank===false&&!CU.isEmpty(config.fieldLabel))config.fieldLabel+="<font color='red'>*</font>";return new Ext.ux.PrettyComboBox(config);};
	this.getListBox = function(config) {return new Ext.ux.PrettyListBox(config);};
	this.getSearchField = function(config) {if(CU.isEmpty(config)) config = {};if(config.allowBlank===false&&!CU.isEmpty(config.fieldLabel))config.fieldLabel+="<font color='red'>*</font>";config.editable=true;config.mode="remote";if(CU.isEmpty(config.minChars))config.minChars=1;if(CU.isEmpty(config.queryDelay))config.queryDelay=200;if(CU.isEmpty(config.triggerAction))config.triggerAction="all";if(CU.isEmpty(config.valueField))config.valueField="codeid";if(CU.isEmpty(config.displayField))config.displayField="codename";if(CU.isEmpty(config.cls))config.cls="ef_comb_hidedrop";if(CU.isEmpty(config.hideTrigger))config.hideTrigger=true;if(CU.isEmpty(config.queryParam)) config.queryParam=CU.BG.SP;config.sourcetype=false;config.dynamic=false;return new Ext.ux.PrettyComboBox(config);};
	this.getTreePanel = function(config) {return new Ext.ux.PrettyTreePanel(config);};
	this.getClientTree = function(config) {if(CU.isEmpty(config)) config = {};config.local = true;var data=config.data,iconDir=config.iconDir;if(CU.isEmpty(config.root)) {config.root = thiz.getTreeNode({id:"00",leaf:0});}else if(!(config.root instanceof Ext.tree.TreeNode) && !(config.root instanceof Ext.ux.PrettyTreeNode) && !(config.root instanceof Ext.tree.AsyncTreeNode)) {config.root = thiz.getTreeNode(config.root);}if(CU.isArray(data)) {EU.parseTreeData(config.root, data, iconDir);}else {var url=CU.getServerLink({service:service,method:config.method});CU.request({url:url,params:config.params,async:false,success:function(response) {var result = CU.toObject(response.responseText);EU.parseTreeData(config.root, result, iconDir);if(CU.isFunction(callback)) callback();}});}delete config.data;delete config.iconDir;delete config.callback;var tree = thiz.getTreePanel(config);tree.on("checkchange", function(node,checked) {if(config.clientcascade === true) {var childs = node.childNodes;if(!CU.isEmpty(childs)) {for(var i=0; i<childs.length; i++) {if(childs[i].rendered===false && (childs[i] instanceof Ext.ux.PrettyTreeNode)) {EU.setAllChildsChecked(childs[i], checked);}else {childs[i].setChecked(checked);}}}if(checked === true) {config.clientcascade = false;EU.setCascadeParentChecked(node, checked);config.clientcascade = true;}}});return tree;};
	this.getTreeBox = function(config) {if(CU.isEmpty(config)) config = {};if(config.allowBlank===false&&!CU.isEmpty(config.fieldLabel)) config.fieldLabel += "<font color='red'>*</font>";var root = config.root;var action = CU.isEmpty(config.action) ? "/ExtTree.do" : config.action;var service = CU.isEmpty(config.service) ? "TreeList" : config.service;var method = config.method;var params = CU.isEmpty(config.params) ? {} : config.params;var click = config.click;var iconDir = config.iconDir;var renderer = config.renderer;var reloadAll = !(config.reloadAll === false);var single;var onlyLeaf = config.onlyLeaf === true;var cascade = !(config.cascade === false);var listWidth = CU.isEmpty(config.listWidth) ? 360 : config.listWidth;var listHeight = CU.isEmpty(config.listHeight) ? 360 : config.listHeight;delete config.root;delete config.action;delete config.service;delete config.method;delete config.params;delete config.click;delete config.iconDir;delete config.renderer;delete config.reloadAll;delete config.onlyLeaf;delete config.cascade;delete config.listWidth;delete config.listHeight;config.listWidth = listWidth + 2;config.maxHeight = listHeight + 2;config.store = new Ext.data.Store({proxy: new Ext.data.MemoryProxy([[]]),reader:new Ext.data.ArrayReader({},[])});var box = thiz.getComboBox(config);var tpdivid = "base_divid_"+CU.getId();var tp = thiz.getPanel({layout:"fit",border:false,width:listWidth,height:listHeight,html:"<div id='"+tpdivid+"'>&nbsp;<img align='middle' src='"+ContextPath+"/framework/images/icons/16x16/loading.gif'></img><span>&nbsp;正在加载数据...</span></div>"});var tree;var rendered = false;var setValue = function() {var value = box.getValue();if(single) {if(reloadAll && !CU.isEmpty(value)) {var node = tree.getNodeById(value);if(!CU.isEmpty(node)) node.select();}}else {var array = !CU.isEmpty(value)&&value.length>0 ? value.split(",") : [];var cascade_bak = cascade;cascade = false;EU.setNodesChecked(array, tree.root);cascade = cascade_bak;}};var divid = "base_divid_"+CU.getId();box.tpl = "<div id='"+divid+"'></div>";box.on("expand", function(combo) {if(rendered) {setValue();}else {var url = ContextPath+action+"?service="+service+"&method="+method;Ext.Ajax.request({url:url,method:"POST",params:params,success:function(response, options) {var result = eval(response.responseText);single = result.length==0 || CU.isEmpty(result[0].checked);var treeconfig = {border:false,local:true,root:root,width:listWidth,height:listHeight};treeconfig.click = function(node) {if(single===true && (!onlyLeaf || (onlyLeaf&&CU.isEmpty(node.childNodes)))) {box.store.getAt(0).data["codeid"] = node.id;box.store.getAt(0).data["codename"] = node.text;box.setValue(node.id);box.el.dom.value = node.text;box.collapse();}if(CU.isFunction(click)) click(node);};if(single === false) {var submit = thiz.getButton({text:"确定", iconCls:"btn_passing" ,handler:function() {var array = [];EU.getCheckedNodes(array, tree.root, onlyLeaf);var sb_id = "";var sb_text = "";for(var i=0; i<array.length; i++) {if(i > 0) {sb_id += ",";sb_text += ",";}sb_id += (CU.isEmpty(array[i].id) ? "" : array[i].id);sb_text += "\""+(CU.isEmpty(array[i].text) ? "" : array[i].text)+"\"";}box.store.getAt(0).data["codeid"] = sb_id;box.store.getAt(0).data["codename"] = sb_text;box.setValue(sb_id);box.el.dom.value = sb_text;box.collapse();}});var cancel = thiz.getButton({text:"取消",iconCls:"btn_close",handler:function() {box.collapse();}});treeconfig.tbar = thiz.getToolBar({height:26,items:["->",submit,cancel]});}tree = thiz.getTreePanel(treeconfig);if(cascade) {tree.on("checkchange", function(node,checked) {if(cascade) {var childs = node.childNodes;if(CU.isEmpty(childs)) return ;for(var i=0; i<childs.length; i++) {childs[i].setChecked(checked);}}});}EU.parseTreeData(tree.root, result, iconDir);tp.add(tree);tp.doLayout();if(reloadAll) tree.expandAll();setValue();if(CU.isFunction(renderer)) renderer(tree);rendered = true;}});}tp.render(divid);});return box;};
	this.getGridRemark = function(tmp) {return new Ext.grid.RowExpander({tpl : new Ext.Template(tmp)});};
	this.getGridExpander = function(config) {return new Ext.ux.PrettyGridExpander(config);};
	this.getColumnTreeExpander = function(config) {return new Ext.ux.PrettyColumnTreeExpander(config);};
	this.getGridPanel = function(config) {return new Ext.ux.PrettyGridPanel(config);};
	this.getRowClass = function(fields) {var columns = [];for(var i=0; i<fields.length; i++) {columns.push({name:fields[i], type:"string"});}return Ext.data.Record.create(columns);};
	this.getEditorGrid = function(config) {return new Ext.ux.PrettyEditorGrid(config);};
	this.getColumnTree = function(config) {return new Ext.ux.PrettyColumnTree(config);};
	this.getTreeGrid = function(config) {return new Ext.ux.PrettyTreeGrid(config);};
	this.getReportPanel = function(config) {return new Ext.ux.PrettyReportPanel(config);};
	this.getFreeChart = function(config) {config.service="Common";config.method="forwardFreeChart";config.params = [config.template,config.params];return this.getReportPanel(config);};
	this.getRunqianReport = function(config) {return new Ext.ux.PrettyRunqianReport(config);};
	this.getHtmlEditor = function(obj, buttons) {if(obj==undefined || obj==null) obj = {};if(obj.fontFamilies==undefined || obj.fontFamilies==null) obj.fontFamilies = ["Arial","Courier New","Tahoma","Times New Roman","Verdana","仿宋_GB2312","华文中宋","华文仿宋","华文宋体","华文彩云","华文新魏","华文楷体","华文琥珀","华文细黑","华文行楷","华文隶书","宋体","宋体-PUA","宋体-方正超大字符集","幼圆","微软雅黑","新宋体","方正姚体","方正舒体","楷体_GB2312","隶书","黑体"];if(obj.enableSourceEdit==undefined || obj.enableSourceEdit==null) obj.enableSourceEdit = false;if(obj.enableLinks==undefined || obj.enableLinks==null) obj.enableLinks = false;var htmlEditor = new Ext.form.HtmlEditor(obj);return htmlEditor;};
	this.getPanel = function(config) {if(CU.isEmpty(config)) config = {};if(CU.isEmpty(config.animate)) config.animate = true;if(CU.isEmpty(config.collapsible)) config.collapsible = false;if(config.layout==="form") {if(CU.isEmpty(config.labelWidth)) config.labelWidth = 68;if(CU.isEmpty(config.labelAlign)) config.labelAlign = "right";}return new Ext.Panel(config);};
	this.getPortal = function(config) {if(CU.isEmpty(config)) config = {};return new Ext.ux.Portal(config);};
	this.getPortlet = function(config) {if(CU.isEmpty(config)) config = {};return new Ext.ux.Portlet(config);};
	this.getFormPanel = function(config) {return new Ext.ux.PrettyFormPanel(config);};
	this.getTabPanel = function(config) {if(CU.isEmpty(config)) config = {};if(CU.isEmpty(config.deferredRender)) config.deferredRender = false;if(CU.isEmpty(config.enableTabScroll)) config.enableTabScroll = true;if(CU.isEmpty(config.minTabWidth)) config.minTabWidth = 115;if(CU.isEmpty(config.tabWidth)) config.tabWidth = 135;if(CU.isEmpty(config.resizeTabs)) config.resizeTabs = true;if(CU.isEmpty(config.enableTabScroll)) config.enableTabScroll = true;if(CU.isEmpty(config.activeTab)) config.activeTab = 0;return new Ext.TabPanel(config);};
	this.getTabCardPanel = function(config) {return new Ext.ux.PrettyTabCardPanel(config);};
	this.getWindow = function(config) {if(CU.isEmpty(config)) config = {};if(CU.isEmpty(config.modal)) config.modal = true;if(CU.isEmpty(config.resizable)) config.resizable = false;if(CU.isEmpty(config.closable)) config.closable = true;if(CU.isEmpty(config.closeAction)) config.closeAction = "hide";return new Ext.Window(config);};
	this.getRowPanel = function(config,arr,rowconfig) {var lw = CU.isEmpty(config.labelWidth) ? 100 : config.labelWidth;var sc = 1 / config.cols;var items = [];for(var i=0; i<config.cols; i++) if(arr.length > i) items.push({border:false,columnWidth:(CU.isEmpty(arr[i].columnWidth)?sc:arr[i].columnWidth),layout:"form",labelWidth:lw,labelAlign:"right",items:[arr[i].field]});if(CU.isEmpty(rowconfig)) rowconfig = {};rowconfig.border = false;rowconfig.layout = "column";rowconfig.columnWidth = 1.0;rowconfig.items = items;return rowconfig;};
	this.getSEditorGrid = function(cfg){return new PrettySEditorGrid(cfg);};
	this.getAttachView = function(cfg){return new Ext.ux.PrettyAttachView(cfg);};
}
var EF=new ExtFactory();




