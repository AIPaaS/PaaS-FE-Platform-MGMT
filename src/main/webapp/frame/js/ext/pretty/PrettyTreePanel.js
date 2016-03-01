

/**
 * extends: Ext.tree.TreePanel
 * @param {} config: 配制参数, 扩展配制项如下:
 * 		url: 生成树方法所在的类, 缺省为TreeList
 *		ps: 对应服务方法参数
 *		local: 是否是本地树, 缺省为:false
 *		unindenting: 是否取消缩进
 */
Ext.ux.PrettyTreePanel = function(config){
	var thiz = this;
	if(CU.isEmpty(config)) config = {};
	
	var local = config.local===true;
	if(CU.isEmpty(config.root)) config.root = local ? EF.getTreeNode({id:"00"}) : EF.getTreeRoot({id:"00"});
	var fillParams = function(baseParams, params) {
		if(CU.isObject(params)) {
			for(var key in params) baseParams[key]=params[key];
		}
		return baseParams;
	};
	if(!local && CU.isEmpty(config.loader)) {
		var url = CU.getServerLink({url:config.url});
		config.loader = new Ext.tree.TreeLoader({requestMethod:"POST",dataUrl:url,baseParams:fillParams({},config.ps)});
	}
	Ext.ux.PrettyTreePanel.superclass.constructor.apply(this, arguments);
	this.on("beforeload", function(node) {
		if(!local) {
			var tb = {parentId:node.id};
			if(!CU.isEmpty(node.attributes)) {
				if(node.attributes.param1!==undefined&&node.attributes.param1!==null) tb["param1"] = node.attributes.param1;
				if(node.attributes.param2!==undefined&&node.attributes.param2!==null) tb["param2"] = node.attributes.param2;
				if(node.attributes.param3!==undefined&&node.attributes.param3!==null) tb["param3"] = node.attributes.param3;
			}
			thiz.loader.baseParams["tps"] = CU.toString(tb);
		}
	});
	this.setParams = function(ps) {
		fillParams(thiz.loader.baseParams, ps);
	};
	if(this.unindenting === true) {
		this.on("expandnode", function(n) {
			var cs = n.childNodes;
			if(CU.isEmpty(cs))return;
			for(var i=0; i<cs.length; i++) {
				var ui = cs[i].getUI();
				if(CU.isEmpty(ui)) continue ;
				ui.indentNode.style.display = "none";
				ui.ecNode.style.display = "none";
//		        ui.iconNode.style.display = "none";
			}
		});
	};
};
Ext.extend(Ext.ux.PrettyTreePanel, Ext.tree.TreePanel, {
	rootVisible: false,
	autoScroll: true,
	animate: true,
	afterRender : function(){
        Ext.tree.TreePanel.superclass.afterRender.call(this);
        if(this.autoRenderRoot!==false) {
        	this.root.render();
        	if(!this.rootVisible){
	            this.root.renderChildren();
	        }
        }
    }
});

