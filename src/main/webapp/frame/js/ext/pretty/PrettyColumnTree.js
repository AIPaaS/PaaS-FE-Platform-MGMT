
/**
 * extends: Ext.ux.PrettyTreePanel
 * @param {} config
 * 		paging: 是否分页, true=是  false=不分   缺省为true
 * 		autoPageSize: 每页大小是否自动适应屏幕, paging=true才起效果, 缺省为:true
 * 		pageSize: 显示指定页大小, paging==true && autoPageSize==false才起作用, 缺省为:20
 * 		loadMask: 遮罩效果, 缺省为true
 */
Ext.ux.PrettyColumnTree = function(config){
	var thiz = this;
	if(CU.isEmpty(config)) config = {};
	config.local = false;
	var root = config.root;
	config.root = CU.isEmpty(root) ? new Ext.ux.ColumnTreeRoot({id:"00"}) : new Ext.ux.ColumnTreeRoot(root);
	config.rootVisible = false;
	this.loadMask = config.loadMask !== false;
	var paging = config.paging !== false;
	var autoPageSize = config.autoPageSize !== false;
	this.pageSize = CU.isEmpty(config.pageSize) ? 20 : config.pageSize;
	if(!CU.isEmpty(config.expander)) {
		this.expander = {};
		if(CU.isArray(config.expander)) {
			for(var i=0; i<config.expander.length; i++) if(!CU.isEmpty(config.expander[i].key)) this.expander[config.expander[i].key] = config.expander[i];
		}else {
			if(!CU.isEmpty(config.expander.key)) this.expander[config.expander.key] = [config.expander];
		}
	}
	if(!CU.isEmpty(config.loader)) delete config.loader;	
	delete config.paging;
	delete config.autoPageSize;
	delete config.pageSize;
	delete config.loadMask;
	delete config.expander;
	if(paging) {
		var paguu = function(start, pageSize, baseParams, pagingbar) {
			thiz.loader.baseParams["start"]=start;
			thiz.loader.baseParams[CU.BG.PS]=pageSize;
			if(thiz.loadMask) {
				if(thiz.loadMask===true) thiz.loadMask = new Ext.LoadMask(thiz.bwrap);
				thiz.loadMask.show();
			}
			thiz.root.reload(function() {
				if(thiz.loadMask) thiz.loadMask.hide();
				thiz.refreshPaging();
			});
		};
		var bbarconfig = {displayInfo:true,paguu:paguu,pageSize:thiz.pageSize};
	 	config.bbar = new Ext.ux.PrettyPagingToolbar(bbarconfig);
	}
	Ext.ux.PrettyColumnTree.superclass.constructor.apply(this, arguments);
	this.dataUrl = thiz.loader.dataUrl;
	this.loader.uiProviders = {"col": Ext.ux.ColumnNodeUI};
	if(paging && autoPageSize) {
		thiz.on("resize", function() {
			var height = CU.isEmpty(thiz.tbar) ? thiz.getInnerHeight()-27 : thiz.getInnerHeight()-54;
			thiz.pageSize = parseInt(height/25,10);
			thiz.getBottomToolbar().pageSize = thiz.pageSize;
		});
	}
	this.on("beforeload", function(node) {
		var exp = node.attributes.subexp;
		if(!CU.isEmpty(exp) && exp.indexOf("|")<0) {
			var expobj = thiz.expander[exp];
			thiz.loader.dataUrl = CU.getServerLink({url:expobj.url,requestType:1});
			if(CU.isObject(expobj.baseParams)) for(var key in expobj.baseParams) thiz.loader.baseParams[key] = expobj.baseParams[key];
			if(CU.isArray(expobj.paramfields)) for(var i=0; i<expobj.paramfields.length; i++) thiz.loader.baseParams[expobj.paramfields[i]] = node.attributes[expobj.paramfields[i]];
		}else {
			thiz.loader.dataUrl = thiz.dataUrl;
		}
	});
	this.executeQuery = function(params, callback) {
		params=CU.isEmpty(params)?[]:(CU.isArray(params)?params:[params]);
		thiz.loader.baseParams[CU.BG.AV]=CU.toString(params);
		if(paging) {
			thiz.loader.baseParams["start"]=0;
			thiz.loader.baseParams[CU.BG.PS]=thiz.getBottomToolbar().pageSize;
		}
		if(thiz.loadMask) {
			if(thiz.loadMask===true) thiz.loadMask = new Ext.LoadMask(this.bwrap);
			thiz.loadMask.show();
		}
		thiz.root.reload(function(node) {
			if(thiz.loadMask) thiz.loadMask.hide();
			if(paging) thiz.refreshPaging();
			if(CU.isFunction(callback)) callback(node);
		});
	};
	this.refreshPaging = function() {
		if(paging) {
			var pagingbar = thiz.getBottomToolbar();
			var ls = thiz.root.childNodes;
			if(CU.isEmpty(ls)) {
				pagingbar.pageNum = 1;
				pagingbar.totalPages = 1;
				pagingbar.totalRows = 0;
			}else {
				pagingbar.pageNum = parseInt(ls[0].attributes.BASEFLAG_PageNum, 10);
				pagingbar.totalPages = parseInt(ls[0].attributes.BASEFLAG_TotalPages, 10);
				pagingbar.totalRows = parseInt(ls[0].attributes.BASEFLAG_TotalRows, 10);
			}
			pagingbar.refreshFace();
		}
	};
	/**
	 * 刷新当前页
	 */
	this.reload = function(callback) {
		thiz.root.reload(callback);
	};
};
Ext.extend(Ext.ux.PrettyColumnTree, Ext.ux.PrettyTreePanel, {
    borderWidth : Ext.isBorderBox ? 0 : 2, // the combined left/right border for each cell
    cls : 'x-column-tree',
    onRender : function() {
        Ext.ux.PrettyColumnTree.superclass.onRender.apply(this, arguments);
        if(this.hiddenHeaders === true) return ;
        if(CU.isEmpty(this.title)) {
        	this.headers = this.body.createChild({cls:'x-tree-headers'},this.innerCt.dom);
        }else {
        	this.headers = this.header.createChild({cls:'x-tree-headers'});
        }
        var cols = this.columns, c;
        var totalWidth = 0;
        var scrollOffset = 19; // similar to Ext.grid.GridView default

        for(var i = 0, len = cols.length; i < len; i++){
             c = cols[i];
             totalWidth += c.width;
             this.headers.createChild({
                 cls:'x-tree-hd ' + (c.cls?c.cls+'-hd':''),
                 cn: {
                     cls:'x-tree-hd-text',
                     html: c.header
                 },
                 style:'width:'+(c.width-this.borderWidth)+'px;text-align:'+(CU.isEmpty(c.align)?'left':c.align)+';'
             });
        }
        this.headers.createChild({cls:'x-clear'});
        // prevent floats from wrapping when clipped
        var hw = totalWidth+scrollOffset;
        if(hw < this.getWidth()) hw = this.getWidth();
        if(this.border !== false) hw -= 2;
        this.headers.setWidth(hw);
        this.innerCt.setWidth(totalWidth);
    }
});
Ext.ux.ColumnTreeRoot = Ext.extend(Ext.tree.AsyncTreeNode, {
	render : function(bulkRender){
        this.ui.render(bulkRender);
        if(!this.rendered){
            this.getOwnerTree().registerNode(this);
            this.rendered = true;
        }
    }
});
Ext.ux.ColumnNodeUI = Ext.extend(Ext.tree.TreeNodeUI, {
    focus: Ext.emptyFn, // prevent odd scrolling behavior
    getRowHtml: function(n, a, targetNode, bulkRender) {
    	var cb = typeof a.checked == 'boolean';
    	var t = n.getOwnerTree();
    	var cols = t.columns;
    	var bw = t.borderWidth;
    	var c = cols[0];
    	var buf = ['<li class="x-tree-node"><div ext:tree-node-id="',n.id,'" class="x-tree-node-el x-tree-node-leaf ', a.cls,'">',
	            '<div class="x-tree-col" style="width:',c.width-bw,'px;">',
	                '<span class="x-tree-node-indent">',this.indentMarkup,"</span>",
	                '<img src="', this.emptyIcon, '" class="x-tree-ec-icon x-tree-elbow">',
	                '<img src="', a.icon || this.emptyIcon, '" class="x-tree-node-icon',(a.icon ? " x-tree-node-inline-icon" : ""),(a.iconCls ? " "+a.iconCls : ""),'" unselectable="on">',
	                cb ? ('<input class="x-tree-node-cb" type="checkbox" ' + (a.checked ? 'checked="checked" />' : '/>')) : '',
	                '<a hidefocus="on" class="x-tree-node-anchor" href="',a.href ? a.href : "#",'" tabIndex="1" ',
	                a.hrefTarget ? ' target="'+a.hrefTarget+'"' : "", '>',
	                '<span unselectable="on">', n.text || (c.renderer ? c.renderer(a[c.dataIndex], n, a) : a[c.dataIndex]),"</span></a>",
	            "</div>"];
	         for(var i = 1, len = cols.length; i < len; i++){
	             c = cols[i];
	             var v = a[c.dataIndex];
	             var align = CU.isEmpty(c.align)?'left':c.align;
	             buf.push('<div class="x-tree-col ',(c.cls?c.cls:''),'" style="width:',c.width-bw,'px;','text-align:',align,';','">',
	                        '<div class="x-tree-col-text">',(c.renderer ? c.renderer(v, n, a) : CU.isEmpty(v)?"&nbsp;":v),"</div>",
	                      "</div>");
	         }
	         buf.push('<div class="x-clear"></div></div><ul class="x-tree-node-ct" style="display:none;"></ul></li>');
	    return buf;
    },
    getExpanderRowHtml : function(n, a, targetNode, bulkRender) {
    	var cb = typeof a.checked == 'boolean';
    	var head = a.head==1||a.head=="1"||a.head==true||a.head=="true";
    	var t = n.getOwnerTree();
    	var exp = t.expander[a.bindexp];
    	var cols = exp.columns;
    	var bw = t.borderWidth;
    	var hvt = cols[0].dataIndex=="text";
    	var c = hvt ? cols[0] : {width:100};
    	var buf = [];
    	if(head) {
    		buf.push('<li class="x-tree-node"><div ext:tree-node-id="',n.id,'" class="x-tree-node-el x-tree-node-leaf ', a.cls,'">',
	            '<div class="x-tree-col" style="width:',c.width-bw,'px;height:20px;">',
	                '<span class="x-tree-node-indent">',this.indentMarkup,"</span>",
	                '<img src="', this.emptyIcon, '" class="x-tree-ec-icon x-tree-elbow">',
	                '<img src="', a.icon || this.emptyIcon, '" class="x-tree-node-icon',(a.icon ? " x-tree-node-inline-icon" : ""),(a.iconCls ? " "+a.iconCls : ""),'" unselectable="on">',
	                cb ? ('<input class="x-tree-node-cb" type="checkbox" ' + (a.checked ? 'checked="checked" />' : '/>')) : '',
	                '<a hidefocus="on" class="x-tree-node-anchor" href="',a.href ? a.href : "#",'" tabIndex="1" ',
	                a.hrefTarget ? ' target="'+a.hrefTarget+'"' : "", '>',
	                '<span unselectable="on">', n.text || (c.renderer ? c.renderer(a[c.dataIndex], n, a) : a[c.dataIndex]),"</span></a>",
	            "</div>");
    	}else {
    		buf.push('<li class="x-tree-node"><div ext:tree-node-id="',n.id,'" class="x-tree-node-el x-tree-node-leaf ', a.cls,'">',
	            '<div class="x-tree-col" style="width:',c.width-bw,'px;height:20px;">',
	            	'<span class="x-tree-node-indent">',this.indentMarkup,"</span>",
	                '<img src="', this.emptyIcon, '" class="x-tree-ec-icon x-tree-elbow">',
	                '<img src="', this.emptyIcon, '" >',
	                '<a hidefocus="on" class="x-tree-node-anchor" href="',a.href ? a.href : "#",'" tabIndex="1" ',a.hrefTarget ? ' target="'+a.hrefTarget+'"' : "", '>',
	                '<span unselectable="on">', n.text || (c.renderer ? c.renderer(a[c.dataIndex], n, a) : a[c.dataIndex]),"</span></a>",
	            "</div>");
    	}
        for(var i=hvt?1:0, len = cols.length; i < len; i++){
             c = cols[i];
             var v = a[c.dataIndex];
             v = head ? cols[i].header : (c.renderer ? c.renderer(v, n, a) : CU.isEmpty(v)?"&nbsp;":v);
             var align = CU.isEmpty(c.align)?'left':c.align;
             buf.push('<div class="x-tree-col ',(head?'tr_columnTreeExpHead':''),(c.cls?c.cls:''),'" style="width:',c.width-bw,'px;height:20px;border-right:1px solid #FFB951;border-bottom:1px solid #FFB951;',(i==(hvt?1:0)?'border-left:1px solid #FFB951;':''),'text-align:',align,';','">',
                        '<div class="x-tree-col-text">',v,"</div>",
                      "</div>");
         }
         buf.push('<div class="x-clear"></div></div><ul class="x-tree-node-ct" style="display:none;"></ul></li>');
	    return buf;
    },
    renderElements : function(n, a, targetNode, bulkRender){
        this.indentMarkup = n.parentNode ? n.parentNode.ui.getChildIndent() : '';
        var cb = typeof a.checked == 'boolean';
        var buf = CU.isEmpty(a.bindexp) ? this.getRowHtml(n, a, targetNode, bulkRender) : this.getExpanderRowHtml(n, a, targetNode, bulkRender);
        if(bulkRender !== true && n.nextSibling && n.nextSibling.ui.getEl()){
            this.wrap = Ext.DomHelper.insertHtml("beforeBegin", n.nextSibling.ui.getEl(), buf.join(""));
        }else{
            this.wrap = Ext.DomHelper.insertHtml("beforeEnd", targetNode, buf.join(""));
        }
        this.elNode = this.wrap.childNodes[0];
        this.ctNode = this.wrap.childNodes[1];
        var cs = this.elNode.firstChild.childNodes;
        this.indentNode = cs[0];
        this.ecNode = cs[1];
        this.iconNode = cs[2];
        var index = 3;
        if(cb){
            this.checkbox = cs[3];
			this.checkbox.defaultChecked = this.checkbox.checked;						
            index++;
        }
        this.anchor = cs[index];
        this.textNode = cs[index].firstChild;
    }
});
/**
 * @param {} config
 * 		key: 当前键
 * 		url: 
 * 		baseParams: 固定参数
 * 		paramfields: 指定node当前node.attributes做为参数字段
 * 		columns: Array
 */
Ext.ux.PrettyColumnTreeExpander = function (config) {
	if(CU.isEmpty(config)) config = {};
	this.key = config.key;
	this.url = config.url;
	this.baseParams = config.baseParams;
	if(!CU.isObject(this.baseParams)) this.baseParams = {};
	this.columns = config.columns;
};




