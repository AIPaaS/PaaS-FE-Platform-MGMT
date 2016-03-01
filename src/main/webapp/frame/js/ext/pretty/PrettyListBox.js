

/**
 * @class Ext.ux.PrettyListBox
 * @extends Ext.DataView
 * 扩展参数: 
 * 		service: 对应服务, 缺省为DropList
 * 		selectedValue: index\value,指定组件加载后自动选择
 * 		sourcetype: 取数据类型, true||'view'表示从视图中取数据, false||'method'表示从DropListService中取数据, 缺少为:true
 * 		sourcename: 如果数据是从视图中取,则为视图名, 如果从DropListService中取数据则为service中方法名
 * 		addempty: 是否添加一个空行, true=添加, false=不添加, 缺省为:false
 * 		params: 防问服务器所带参数
 */
Ext.ux.PrettyListBox = Ext.extend(Ext.DataView, {
    singleSelect:true,
	tpl: new Ext.XTemplate('<tpl for=".">','<div class="x-combo-list-item">{codename}</div>','</tpl>'),
    style:'cursor:pointer;overflow:auto',
    cls:'x-combo-list-inner',
    ctCls:'x-combo-list',
    overClass:'x-view-over',
    selectedClass:'x-combo-selected',
    itemSelector:'div.x-combo-list-item',
    initComponent: function() {
        Ext.ux.PrettyListBox.superclass.initComponent.call(this);
    },
    onRender:function() {
		Ext.ux.PrettyListBox.superclass.onRender.apply(this,arguments);
		var thisobj = this;
		this.el.dom.onselectstart=function(){return false} //防止鼠标选择
		new Ext.KeyNav(this.el, {
		  "up" : function(e) {
			        var selIndex=thisobj.getSelectedIndexes()[0]-1;
			        var index=selIndex>-1?selIndex:thisobj.store.getCount()-1;
			      	thisobj.select(index);
		  		},
		  "down" : function(e) {
		             var selIndex=thisobj.getSelectedIndexes()[0]+1;
		             var index=selIndex==thisobj.store.getCount()?0:selIndex;
		             thisobj.select(index);
		      }
		});
	    this.on('selectionchange', function(t,node) {    //定位选中项保证可见
	        if(!(node=node[0]))return;
	        var ct=this.el.dom,barHeight=0,diff;
	        var ctSt=ct.scrollTop,nodeOft=node.offsetTop;
	        if(ct.offsetHeight-ct.clientHeight>5){
	            barHeight=16;
	        }
	        var cntPos=[ctSt,ctSt+ct.offsetHeight-barHeight];
	        var nodePos=[nodeOft,nodeOft+node.offsetHeight];
	        if(nodePos[0]<cntPos[0]){
	            ct.scrollTop=nodeOft;
	        }
	        if((diff=nodePos[1]-cntPos[1])>0){
	            ct.scrollTop=ctSt+diff+2;
	        }
	    });
	    if(CU.isEmpty(this.store)) {
	    	var sourcetype = CU.isEmpty(this.sourcetype) ? true : this.sourcetype;
            var sourcename = this.sourcename;
            var addempty = CU.isEmpty(this.addempty) ? false : this.addempty;
            var params = CU.isEmpty(this.params) ? {} : this.params;
            var service = CU.isEmpty(this.service) ? "DropList" : this.service;
			var ps = {requestType:1,addempty:addempty};
			if(sourcetype===true||sourcetype==="view") ps.viewname = sourcename;
			var url = CU.getServerLink({service:service,method:(sourcetype===true||sourcetype==="view")?"getDropListByView":sourcename,params:ps});
	    	this.store = new Ext.data.Store({
				proxy: new Ext.data.HttpProxy({url:url}),
				baseParams: params,
				reader: new Ext.data.JsonReader({},[{name:"codeid"},{name:"codename"}])
			});
	    }
	    if(this.autoLoad !== false) this.store.reload();
	    this.store.on('load',function() {
	        thisobj.select(0);
	        if(thisobj.selectedValue!=undefined && thisobj.selectedValue!=null) thisobj.setSelected(thisobj.selectedValue);
	    });
	    
	    /**
	     * 获取选中值
	     */
	    this.getValue = function() {
            var recs = thisobj.getSelectedRecords();
            var value;
            if(recs.length > 0) {
                value = recs[0].get("codeid");
            }
            return value;
	    }
	    /**
	     * 获取选中显示值
	     */
	    this.getText = function() {
	        var recs = thisobj.getSelectedRecords();
            var value;
            if(recs.length > 0) {
                value = recs[0].get("codename");
            }
            return value;
	    }
	    
	    /**
	     * 获取多行选中值
	     */
	    this.getValues = function() {
	        var values = [];
	        var recs = thisobj.getSelectedRecords();
	        Ext.each(recs, function(rec){
	            values.push(rec.get('codeid'));
            });
            return values;
	    }
	    
	    /**
	     * 获取多行选中显示值
	     */
	    this.getTexts = function() {
	        var texts = [];
	        var recs = thisobj.getSelectedRecords();
	        Ext.each(recs, function(rec){
	            texts.push(rec.get('codename'));
            });
            return texts;
	    }
	    
	    /**
	     * 设置选中项, index:Number\String
	     */
	    this.setSelected = function(index) {
	        if(index==undefined || index==null) return ;
	        if(typeof(index)=="int") {
	            thisobj.select(index);
	        }else {
	            var count = thisobj.store.getCount();
	            for(var i=0; i<count; i++) {
	                var record = thisobj.store.getAt(i);
	                if(index == record.get("codeid")) {
	                    thisobj.select(i);
	                    return ;
	                }
	            }
	        }
	    }	    
	}
});