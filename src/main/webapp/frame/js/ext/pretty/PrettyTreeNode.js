

/**
 * extends: Ext.tree.TreeNode
 * @param {} config
 */
Ext.ux.PrettyTreeNode = function(config) {
	if(CU.isEmpty(config)) config = {};
	
	var thisobj = this;
	
	this.nodeChecked = config.checked;
	
	var isexpanded = false;		//是否展开过
	
	Ext.ux.PrettyTreeNode.superclass.constructor.apply(this, arguments);
	
	/**
	 * 设置当节点是否被选中，如果当前节点是不太复选框的，不起作用
	 */
	this.setChecked = function(checked) {
		if(CU.isEmpty(thisobj.nodeChecked)) return ;
		thisobj.nodeChecked = checked;
		if(thisobj.rendered) thisobj.getUI().toggleCheck(checked);
	}
	
	/**
	 * 判断当前节点是否被选中  return true||false, 如果当前节点不带复选框，则return undefined
	 */
	this.isChecked = function() {
		if(CU.isEmpty(thisobj.nodeChecked)) return ;
		if(thisobj.rendered) thisobj.nodeChecked = thisobj.getUI().isChecked();
		return thisobj.nodeChecked;
	}
	
	/**
	 * 初始化当前节点被选构
	 */
	this.initCheck = function() {
    	if(!CU.isEmpty(thisobj.nodeChecked) && thisobj.rendered) thisobj.getUI().toggleCheck(thisobj.nodeChecked);
    }
	
	this.on("expand", function() {
		if(isexpanded) return;
		isexpanded = true;
		var ownertree = thisobj.getOwnerTree();
		var clientcascade_bak = false;
		if(!CU.isEmpty(ownertree)) {
			clientcascade_bak = ownertree.initialConfig.clientcascade;
			ownertree.initialConfig.clientcascade = false;
		}
		var childs = thisobj.childNodes;
		if(CU.isArray(childs) && childs.length>0) {
			for(var i=0; i<childs.length; i++) {
				if(childs[i] instanceof Ext.ux.PrettyTreeNode) {
					if(!CU.isEmpty(childs[i].nodeChecked)) childs[i].getUI().toggleCheck(childs[i].nodeChecked);
				}else {
					if(CU.isEmpty(childs[i].attributes) || CU.isEmpty(childs[i].attributes.checked)) continue ;
					childs[i].getUI().toggleCheck(childs[i].attributes.checked);
				}
			}
		}
		if(!CU.isEmpty(ownertree)) ownertree.initialConfig.clientcascade = clientcascade_bak;
	});
	
	/**
	 * 判断当前节点是否已被宣染
	 */
	this.isRendered = function() {
		return thisobj.rendered;
	}
};
Ext.extend(Ext.ux.PrettyTreeNode, Ext.tree.TreeNode, {
	hasChildNodes : function() {
		return CU.isEmpty(this.leaf) ? Ext.ux.PrettyTreeNode.superclass.hasChildNodes.call(this) : (this.leaf===false || this.leaf==="false" || this.leaf==="0" || this.leaf===0);
    }
});


