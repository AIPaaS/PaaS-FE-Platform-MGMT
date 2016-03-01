

/**
 * extends: Ext.FormPanel
 * @param {} config: 配制参数, 扩展配制项如下:
 */
Ext.ux.PrettyFormPanel = function(config){
	var thisobj = this;
	if(CU.isEmpty(config)) config = {};
	Ext.ux.PrettyFormPanel.superclass.constructor.apply(this, arguments);
	
	/**
	 * Ext表单提交
	 * @param url: 所访问的url
	 * @param ps: 符带参数
	 * @param cb: 访问服务器后返回后所执行的方法callback(result)
	 * @param errcb: 服务器出现异常时所调用的方法errorcallback(response, options), 如果找不到此方法则打印:'访问远程服务器失败!'
	 * @param msg: 访问服务器时所显示的加载框, msg=false表示不显示, msg=true表示显示默认框, msg=string表示显示框中的提示信息为此string, 缺省为true
	 */
	this.submit = function(config) {
		if(!thisobj.isValid()) return ; 
		if(CU.isEmpty(config)) config = {};
		var ps = CU.isEmpty(config.ps) ? {} : config.ps;
		var msg = true;
		var waitMsg;
		if(!CU.isEmpty(config.msg)) msg = config.msg;
		if(typeof(msg) == "boolean") {
			if(msg) waitMsg = "正在访问服务器, 请稍候...";
		}else {
			waitMsg = msg;
		}
		var form = thisobj.getForm();
		form.url = CU.getServerLink({url:config.url});
		form.submit({
			waitMsg: waitMsg,
			params: ps,
			success: function(form, action) {
				if(typeof(config.cb)=="function") {
					var result = action.result!=undefined&&action.result!=null ? action.result.data : undefined;
					config.cb(result);
				}
			},
			failure: function(form, action) {
				if(CU.isFunction(config.errcb)) {
					BASEFLAG_ERRORMSG = new Error(action.result.message,action.result.stackTrace);
					config.errcb(BASEFLAG_ERRORMSG, action.result);
				}else {
					EU.showMsg({msg:'访问远程服务器失败!'});
				}
			}
		});
	};
	
	/**
	 * Form加载数据
	 * @param form: FormPanel
	 * @param url: 所访问的url
	 * @param ps: 符带参数
	 * @param cb: 访问服务器后返回后所执行的方法callback(result)
	 * @param errcb: 服务器出现异常时所调用的方法errorcallback(response, options), 如果找不到此方法则打印:'访问远程服务器失败!'
	 * @param msg: 访问服务器时所显示的加载框, msg=false表示不显示, msg=true表示显示默认框, msg=string表示显示框中的提示信息为此string, 缺省为true
	 */
	this.load = function(config) {
		if(CU.isEmpty(config)) config = {};
		var ps = CU.isEmpty(config.ps) ? {} : config.ps;
		var msg = true;
		var waitMsg;
		if(!CU.isEmpty(config.msg)) msg = config.msg;
		if(typeof(msg) == "boolean") {
			if(msg) waitMsg = "正在访问服务器, 请稍候...";
		}else {
			waitMsg = msg;
		}
		var form = thisobj.getForm();
		form.url = CU.getServerLink({url:config.url});
		form.load({
			waitMsg: waitMsg,
			params: ps,
			success: function(form, action) {
				if(typeof(config.cb)=="function") {
					var result = action.result!=undefined&&action.result!=null ? action.result.data : undefined;
					config.cb(result);
				}
			},
			failure: function(form, action) {
				BASEFLAG_ERRORMSG = action.result!=undefined&&action.result!=null ? action.result.message : "";
				if(typeof(config.errcb)=="function") {
					config.errcb(form, action);
				}else {
					EU.showMsg({msg:'访问远程服务器失败!'});
				}
			}
		});
	}
	/**
	 * 表单元素批量赋值
	 * @param values: Array/Object
	 */
	this.setValues = function(values) {
		return thisobj.getForm().setValues(values);
	}
	/**
	 * @param asstr: boolean  false=返回键:值对象   true=返回拼在URL中的string   缺省为false
	 */
	this.getValues = function(asstr) {
		return thisobj.getForm().getValues(asstr);
	}
	this.isValid = function() {
		return thisobj.getForm().isValid();
	}
	/**
	 * 清除表单中全部由校验错误的信息
	 */
	this.clearInvalid = function() {
		return thisobj.getForm().clearInvalid();
	}
	/**
	 * 重置表单
	 */
	this.reset = function() {
		return thisobj.getForm().reset();
	}
	/**
	 * 获取form中所有组件
	 */
	this.getComponents = function() {
		var arr = [];
		EU.getComponents(arr, thisobj);
		return arr;
	}
	/**
	 * 设置表单是否可编辑
	 */
	this.setEditable = function(editable) {
		var cs = thisobj.getComponents();
		if(CU.isEmpty(cs)) return ;
		EU.setAllDisabled(cs, !editable);
	}
	/**
	 * 设置表单界面
	 * 		type: 0||query
	 * 			  1||add
	 * 			  2||update
	 * 			  3||submit
	 */
	this.setFace = function(type) {
		switch(type) {
			case 0:
			case "query": thisobj.setQueryFace(); break;
			case 1:
			case "add": thisobj.setAddFace(); break;
			case 2:
			case "update": thisobj.setUpdateFace(); break;
			case 3:
			case "submit": thisobj.setSubmitFace(); break;
		}
	}
	/**
	 * 把form设置成查询界面
	 */
	this.setQueryFace = function() {
		this.setQueryBtnVisible();
		this.setEditable(false);
	}
	/**
	 * 把form设置成新增界面
	 */
	this.setAddFace = function() {
		this.setAddBtnVisible();
		this.setEditable(true);
		this.reset();
	}
	/**
	 * 把form设置成修改界面
	 */
	this.setUpdateFace = function() {
		this.setUpdateBtnVisible();
		this.setEditable(true);
	}
	this.setSubmitFace = function() {
		this.setSubmitBtnVisible();
		this.setEditable(false);
	};
	/**
	 * type: 0||query
	 * 		 1||add
	 * 		 2||update
	 * 		 3||submit
	 */
	this.setBtnVisible = function(type) {
		switch(type) {
			case 0:
			case "query": thisobj.setQueryBtnVisible(); break;
			case 1:
			case "add": thisobj.setAddBtnVisible(); break;
			case 2:
			case "update": thisobj.setUpdateBtnVisible(); break;
		}
	}
	this.setQueryBtnVisible = function() {
		var tbar = thisobj.getTopToolbar();
		if(!CU.isEmpty(tbar)) {
			for(var i=0; i<tbar.items.items.length; i++) {
				var btn = tbar.items.items[i];
				if(!CU.isFunction(btn.setVisible)) continue ;
				if(btn.name=="btn_op_add") { btn.setVisible(true); continue ;}
				if(btn.name=="btn_op_save") { btn.setVisible(false); continue ;}
				if(btn.name=="btn_op_update") { btn.setVisible(true); continue ;}
				if(btn.name=="btn_op_delete") { btn.setVisible(true); continue ;}
				if(btn.name=="btn_op_submit") { btn.setVisible(true); continue ;}
				if(btn.name=="btn_op_closeorder") { btn.setVisible(true); continue ;}
			}
		}
	}
	this.setSubmitBtnVisible = function() {
		var tbar = thisobj.getTopToolbar();
		if(!CU.isEmpty(tbar)) {
			for(var i=0; i<tbar.items.items.length; i++) {
				var btn = tbar.items.items[i];
				if(!CU.isFunction(btn.setVisible)) continue ;
				if(btn.name=="btn_op_add") { btn.setVisible(false); continue ;}
				if(btn.name=="btn_op_save") { btn.setVisible(false); continue ;}
				if(btn.name=="btn_op_update") { btn.setVisible(false); continue ;}
				if(btn.name=="btn_op_delete") { btn.setVisible(false); continue ;}
				if(btn.name=="btn_op_submit") { btn.setVisible(false); continue ;}
				if(btn.name=="btn_op_closeorder") { btn.setVisible(true); continue ;}
			}
		}
	}
	this.setAddBtnVisible = function() {
		var tbar = thisobj.getTopToolbar();
		if(!CU.isEmpty(tbar)) {
			for(var i=0; i<tbar.items.items.length; i++) {
				var btn = tbar.items.items[i];
				if(!CU.isFunction(btn.setVisible)) continue ;
				if(btn.name=="btn_op_add") { btn.setVisible(false); continue ;}
				if(btn.name=="btn_op_save") { btn.setVisible(true); continue ;}
				if(btn.name=="btn_op_update") { btn.setVisible(false); continue ;}
				if(btn.name=="btn_op_delete") { btn.setVisible(false); continue ;}
				if(btn.name=="btn_op_submit") { btn.setVisible(false); continue ;}
				if(btn.name=="btn_op_closeorder") { btn.setVisible(true); continue ;}
			}
		}
	}
	this.setUpdateBtnVisible = function() {
		var tbar = thisobj.getTopToolbar();
		if(!CU.isEmpty(tbar)) {
			for(var i=0; i<tbar.items.items.length; i++) {
				var btn = tbar.items.items[i];
				if(!CU.isFunction(btn.setVisible)) continue ;
				if(btn.name=="btn_op_add") { btn.setVisible(false); continue ;}
				if(btn.name=="btn_op_save") { btn.setVisible(true); continue ;}
				if(btn.name=="btn_op_update") { btn.setVisible(false); continue ;}
				if(btn.name=="btn_op_delete") { btn.setVisible(false); continue ;}
				if(btn.name=="btn_op_submit") { btn.setVisible(false); continue ;}
				if(btn.name=="btn_op_closeorder") { btn.setVisible(true); continue ;}
			}
		}
	}
};
Ext.extend(Ext.ux.PrettyFormPanel, Ext.FormPanel, {
	method: "POST",
	frame: true,
	labelWidth: 68,
	labelAlign: "right",
	buttonAlign: "center"
});


