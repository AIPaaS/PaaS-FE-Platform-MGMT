

var RemoteService = function(){
	var thiz = this;
	this.jx = null;
	
	/**
	 * 显示消息事件, 供外部重写
	 * @return false=终止缺省消息显示
	 */
	this.onShowMsg = function(msg) { return msg; };
	this.onHideMsg = function() {};
	this.showErrMsg = function(errcode, errmsg) {};
	
	/**
	 * 服务器访问失败事件
	 * @return false=终止缺省失败事件处理
	 */
	this.onFailure = function(response, options) { };
	
	/**
	 * 最近一次错误信息, 缓存一下
	 */
	this.error = {errorCode:null, errorMsg:null};
	
	
	
	/**
	 * 获取远程地址
	 * @param {} cfg
	 * 		addroot: 是否添加ContextPath, 缺省为添加
	 * 		url: 
	 * 		ps: 参数列表, 类型为[], 数组中每一项对应服务方法参数列表
	 * @return {}
	 */
	this.getRemoteUrl = function(cfg) {
		var url = [];
		if (cfg.addroot !== false) url.push(ContextPath);
		if (!CU.isEmpty(cfg.url)) url.push(cfg.url);
		if (CU.isObject(cfg.ps)) {
			url.push("?1=1");
			url.push(CU.parseParams(cfg.ps));
		}
		return url.join("");
	};
	
	/**
	 * 获取跟据模块ID打开模块URL
	 *  mid: 模块代码
	 */
	this.getModuleIdUrl = function(mid) {
		return RS.getRemoteUrl({url:"/sys/frame/cross/modu/openModuleById",ps:{moduleId:mid}});
	};
	
	
	
	/**
	 * 获取跟据模块代码打开模块URL
	 *  mcode: 模块代码
	 */
	this.getModuleCodeUrl = function(mcode) {
		return RS.getRemoteUrl({url:"/sys/frame/cross/modu/openModuleByCode",ps:{moduleCode:mcode}});
	};
	
	
	var AjaxBS = function() {
		this.ajax = function(url, ps, msg, cb, errcb) {
			CU.request({url:url, params:ps,
				success:function(xmlhttp) {
					thiz.onHideMsg();
					var rs = null;
					try {
						rs = CU.toObject(xmlhttp.responseText);
					} catch (e) {
						rs = {success:false, errorMsg:"CU.toObject error!"};
					}
					if(rs.success===true || rs.success==="true") {
						if(CU.isFunction(cb))cb(rs.data);
					}else {
						if(CU.isFunction(errcb)) {
							errcb(rs.errorCode, rs.errorMsg);
						}else {
							if(thiz.showErrMsg(rs.errorCode, rs.errorMsg)!==false) alert("访问远程服务器失败!");
						}
					}
				}, failure:function(xmlhttp) {
					thiz.onHideMsg();
					if(thiz.onFailure(xmlhttp) === false) return ;
					if(thiz.showErrMsg(xmlhttp)!==false) alert("访问远程服务器失败!");
				}
			});
		};
	};
	var AjaxExt = function() {
		this.ajax = function(url, ps, msg, cb, errcb) {
			if(msg!==false) Ext.MessageBox.wait(CU.isEmpty(msg)||msg===true?"正在访问服务器, 请稍候...":msg, 'Please Wait...');
			Ext.Ajax.request({url:url, method:"POST", params:ps,
				success : function(response, options) {
					if(msg!==false) Ext.MessageBox.hide();
					thiz.onHideMsg();
					var rs = null;
					try {
						rs = CU.toObject(response.responseText);
					} catch (e) {
						rs = {success:false, errorMsg:"CU.toObject error!"};
					}
					if(rs.success===true || rs.success==="true") {
						if(CU.isFunction(cb))cb(rs.data);
					}else {
						if(CU.isFunction(errcb)) {
							errcb(rs.errorCode, rs.errorMsg);
						}else {
							if(thiz.showErrMsg(rs.errorCode, rs.errorMsg)!==false) EU.showMsg({msg:"访问远程服务器失败!"});
						}
					}
				},
				failure : function(response, options) {
					if(msg!==false) Ext.MessageBox.hide();
					thiz.onHideMsg();
					if(thiz.onFailure(response, options) === false) return ;
					if(thiz.showErrMsg(response, options)!==false) EU.showMsg({msg:"访问远程服务器失败!"});
				}
			});
		};
	};
	var AjaxJQ = function() {
		this.ajax = function(url, ps, msg, cb, errcb) {
			$.ajax({url:url, type:"post", dataType:"json", data:ps,
				success:function(rs) {
					thiz.onHideMsg();
					if(rs.success===true || rs.success==="true") {
						if(CU.isFunction(cb))cb(rs.data);
					}else {
						if(CU.isFunction(errcb)) {
							errcb(rs.errorCode, rs.errorMsg);
						}else {
							if(thiz.showErrMsg(rs.errorCode, rs.errorMsg)!==false) alert("访问远程服务器失败!");
						}
					}
				}, error:function(xmlhttp) {
					thiz.onHideMsg();
					if(thiz.onFailure(xmlhttp) === false) return ;
					
					//if(thiz.showErrMsg(xmlhttp)!==false) alert("访问远程服务器失败!");
				}
			});
		};
	};
	
	if(typeof(Ext)!="undefined") {
		this.jx = new AjaxExt();
	}else if(typeof($)!="undefined") {
		this.jx = new AjaxJQ();
	}else {
		this.jx = new AjaxBS();
	}
	
	
	/**
	 * ajax调用
	 * @param cfg: 配置对象, 其属性值如下
	 * 		url: 地址
	 * 		ps: 参数对象{}
	 * 		msg: 显示消息, 可以是string类型, 为string类型表示消息内容, 可以为boolean, 表示是否显示消息信息
	 * 		cb: 回调方法
	 * 		errcb: 错误回调方法	errcb(errorCode, errorMsg);
	 */
	this.ajax = function(cfg) {
		var url = ContextPath+cfg.url;
		thiz.error.errorCode = null;
		thiz.error.errorMsg = null;
		var msg = thiz.onShowMsg(cfg.msg);
		thiz.jx.ajax(url, cfg.ps, msg, cfg.cb, cfg.errcb);
	};
};
var RS = new RemoteService();