/**
 * extends: Ext.form.TextField
 * filterType: <=0:一般文本	1=数字	2=字母	3=数字+字母
 */
Ext.ux.PrettyTextField = Ext.extend(Ext.form.TextField, {
	onRender : function(ct, position){
		var thisobj = this;
		var disabled = this.disabled;
		this.disabled = false;
        Ext.ux.PrettyTextField.superclass.onRender.call(this, ct, position);
        if(!CU.isEmpty(this.tooltip)) {var content = this.tooltip.content;if(!CU.isEmpty(content)) content=(content+"").replace(/\n/gi,"<br>");new Ext.ToolTip({target:this.id,trackMouse:false,draggable:true,title:this.tooltip.title,html:content});}
        if(disabled===true) this.setDisabled(disabled);
       	if(CU.isPrimitive(this.filterType) && this.filterType>0) {
       		this.el.on("keypress",function() {
       			var code=event.keyCode;
       			if(thisobj.filterType===1) {
       				if(code<48||code>57){event.returnValue=false;return;}
       			}else if(thisobj.filterType===2) {
       				if(code<65||(code>90&&code<97)||code>122){event.returnValue=false;return;}
       			}else if(thisobj.filterType===3) {
       				if(code<48||(code>57&&code<65)||(code>90&&code<97)||code>122){event.returnValue=false;return;}
       			}
       		});
       	}
    },
    onResize: function(adjWidth, adjHeight, rawWidth, rawHeight) {
    	Ext.ux.PrettyTextField.superclass.onResize.call(this, adjWidth, adjHeight, rawWidth, rawHeight);
    	if(!CU.isEmpty(this.unittext)&&this.initUnitSpace!==true) {this.initUnitSpace=true;EU.createUnitSpace(this, this.container);}
    },
	setDisabled : function(disable) {
		if(this.el) {
			this.el.dom.readOnly = disable;
			if(CU.isEmpty(this.baseStyleColor)) {
				this.baseStyleColor = this.el.dom.style.color;
				if(CU.isEmpty(this.baseStyleColor)) this.baseStyleColor = BaseDefaultStyleColor;
			}
			this.el.dom.style.color = disable ? BaseDisabledStyleColor : this.baseStyleColor;
		} else {
			this.readOnly = disable;
		}
	}
});
/**
 * extends: Ext.form.TextField
 */
Ext.ux.PrettyTextArea = Ext.extend(Ext.form.TextArea, {
	onRender : function(ct, position){
		var disabled = this.disabled;
		this.disabled = false;
        Ext.ux.PrettyTextArea.superclass.onRender.call(this, ct, position);
        if(!CU.isEmpty(this.tooltip)) {var content = this.tooltip.content;if(!CU.isEmpty(content)) content=(content+"").replace(/\n/gi,"<br>");new Ext.ToolTip({target:this.id,trackMouse:false,draggable:true,title:this.tooltip.title,html:content});}
        if(disabled===true) this.setDisabled(disabled);
        if(this.tabbed!==false)this.el.dom.onkeydown=function(){var c=event.keyCode;if(c==9){document.selection.createRange().text="\t";return false;}}
        if(CU.isEmpty(this.wrap)) {
        	if(CU.isEmpty(this.height)||this.height>=400)this.el.dom.wrap="off";
        }else {
        	this.el.dom.wrap = this.wrap;
        }
    },
	setDisabled : function(disable) {
		if(this.el) {
			this.el.dom.readOnly = disable;
			if(CU.isEmpty(this.baseStyleColor)) {
				this.baseStyleColor = this.el.dom.style.color;
				if(CU.isEmpty(this.baseStyleColor)) this.baseStyleColor = BaseDefaultStyleColor;
			}
			this.el.dom.style.color = disable ? BaseDisabledStyleColor : this.baseStyleColor;
		} else {
			this.readOnly = disable;
		}
	}
});
/**
 * extends: Ext.form.NumberField
 */
Ext.ux.PrettyNumberField = Ext.extend(Ext.form.NumberField, {
	onRender : function(ct, position){
		var disabled = this.disabled;
		this.disabled = false;
        Ext.ux.PrettyNumberField.superclass.onRender.call(this, ct, position);
        if(!CU.isEmpty(this.tooltip)) {var content = this.tooltip.content;if(!CU.isEmpty(content)) content=(content+"").replace(/\n/gi,"<br>");new Ext.ToolTip({target:this.id,trackMouse:false,draggable:true,title:this.tooltip.title,html:content});}
        if(disabled===true) this.setDisabled(disabled);
        this.el.dom.maxLength = CU.isEmpty(this.domMaxLength) ? 10 : this.domMaxLength;
    },
    onResize: function(adjWidth, adjHeight, rawWidth, rawHeight) {
    	Ext.ux.PrettyNumberField.superclass.onResize.call(this, adjWidth, adjHeight, rawWidth, rawHeight);
    	if(!CU.isEmpty(this.unittext)&&this.initUnitSpace!==true) {this.initUnitSpace=true;EU.createUnitSpace(this, this.container);}
    },
	setDisabled : function(disable) {
		if(this.el) {
			this.el.dom.readOnly = disable;
			if(CU.isEmpty(this.baseStyleColor)) {
				this.baseStyleColor = this.el.dom.style.color;
				if(CU.isEmpty(this.baseStyleColor)) this.baseStyleColor = BaseDefaultStyleColor;
			}
			this.el.dom.style.color = disable ? BaseDisabledStyleColor : this.baseStyleColor;
		} else {
			this.readOnly = disable;
		}
	}
});
/**
 * extends: Ext.form.DateField
 */
Ext.ux.PrettyDateField = Ext.extend(Ext.form.DateField, {
	readOnly: true,
	editable: false,
	format: "Y-m-d",
	dblclear: true,
	onRender : function(ct, position){
		var thiz = this;
		var disabled = this.disabled;
		this.disabled = false;
        Ext.ux.PrettyDateField.superclass.onRender.call(this, ct, position);
        if(!CU.isEmpty(this.tooltip)) {var content = this.tooltip.content;if(!CU.isEmpty(content)) content=(content+"").replace(/\n/gi,"<br>");new Ext.ToolTip({target:this.id,trackMouse:false,draggable:true,title:this.tooltip.title,html:content});}
        if(disabled===true) this.setDisabled(disabled);
        this.el.on("dblclick", function() {
        	if(thiz.dblclear!==false && thiz.disabled!==true) thiz.setValue("");
        });
    },
	setDisabled : function(disable) {
		this.disabled = disable===true;
		if(this.trigger) this.trigger.dom.disabled = this.disabled;
		if(this.el) {
			if(!this.readOnly) this.el.dom.readOnly = disable;
			if(CU.isEmpty(this.baseStyleColor)) {
				this.baseStyleColor = this.el.dom.style.color;
				if(CU.isEmpty(this.baseStyleColor)) this.baseStyleColor = BaseDefaultStyleColor;
			}
			this.el.dom.style.color = disable ? BaseDisabledStyleColor : this.baseStyleColor;
		}
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
    }
});
