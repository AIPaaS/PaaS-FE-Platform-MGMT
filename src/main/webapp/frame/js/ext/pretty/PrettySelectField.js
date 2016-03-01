
/**
 * extends: Ext.form.TriggerField
 * 如果是打开系统通用选择窗口则必需配制openconfig参数
 * 如果是自定义则指定triggerClick事件
 * @param {} config
 * 		openconfig:	
 * 			modulecode: 
 * 			params: 携带参数
 * 			width: 窗口宽度   缺省为800
 * 			height: 窗口高度   缺省为680
 * 			resizable: 是否可变大小   缺省为false
 * 			modal: 是否为模态窗口   缺省为true
 *		triggerClick: 点击事件可以由外部指定 triggerClick(this, event);
 *		dblclear: 双击时清空当前文本框, 缺省为true
 *		inputable: 是否可输入, true=可以  false=不可以  缺省为不可以
 *		beforeopen: 打开选择窗口之前事件, 返回false将停止打开选择窗口  beforeopen(openconfig, this);
 *		beforeselect: 确定选择之前事件   返回false不赋值   beforeselect(value, openconfig, this)
 *		select: 确定选择之后事件   select(value, openconfig, this)
 */
Ext.ux.PrettySelectField = function(config) {
	var thiz = this;
	if(CU.isEmpty(config.openconfig))config.openconfig={};
	Ext.ux.PrettySelectField.superclass.constructor.apply(this, arguments);
	thiz.openconfig.modal = thiz.openconfig.modal!==false;
	thiz.openconfig.callback = function(result) {
		if(result==undefined || result==null) return ;
		if(CU.isFunction(thiz.beforeselect)) if(thiz.beforeselect(result, thiz.openconfig, thiz)===false) return;
		thiz.setValue(result);
		if(CU.isFunction(thiz.select)) thiz.select(result, thiz.openconfig, thiz);
	};
	/**
	 * 打开选择窗口
	 */
	this.openSelectWin = function() {
		if(CU.isFunction(thiz.beforeopen)) if(thiz.beforeopen(thiz.openconfig, thiz)===false) return;
		if(CU.isEmpty(thiz.openconfig.params))thiz.openconfig.params={};
		thiz.openconfig.params.BaseFlag_SelectValue = thiz.getValue();
		CU.openModule(thiz.openconfig);
	};
};
Ext.extend(Ext.ux.PrettySelectField, Ext.form.TriggerField, {
	readOnly: true,
	triggerClass: 'x-form-search-trigger',
	inputable: false,
	dblclear: true,
	displayValue:"",
	hiddenValue:"",
	onRender: function(ct, position){
		var thiz = this;
		var disabled = this.disabled;
		this.disabled = false;
        Ext.ux.PrettySelectField.superclass.onRender.call(this, ct, position);
        if(!CU.isEmpty(this.tooltip)) {var content = this.tooltip.content;if(!CU.isEmpty(content)) content=(content+"").replace(/\n/gi,"<br>");new Ext.ToolTip({target:this.id,trackMouse:false,draggable:true,title:this.tooltip.title,html:content});}
        if(this.hiddenName){
            this.hiddenField = this.el.insertSibling({tag:'input', type:'hidden', name: this.hiddenName,
                    id: (this.hiddenId||this.hiddenName)}, 'before', true);
        }
        if(disabled===true) this.setDisabled(disabled);
        this.el.on("dblclick", function() {
        	if(thiz.inputable===true && thiz.disabled!==true) {thiz.setReadOnly(false);thiz.focus();}
        	if(thiz.dblclear!==false && thiz.disabled!==true && thiz.inputable!==true) thiz.setValue({codeid:"",codename:""});
        	if(thiz.disabled!==true && CU.isFunction(thiz.dblclick)) thiz.dblclick(thiz);
        });
        this.el.on("blur", function() {
        	if(thiz.readOnly===false&&thiz.inputable) {
        		thiz.setValue({codeid:thiz.el.dom.value,codename:thiz.el.dom.value});
        		thiz.setReadOnly(true);
        	}
        });
    },
    onResize: function(adjWidth, adjHeight, rawWidth, rawHeight) {
    	Ext.ux.PrettySelectField.superclass.onResize.call(this, adjWidth, adjHeight, rawWidth, rawHeight);
    	if(!CU.isEmpty(this.unittext)&&this.initUnitSpace!==true) {this.initUnitSpace=true;EU.createUnitSpace(this, this.container);}
    },
    updateEditState: function(){
        if(this.rendered){
            if (this.readOnly) {
                this.el.dom.readOnly = true;
                this.el.addClass('x-trigger-noedit');
                this.mun(this.el, 'click', this.onTriggerClick, this);
            } else {
                if (!this.editable) {
                    this.el.dom.readOnly = true;
                    this.el.addClass('x-trigger-noedit');
                    this.mon(this.el, 'click', this.onTriggerClick, this);
                } else {
                    this.el.dom.readOnly = false;
                    this.el.removeClass('x-trigger-noedit');
                    this.mun(this.el, 'click', this.onTriggerClick, this);
                }
                this.trigger.setDisplayed(!this.hideTrigger);
            }
            this.onResize(this.width || this.wrap.getWidth());
        }
    },
    setValue: function(v) {
    	this.displayValue = this.hiddenValue = "";
    	if(!CU.isEmpty(v)) {
    		if(CU.isArray(v)) {
    			for(var i=0; i<v.length; i++) {
    				if(i > 0) {
	    				this.displayValue += ",";
	    				this.hiddenValue += ",";
	    			}
	    			if(CU.isObject(v[i])) {
	    				this.displayValue += v[i].codename;
	    				this.hiddenValue += v[i].codeid;
	    			}else {
	    				this.displayValue += v[i];
	    				this.hiddenValue += v[i];
	    			}
    			}
    		}else if(CU.isObject(v)) {
    			this.displayValue = v.codename;
    			this.hiddenValue = v.codeid;
    		}else {
    			this.displayValue = this.hiddenValue = v;
    		}
    	}
    	if(this.hiddenField) this.hiddenField.value = this.hiddenValue;
    	Ext.ux.PrettySelectField.superclass.setValue.call(this, this.displayValue);
    	return this;
	},
	setRawValue : function(v) {
		return this.rendered ? (this.displayValue=this.el.dom.value=(CU.isEmpty(v)?"":v)):"";
	},
	getValue : function() {
        return this.hiddenValue===undefined||this.hiddenValue===null ? "" : this.hiddenValue;
    },
    getRawValue : function() {
    	return this.displayValue===undefined||this.displayValue===null ? "" : this.displayValue;
    },
    onTriggerClick: function(e){
    	if(this.disabled) return;
    	if(CU.isFunction(this.triggerClick)) {
    		this.triggerClick(this, e);
    	}else {
    		this.openSelectWin();
    	}
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
	}
});


