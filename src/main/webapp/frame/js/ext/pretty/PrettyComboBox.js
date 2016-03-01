
/**
 * extends: Ext.form.ComboBox
 * @param {} cfg: 配制参数, 扩展配制项如下:
 * 		url: 
 *		ps: {}
 *		def: 与url互斥, 指定了此参数url不起作用, 标识从系统代码中取数据
 *		codes: 与def同组, def有值此参数才起作用, 指定查询出指定代码
 * 		
 * 		addempty: 是否添加一个空行, true=添加, false=不添加, 缺省为:false
 * 		appattr: 是否需要服务器返回整条记录
 * 		dynamic: 是否动态取数据, true=动态  false=静态, 缺少为:false
 * 	
 * 		remote: 指定数据是否从远程服务器取, 缺省为false, 如果为false,则以上参数除def、dynamic=true之外都无效, dynamic=true时此参数无效
 */
Ext.ux.PrettyComboBox = function(cfg){
	var thiz = this;
	if(CU.isEmpty(cfg)) cfg = {};
	this.fields = ["code", "name", "attributes"];
	
	var beforequerys = [];
	Ext.ux.PrettyComboBox.superclass.constructor.apply(this, arguments);
	
	this.setParams = function(ps) {
		thiz.store.baseParams[RS.PSK]=CU.toString(CU.isEmpty(ps)?[]:(CU.isArray(ps)?ps:[ps]));
	};
	
	if(CU.isEmpty(thiz.store)) {
		if(cfg.remote===true || cfg.dynamic===true) {
			var emde = CU.isEmpty(cfg.def);
			thiz.store=EF.getStore({url:cfg.url,fields:thiz.fields});
			thiz.store.baseParams = {};
			thiz.setParams(emde?cfg.ps:[cfg.def, cfg.codes, cfg.appattr, cfg.addempty]);
			if(cfg.dynamic===true) {
				thiz.on("beforequery",function(e) {
					if(beforequerys.length > 0) {for(var i=0; i<beforequerys.length; i++) {var r = beforequerys[i](e);if(r===false || e.cancel===true) return false;}}
					thiz.store.reload();
					return false;
				});
			}
		}else {
			if(typeof(DROP)=="undefined" || !CU.isObject(DROP) || !CU.isArray(DROP[cfg.def])) throw " is not found drop[\""+cfg.def+"\"]";
			var array = DROP[cfg.def];
			var items = [];
			for (var i=0; i<array.length; i++) {
				items[i] = [array[i].code, array[i].name, array[i].attributes];
			}
			thiz.store = new Ext.data.Store({proxy:new Ext.data.MemoryProxy(items),reader:new Ext.data.ArrayReader({}, [{name:"code"},{name:"name"},{name:"attributes"}])});
		}
	}
	this.addEvent = function(key, callback) {
		if(!CU.isFunction(callback)) return ;
		if(key == "beforequery") {
			beforequerys.push(callback);
		}
	};
};
Ext.extend(Ext.ux.PrettyComboBox, Ext.form.ComboBox, {
	editable: false,
	valueField: "code",
	displayField: "name",
	triggerAction: "all",
	store: null,
	onRender : function(ct, position){
		var disabled = this.disabled;
		this.disabled = false;
        Ext.ux.PrettyComboBox.superclass.onRender.call(this, ct, position);
        if(!CU.isEmpty(this.tooltip)) {var content = this.tooltip.content;if(!CU.isEmpty(content)) content=(content+"").replace(/\n/gi,"<br>");new Ext.ToolTip({target:this.id,trackMouse:false,draggable:true,title:this.tooltip.title,html:content});}
        if(this.name) this.el.dom.name = this.name;
        if(disabled===true) this.setDisabled(disabled);
    },
	setValue: function(value) {
		Ext.ux.PrettyComboBox.superclass.setValue.call(this, value);
		if(!CU.isEmpty(this.el)) {
			if(CU.isEmpty(value)) {
				if(this.el.dom.value==="&nbsp;" || this.el.dom.value==="无数据") {
					this.el.dom.value = "";
				}
			}else {
				var count = this.store.getCount();
				if(count > 0) {
					for(var i=0; i<count; i++) {
						var record = this.store.getAt(i);
						if(record.get("code") == value) {
							this.el.dom.value = record.get("name");
							break ;
						}
					}
				}else if(!CU.isEmpty(this.store.proxy) && !CU.isEmpty(this.store.proxy.data)) {
					for(var i=0; i<this.store.proxy.data.length; i++) {
						var record = this.store.proxy.data[i];
						if(record.length>1 && record[0]==value) {
							this.el.dom.value = record[1];
							break ;
						}
					}
				}
			}
		}
		return this;
	},
    setDisabled : function(disable) {
		this.disabled = disable===true;
		if(this.trigger) this.trigger.dom.disabled = this.disabled;
		if(CU.isEmpty(this.baseEditable)) this.baseEditable = this.editable;
		this.setEditable(this.disabled ? false : this.baseEditable);
		if(this.el) {
			if(CU.isEmpty(this.baseStyleColor)) {
				this.baseStyleColor = this.el.dom.style.color;
				if(CU.isEmpty(this.baseStyleColor)) this.baseStyleColor = BaseDefaultStyleColor;
			}
			this.el.dom.style.color = disable ? BaseDisabledStyleColor : this.baseStyleColor;
		}
	},
	beforeBlur : function() {
		if(this.editable===true) this.setValue(this.getRawValue());
    }
});


