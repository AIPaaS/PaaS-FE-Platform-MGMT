

/**
 * 处理项目当中基础方法
 */
function ProjectUtils() {

	var thiz = this;
	
	/**
	 * 在tab选项卡中打开模块
	 * @param config: 配制对象, 其内部所含属性如下:
	 * 	mc: 指定打开的模块代码
	 * 	id: tab的id
	 *  title: tab标题
	 *  tabTip: tab小提示  缺省为title
	 *  closable: 是否带关闭按钮  缺省为true
	 *	ps: 携带参数
	 * return : tab
	 */
	this.openTabModule = function(config) {
		return window.top.openTabModule(config);
	};
	
	
	/**
	 * 以弹出窗口方式打开模块
	 * @param {} config
	 * 	mid: 弹出模块ID, 缺省为当前moduleid	(系统模块ID)
	 *  mc: 弹出窗口代码 (平台代码)
	 *  ps: 携带参数
	 *  recordid: 弹出窗口所对应的记录ID
	 *  recordids: 弹出窗口所对应的记录ID数组
	 *  width: 窗口宽度   缺省为800
	 *  height: 窗口高度   缺省为680
	 *  resizable: 是否可变大小   缺省为false
	 *  callback: 窗口关闭时回调方法(只对模态窗口起作用)
	 *  modal: 是否为模态窗口   缺省为true
	 */
	this.openModule = function(config) {
		return CU.openModule(config);
	};
	
	/**
	 * 页面跳转
	 * @param {} config
	 * 	modulecode: 弹出窗口代码 (平台代码)
	 * 	params: 携带参数
	 * 	requestMethod: 跳转方式: post||get  缺省为post
	 */
	this.forwardModule = function(config) {
		CU.forwardModule(config);
	};
	
	
	this.sortNodes = function(tableName, primaryColumn, orderColumn, parentNode, condition) {
		var cs = parentNode.childNodes;
		if(CU.isEmpty(cs)) return ;
		var ids = [];
		for(var i=0; i<cs.length; i++) ids.push(cs[i].id);
		var params = [ids,tableName,primaryColumn,orderColumn];
		if(!CU.isEmpty(condition)) params.push(condition);
		EU.RS({service:"Common",method:"sortNodes",params:params});
	};
	
	/**
	 * @param {} config
	 * 		tree: 排序树
	 * 		sorts: Object\Array
	 * 			table: 表名
	 * 			primary: 主键名
	 * 			order: 排序字段
	 * 			condition: 符带条件
	 * 			param1: 指定排序字段, 为空表示任意字段都可以排序, String\Array
	 * 		change: Object
	 * 			table: 子节点所属表名
	 * 			primary: 主键名
	 * 			parent: 上级字段名
	 * 			condition: 符带条件
	 * 			parentparam1: 上级param1
	 * 			childparam1: 子节点param1
	 */	
	this.enableDDSortNodes = function(config) {
		config.tree.enableDD = true;
		thiz.BasePropery_treesortable = false;
		config.tree.on("beforenodedrop", function(e) {
			if(e.dropNode.id==e.target.id || (e.point=="append"&&e.target.id!=e.dropNode.parentNode.id&&!CU.isObject(config.change))) {
				e.cancel = true;
				thiz.BasePropery_treesortable = false;
				return false;
			}
			var dropedParentNode = e.point=="append"?e.target:e.target.parentNode;
			if(dropedParentNode.id!=e.dropNode.parentNode.id) {
				if(CU.isObject(config.change) && dropedParentNode.attributes.param1==config.change.parentparam1 && e.dropNode.attributes.param1==config.change.childparam1) {
					var params = [config.change.table,config.change.primary,config.change.parent,e.dropNode.id,dropedParentNode.id];
					if(!CU.isEmpty(config.change.condition)) params.push(config.change.condition);
					EU.RS({service:"Common",method:"changeParentId",params:params});
				}else {
					e.cancel = true;
					thiz.BasePropery_treesortable = false;
					return false;
				}
			}
			thiz.BasePropery_treesortable = true;
		});
		config.tree.on('nodedrop', function(e) {
			if(thiz.BasePropery_treesortable) {
				var sorts = config.sorts;
				if(CU.isEmpty(sorts)) return ;
				if(CU.isArray(sorts)) {
					var param1 = e.dropNode.attributes.param1;
					if(CU.isEmpty(param1)) return ;
					for(var i=0; i<sorts.length; i++) {
						if(sorts[i].param1 == param1) {
							sorts = sorts[i];
							break;
						}
					}
				}
				if(!CU.isObject(sorts)) return ;
				thiz.sortNodes(sorts.table, sorts.primary, sorts.order, e.dropNode.parentNode, sorts.condition);
			}
		});
	};
	
	/**
	 * 下载
	 * @param {} cfg
	 * 		service:
	 * 		method:
	 * 		params: 对应服务方法参数项[]
	 */
	this.download = function(cfg, timeout){CU.download(cfg, timeout);};
	this.preview = function(cfg) {CU.preview(cfg);};
	
	
	this.getSuperWin = function() {
		var curr = window;
		var parent = null;
		while(!CU.isEmpty(parent=curr.parent)&&curr!=parent&&parent.BASEFLAG_SUPER!==true)curr=parent;
		return parent.BASEFLAG_SUPER===true ? parent : null;
	};
	
	/**
	 * 格式化分值, 如果分值小数位小于指定位数则不变，否则四舍五入
	 */
	this.formatScore = function(v,s) {
		v = CU.isEmpty(v) ? "" : v+"";
		if(CU.isEmpty(s))s=2;
		if(v.indexOf(".")>0&&v.substring(v.indexOf(".")+1).length>s)v=parseFloat(v).toFixed(s);
		return v;
	};
	
	this.getCodeRegex = function() {
		return /^(([a-zA-Z])([a-zA-Z0-9]|[_]){0,49})$/;
	};
	this.getCodeRegexText = function() {
		return "1-50位字母、数字或下划线组合,并且必须以字母开头!";
	};
	this.validParamMapping = function(classcode1,classcode2) {
		if((classcode1=="31"&&classcode2!="31") || (classcode1!="31"&&classcode2=="31")) {
			EU.showMsg({msg:"基础类型不能与对象<键,值>类型关联!"});
			return false;
		}
		return true;
	};
	
	/**
	 * @param {} cfg: submitcfg
	 */
	this.upload = function(cfg) {
		if(CU.isEmpty(thiz.UploadWin)) {
			var TF_file = EF.getTextField({fieldLabel:"文件",name:"formFile",anchor:"98%",inputType:"file"});
			var P_form = EF.getFormPanel({bodyStyle:"padding-top:12px;",labelWidth:50,buttonAlign:"right",fileUpload:true,frame:false,items:[TF_file],buttons:[{text:"上传",handler:function() {
				var file = TF_file.getValue();
				if(CU.isEmpty(file)) {EU.showMsg({msg:"请选择上传文件!"}); return ;}
				if(CU.isEmpty(P_form.UploadCfg.errorcallback)) {
					P_form.UploadCfg.errorcallback = function(errinfo) {
						EU.showMsg({msg:"<font color='red'>上传失败："+errinfo.message.replace(/\n/g,"<br>")+"</font>"});
					};
				}
				P_form.submit(P_form.UploadCfg);
			}},{text:"返回",handler:function() {thiz.UploadWin.hide();}}]});
			thiz.UploadWin = EF.getWindow({title:"上传",border:false,width:450,height:120,items:[P_form]});
			thiz.UploadWin.UploadForm = P_form;
		}
		thiz.UploadWin.UploadForm.UploadCfg = cfg;
		thiz.UploadWin.show(null, function() {
			thiz.UploadWin.UploadForm.setHeight(thiz.UploadWin.getInnerHeight());
		});
	};
	
	/**
	 * 判断公司ID是否是本部
	 */
	this.isCadre = function(companyid) {
		return "1" === companyid.substring(0,1);
	};
	/**
	 * 根据本部ID来获取公司ID
	 */
	this.getCompanyidByCadreid = function(cadreid) {
		return "0"+cadreid.substring(1);
	};
	/**
	 * 根据公司ID来获取本部ID
	 */
	this.getCadreidByCompanyid = function(companyid) {
		return "1"+companyid.substring(1);
	};
	/**
	 * 获取主数据状态图标
	 * @param {} states
	 */
	this.getMasterStatesIcon = function(states) {
		if(states == "00") {
			return ContextPath+"/framework/images/icons/16x16/synchronizer.gif";
		}else if(states == "02") {
			return ContextPath+"/framework/images/icons/16x16/passing.gif";
		}else if(states == "03") {
			return ContextPath+"/framework/images/icons/16x16/unpassing.gif";
		}else if(states == "04") {
			return ContextPath+"/framework/images/icons/16x16/issued.gif";
		}else if(states == "05") {
			return ContextPath+"/framework/images/icons/16x16/locked.gif";
		}else if(states == "99") {
			return ContextPath+"/framework/images/icons/16x16/close.gif";
		}else {
			return "";
		}
	};
	
	this.showWorkflowChart = function(wfinstanceid,callback,params) {
		if(CU.isEmpty(params))params={};
		params.InstanceId = wfinstanceid;
		params.ProcessType = 1;
		PU.openModule({modulecode:"030101POP03",params:params,width:1000,height:680,modal:true,callback:callback});
	};
	this.showWorkflowForm = function(instanceid, callback) {
		EU.RS({service:"WorkFlowAdapter",method:"getFormBean",params:[instanceid],callback:function(r) {
			if(CU.isEmpty(r)) {EU.showMsg({msg:"当前流程还未关联模块表单!"});return;}
			var params = r.moduleparams;
			if(!CU.isEmpty(params))params=eval("("+params+")");
			PU.openModule({modulecode:r.modulecode,width:r.modulewidth,height:r.moduleheight,params:params,modal:true,callback:callback});
		}});
	};
	/**
	 * @param {} cfg - workflow\receipt\execute\details : {text:"",iconCls:"",before:function(btn),after:function(btn)}
	 */
	this.getWFButtons = function(instanceid, cfg, showmsg, callback) {
		if(CU.isEmpty(cfg))cfg={};
		var cfg_workflow = CU.isEmpty(cfg.workflow)?{}:cfg.workflow;
		var cfg_receipt = CU.isEmpty(cfg.receipt)?{}:cfg.receipt;
		var cfg_execute = CU.isEmpty(cfg.execute)?{}:cfg.execute;
		var cfg_details = CU.isEmpty(cfg.details)?{}:cfg.details;
		var btns = [];
		thiz.validWFButtonCfg(cfg_workflow,"btn_wf_workflow","流程","btn_workflow",function(btn) {
			if(CU.isFunction(btn.before)){var r=btn.before(btn);if(r===false)return;}
			thiz.showWorkflowChart(instanceid, function(){if(CU.isFunction(btn.after))btn.after(btn);}, btn.openparams);
		});
		thiz.validWFButtonCfg(cfg_receipt,"btn_wf_receipt","签收","btn_receipt",function(btn) {
			EU.RS({service:"WorkFlowAdapter",method:"getCurrentToken",params:[instanceid],callback:function(token) {
				if(CU.isEmpty(token)){EU.showMsg({msg:"<font color='red'>流程结束</font>"});return;}
				if(CU.isFunction(btn.before)){var r=btn.before(btn,token);if(r===false)return;}
				EU.RS({service:"WorkFlowAdapter",method:"receiving",params:[instanceid],callback:function(r) {
					if(!CU.isEmpty(r)){EU.showMsg({msg:"<font color='red'>"+r+"</font>"}); return ;}
					thiz.setWFButtonsStatus(instanceid,btns,function(){
						if(showmsg!==false)EU.showMsg({msg:"签收成功!"});
						if(CU.isFunction(btn.after))btn.after(btn,token,btns);
					});
				}});
			}});
		});
		thiz.validWFButtonCfg(cfg_execute,"btn_wf_execute","审核","btn_work",function(btn) {
			EU.RS({service:"WorkFlowAdapter",method:"getCurrentToken",params:[instanceid],callback:function(token) {
				if(CU.isEmpty(token)){EU.showMsg({msg:"<font color='red'>流程结束</font>"});return;}
				if(CU.isEmpty(token.executionid)){EU.showMsg({msg:"当前节点还未签收,无法执行!"});return;}
				if(CU.isFunction(btn.before)){var r=btn.before(btn,token,btns);if(r===false)return;}
				var result = PU.openModule({modulecode:"030182",params:{ExecuteId:token.executionid,Title:btn.getText()},width:450,height:250,modal:true});
				if(CU.isEmpty(result)) return ;
				thiz.executeAndCompleteWF(instanceid, result.content, result.ispassing, showmsg, btn, btns, token);
			}});
		});
		thiz.validWFButtonCfg(cfg_details,"btn_wf_details","过程记录","btn_notepad",function(btn) {
			PU.openModule({modulecode:"030181",width:900,height:600,params:{InstanceId:instanceid},modal:true});
		});
		btns.push(EF.getButton(cfg_workflow),EF.getButton(cfg_receipt),EF.getButton(cfg_execute),EF.getButton(cfg_details),new Ext.Toolbar.Separator({name:"btn_wf_separator"}),new Ext.Toolbar.TextItem({name:"btn_wf_status",style:"color:#e77400;font-weight:bold;",text:""}));
		thiz.setWFButtonsStatus(instanceid,btns,callback);
		return btns;
	};
	this.validWFButtonCfg = function(cfg,name,text,iconCls,handler) {
		if(CU.isEmpty(cfg.text))cfg.text = text;
		if(CU.isEmpty(cfg.iconCls))cfg.iconCls = iconCls;
		cfg.handler = handler;
		cfg.name = name;
	};
	this.setWFButtonsStatus = function(instanceid, btns, callback) {
		EU.RS({service:"WorkFlowAdapter",method:"getCurrentPermissionToken",params:[instanceid],callback:function(token) {
			var isover = CU.isEmpty(token);
			var statusname = isover ? "流程结束" : "["+token.nodename+"] "+(token.status==0?"待签收":(token.status==1?"执行中":"已完成"));
			var isspecial = !isover&&(token.nodecode=="FIRSTEDIT"||token.nodetype!=12);
			for(var i=0; i<btns.length; i++) {
				switch(btns[i].name) {
					case "btn_wf_receipt": btns[i].setVisible(!isover&&!isspecial&&token.ispermission==1&&token.status==0); break;
					case "btn_wf_execute": btns[i].setVisible(!isover&&!isspecial&&token.ispermission==1&&token.status==1); break;
					case "btn_wf_status": btns[i].setText(statusname); break;
				}
			}
			if(CU.isFunction(callback))callback(instanceid, btns, token);
		}});
	};
	this.executeAndCompleteWF = function(instanceid, content, ispassing, showmsg, btn, btns, token, paramsstr) {
		EU.RS({service:"WorkFlowAdapter",method:"executeAndComplete",params:[instanceid,content,ispassing,null,null,paramsstr],callback:function(r) {
			if(!CU.isEmpty(r)){EU.showMsg({msg:"<font color='red'>"+r+"</font>"}); return ;}
			thiz.setWFButtonsStatus(instanceid,btns,function(){
				if(showmsg!==false)EU.showMsg({msg:btn.getText()+(ispassing==1?"<font color='#008800'>通过</font>":"<font color='red'>退回</font>")+"成功!",width:260});
				if(CU.isFunction(btn.after))btn.after(btn,token,ispassing,content,btns);
			});
		}});
	};
	/**
	 * @param {} cfg {width0:,renderer0:}
	 */
	this.getWFRecordDetailsGrid = function(cfg) {
		if(CU.isEmpty(cfg))cfg={};
		var fields = ["content","receipttime","spare6","completerid","completername","completetime","spare5","spare4","nodeid","nodecode","nodename","spare3","spare2","spare1","serialno","status","receipterid","receiptername","spare7","id","instanceid","attachsnum","attachstablename"];
		var cm = EF.getColumnModel([
		    {header:"序号", width:CU.isEmpty(cfg.width0)?35:cfg.width0, align:"center", dataIndex:"serialno",renderer:CU.isEmpty(cfg.renderer0)?function(value,ma,record){
		    	return "<font color='#7f0055'><b>"+value+"</b></font>";
		    }:cfg.renderer0},
			{header:"流程节点", width:CU.isEmpty(cfg.width1)?120:cfg.width1, align:"left", dataIndex:"nodename",renderer:CU.isEmpty(cfg.renderer1)?undefined:cfg.renderer1},
			 {header:"状态", width:CU.isEmpty(cfg.width2)?50:cfg.width2, align:"center", dataIndex:"status",renderer:CU.isEmpty(cfg.renderer2)?function(value,ma,record){
			    if(value=="0") return "<font color='green'>"+"执行中"+"</font>";
			    if(value=="1") return "<font color='blue'>"+"前进"+"</font>";
			    if(value=="2") return "<font color='red'>"+"后退"+"</font>";
			 }:cfg.renderer2},
			{header:"签收人", width:CU.isEmpty(cfg.width3)?60:cfg.width3, align:"center", dataIndex:"receiptername",renderer:CU.isEmpty(cfg.renderer3)?undefined:cfg.renderer3},
			{header:"签收时间", width:CU.isEmpty(cfg.width4)?120:cfg.width4, align:"center", dataIndex:"receipttime",renderer:CU.isEmpty(cfg.renderer4)?undefined:cfg.renderer4},
			{header:"执行内容", width:CU.isEmpty(cfg.width5)?460:cfg.width5, align:"left", dataIndex:"content",renderer:CU.isEmpty(cfg.renderer5)?function(value,ms,render){
				if(!CU.isEmpty(value)&&value.indexOf("\n")>0)value=value.replace(/\n/g,"<br>");
				return value;
			}:cfg.renderer5},
			{header:"附件", width:CU.isEmpty(cfg.width6)?35:cfg.width6, align:"center", dataIndex:"attachsnum",renderer:CU.isEmpty(cfg.renderer6)?function(value,ma,record){
				if(!CU.isEmpty(value)&&value>0) return "<img style='cursor:hand' onclick='PU.openModule({modulecode:\"018002\",width:800,height:600,modal:true,params:{TableName:\""+record.get("attachstablename")+"\",FieldName:\"ID\",FieldValue:\""+record.get("id")+"\"}})' src='"+ContextPath+"/framework/images/icons/attachment_s.png'></img>";
			}:cfg.renderer6}
		]);
    	return EF.getGridPanel({service:"WorkFlowAdapter",method:"getProcessExecutions",layout:"fit",autoBreakCell:true,border:false,fields:fields,cm:cm,paging:false});
	};
	
	
	/**
	 * @param {} config
	 * 		template: 报表模板
	 * 		paging: 是否分页		缺省为true
	 * 		align: 对齐方式	left、center、right		缺省为center
	 * 		jdbctype: 数据源类型
	 */
	this.previewRunqianReport = function(cfg) {
		if(CU.isEmpty(cfg.width))cfg.width = 650;
		if(CU.isEmpty(cfg.height))cfg.height = 650;
		if(CU.isEmpty(cfg.paging))cfg.paging = false;
		if(CU.isEmpty(cfg.align))cfg.align = "center";
		var params = CU.isEmpty(cfg.params) ? {} : cfg.params;
		if(CU.isArray(params))params=params.length>0?params[0]:{};
		params["BASEFLAG_template"] = cfg.template;
		params["BASEFLAG_paging"] = cfg.paging;
		params["BASEFLAG_align"] = cfg.align;
		if(!CU.isEmpty(cfg.jdbctype))params["BASEFLAG_jdbctype"]=cfg.jdbctype;
		var opparams = {Report_template:cfg.template,Report_paging:cfg.paging,Report_align:cfg.align,Report_params:params,Report_page:1,Report_jdbctype:cfg.jdbctype};
		PU.openModule({modulecode:"018004",params:opparams,width:cfg.width,height:cfg.height,modal:true});
	};
	
	
	
	/**
	 * 获取下拉列表数据
	 * @param def 代码定义
	 * @param v 值
	 * @param addcolor 是否添加颜色
	 */
	this.getDropValue = function(def, v, addcolor) {
		var item = CU.getDropItemRecord(def, v);
		if(CU.isEmpty(item)) return "";
		if(addcolor) {
			return "<font color='"+item.attributes.color+"'>"+item.name+"</font>";
		}else {
			return item.name;
		}
	};
	this.getDropColor = function(def, v) {
		var item = CU.getDropItemRecord(def, v);
		if(CU.isEmpty(item)) return "";
		return item.attributes.color;
	};
	
	
	this.getSelectOptionsHtml = function(def) {
		var html = [];
		var ls = DROP[def];
		if(!CU.isEmpty(ls)) {
			for(var i=0; i<ls.length; i++) {
				html.push("<option value=\""+ls[i].code+"\">"+ls[i].name+"</option>");
			}
		}
		return html.join("");
	};
	
	/**
	 * 获取表单所有数据
	 * @param formId 表单元素ID (可以是form,也可以是div等)
	 * @param tags 指定需获取元素标签, 多个以逗号(,)分隔, 缺省为 input,select,textarea
	 * @param ignoreNull 是否忽略null值, 缺省为true
	 */
	this.getFormData = function(formId, tags, ignoreNull) {
		ignoreNull = ignoreNull !== false;
		if(CU.isEmpty(tags)) tags = "input,select,textarea";
		var ts = tags.split(",");
		var data = {};
		
		var form = $("#"+formId);
		if(CU.isEmpty(form)) return data;
		
		for(var i=0; i<ts.length; i++) {
			var els = form.find(ts[i]);
			
			for(var j=0; j<els.length; j++) {
				if(CU.isEmpty(els[j].name)) continue ;
				var v = null;
				if(els[j].type.toLowerCase() == "checkbox") {
					v = $(els[j]).prop("checked") ? 1 : 0;
				}else {
					v = $(els[j]).val();
				}
				if(v===null || v===undefined) {
					if(!ignoreNull)	continue ;
					v = null;
				}
				data[els[j].name] = v;
			}
		}
		return data;
	};
	
	/**
	 * 对表单批量赋值
	 * @param data 表单数据
	 * @param formId 表单元素ID (可以是form,也可以是div等)
	 * @param tags 指定需获取元素标签, 多个以逗号(,)分隔, 缺省为 input,select,textarea
	 * @param ignoreNull 是否忽略null值, 缺省为false
	 */
	this.setFormData = function(data, formId, tags, ignoreNull) {
		if(!CU.isObject(data)) return ;
		if(CU.isEmpty(tags)) tags = "input,select,textarea";
		var ts = tags.split(",");
		
		var form = $("#"+formId);
		if(CU.isEmpty(form)) return ;
		ignoreNull = ignoreNull === true;
		
		for(var i=0; i<ts.length; i++) {
			var els = form.find(ts[i]);
			
			for(var j=0; j<els.length; j++) {
				if(CU.isEmpty(els[j].name)) continue ;
				var v = data[els[j].name];
				if(v===null || v===undefined) {
					if(ignoreNull)	continue ;
					v = "";
				}
				
				if(els[j].type.toLowerCase() == "checkbox") {
					$(els[j]).prop("checked", v==1||v=="1"||v=="true"||v==true);
				}else {
					$(els[j]).val(v);
				}
			}
		}
	};
	
	
	
	/**
	 * ajax调用
	 * @param cfg: 配置对象, 其属性值如下
	 * 		url: 地址
	 * 		ps: 参数对象{}
	 * 		msg: 显示消息, 可以是string类型, 为string类型表示消息内容, 可以为boolean, 表示是否显示消息信息
	 * 		cb: 回调方法
	 * 		errcb: 错误回调方法	errcb(errorCode, errorMsg);
	 */
	this.submitEditable = function(cfg) {
		var d = new $.Deferred;
		RS.ajax({url:cfg.url,ps:cfg.ps,msg:cfg.msg,cb:function(cbrs) {
			d.resolve();
			if(CU.isFunction(cfg.cb)) cfg.cb(cbrs);
		},errcb:function(errorCode, errorMsg) {
			if(CU.isFunction(cfg.errcb)) {
				if(cfg.errcb(errorCode, errorMsg, d)===false) return;
			}
			d.reject(errorMsg);
		}});
		return d.promise();
	};
	
	
	
}

var PU = new ProjectUtils();

