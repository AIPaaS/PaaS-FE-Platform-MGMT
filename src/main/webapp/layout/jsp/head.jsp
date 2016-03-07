<%@ page contentType="text/html; charset=utf-8"%>
<%@page import="com.aic.paas.frame.util.MenuHtmlBuilder,com.binary.framework.web.SessionKey,com.aic.paas.frame.cross.integration.AuthorityPreview,com.aic.paas.frame.cross.bean.DropRecord,com.aic.paas.frame.cross.bean.SysModuRes,com.aic.paas.frame.cross.bean.SysModu,com.aic.paas.frame.util.RequestKey,com.aic.paas.frame.cross.bean.ModuInfo,com.binary.core.util.BinaryUtils,java.util.Enumeration,com.aic.paas.frame.cross.integration.PaasSsoLoginUser,java.util.List,java.util.ArrayList,java.util.Map,java.util.HashMap,com.binary.json.JSON,com.binary.framework.exception.ServiceException"%>


<%
String ContextPath = request.getContextPath();
PaasSsoLoginUser user = (PaasSsoLoginUser)session.getAttribute(SessionKey.SYSTEM_USER);
ModuInfo info = (ModuInfo)request.getAttribute(RequestKey.DYNAMIC_MODUINFO_KEY);

if(user == null) {
	response.sendRedirect(ContextPath+"/index.jsp");
	return ;
}
if(info == null) {
	ServiceException exception = new ServiceException(" The current page is not found the corresponding module object ! ");
	request.setAttribute("exception", exception);
	request.getRequestDispatcher("/error.jsp").forward(request, response);
	return ;
}

SysModu modu = info.getModu();
List<SysModuRes> resList = info.getModuResList();
Map<String, List<DropRecord>> dropmap = info.getDropMap();

Map<?,?> params = request.getParameterMap();
Map<Object,Object> attributes = new HashMap<Object,Object>();
Enumeration<?> enumeration = request.getAttributeNames();

while(enumeration.hasMoreElements()) {
	Object key = enumeration.nextElement();
	if(key==null || !(key instanceof String) || RequestKey.DYNAMIC_IGNORE_KEYS.contains(key)) continue ;
	attributes.put(key, request.getAttribute((String)key));
}

AuthorityPreview preview = user.getAuthorityPreview();
String breadLineHtml = MenuHtmlBuilder.buildBreadLineHtml(ContextPath, info.getModu(), preview);
%>


<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
<title>亚信云 - PAAS管理</title>
<link rel="shortcut icon" href="<%=ContextPath%>/layout/img/favicon.png" type="image/x-png" />

<link rel="stylesheet" type="text/css" href="<%=ContextPath%>/frame/bootstrap/css/bootstrap.min.css"/>

<link rel="stylesheet" type="text/css" href="<%=ContextPath%>/frame/centaurus/css/libs/font-awesome.css"/>
<link rel="stylesheet" type="text/css" href="<%=ContextPath%>/frame/centaurus/css/libs/nanoscroller.css"/>
<link rel="stylesheet" type="text/css" href="<%=ContextPath%>/frame/centaurus/css/compiled/theme_styles.css"/>

<link rel="stylesheet" href="<%=ContextPath%>/frame/centaurus/css/libs/fullcalendar.css" type="text/css"/>
<link rel="stylesheet" href="<%=ContextPath%>/frame/centaurus/css/compiled/calendar.css" type="text/css" media="screen"/>
<link rel="stylesheet" href="<%=ContextPath%>/frame/centaurus/css/libs/morris.css" type="text/css"/>
<link rel="stylesheet" href="<%=ContextPath%>/frame/centaurus/css/libs/daterangepicker.css" type="text/css"/>
<link rel="stylesheet" href="<%=ContextPath%>/frame/centaurus/css/libs/jquery-jvectormap-1.2.2.css" type="text/css"/>
<%
if(resList!=null && resList.size()>0) {
	for(int i=0; i<resList.size(); i++) {
		SysModuRes res = resList.get(i);
		int resType = res.getResType();		//1=JS    2=CSS
		if(resType == 2) {
			String resUrl = res.getResUrl();
			if(BinaryUtils.isEmpty(resUrl)) {
				continue ;
			}
			resUrl = resUrl.trim();
			if(!resUrl.startsWith("http://")) {
				if(resUrl.charAt(0) != '/') resUrl = "/" + resUrl;
				resUrl = ContextPath + resUrl;
			}
			out.print("<link rel='stylesheet' type='text/css' href='"+resUrl+"'>");
		}
	}
}
%>

<script src="<%=ContextPath%>/frame/jquery/jquery-1.11.3.min.js"></script>
<script src="<%=ContextPath%>/frame/jquery/jquery.tmpl.min.js"></script>
<script src="<%=ContextPath%>/frame/jquery/jquery.twbsPagination.min.js"></script>
<script src="<%=ContextPath%>/frame/bootstrap/js/bootstrap.min.js"></script>
<script src="<%=ContextPath%>/frame/centaurus/js/scripts.js"></script>
<script src="<%=ContextPath%>/frame/centaurus/js/pace.min.js"></script>
<script src="<%=ContextPath%>/frame/centaurus/js/jquery.nanoscroller.min.js"></script>

<script src="<%=ContextPath%>/frame/js/util/CommonUtils.js"></script>
<script src="<%=ContextPath%>/frame/js/util/json2.js"></script>
<script src="<%=ContextPath%>/frame/js/util/Cookie.js"></script>
<script src="<%=ContextPath%>/frame/js/util/RemoteService.js"></script>
<script src="<%=ContextPath%>/frame/js/util/PageRequest.js"></script>
<script src="<%=ContextPath%>/frame/js/util/ProjectUtils.js"></script>



<%
if(resList!=null && resList.size()>0) {
	for(int i=0; i<resList.size(); i++) {
		SysModuRes res = resList.get(i);
		int resType = res.getResType();		//1=JS    2=CSS
		if(resType == 1) {
			String resUrl = res.getResUrl();
			if(BinaryUtils.isEmpty(resUrl)) {
				continue ;
			}
			resUrl = resUrl.trim();
			if(!resUrl.startsWith("http://")) {
				if(resUrl.charAt(0) != '/') resUrl = "/" + resUrl;
				resUrl = ContextPath + resUrl;
			}
			out.print("<script type='text/javascript' src='"+resUrl+"'></script>");
		}
	}
}
%>

<script type="text/javascript">
<%
out.print("var ContextPath = '"+ContextPath+"';");
out.print("var cookie = new Cookie();");
out.print("var MODU = "+JSON.toString(modu)+";");		//当前模块对象
out.print("var SU = {id:"+user.getId()+",userCode:\""+user.getUserCode()+"\",userName:\""+user.getUserName()+"\"};");		//登录用户
out.print("var DROP = "+JSON.toString(dropmap)+";");
out.print("var PRQ = new PageRequest({params:"+(params==null?"{}":JSON.toString(params))+",attributes:"+(attributes==null?"{}":JSON.toString(attributes))+"});");
out.print("var BASEFLAG_ERRORMSG=\"\";");
out.print("var BASEFLAG_COUNTER=1;");
out.print("var BaseDefaultStyleColor='black';");
out.print("var BaseDisabledStyleColor='gray';");
%>


RS.showErrMsg = function(errcode, errmsg) {
	if(CU.isEmpty(errmsg)) {
		$("#BSMODAL_AJAX_ERROR_MSG").html("服务器访问失败!");
	}else {
		$("#BSMODAL_AJAX_ERROR_MSG").html(errmsg.replace(/\n/g, "<br>").replace(/ /g, "&nbsp;").replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;"));
	}
	$("#BSMODAL_AJAX_ERROR").modal("show");
	return false;
};


RS.setAjaxLodingButton = function(btnid) {
	var btn = $("#"+btnid);
	if(CU.isEmpty(btn)) {
		RS.onShowMsg = function(msg) { return msg; };
		RS.onHideMsg = function() {};
	}else {
		RS.onShowMsg = function(msg) {
			btn.button("loading");
		};
		RS.onHideMsg = function() {
			btn.button("reset");
		};
	}
};

var CC = {
	BSMODEL_SHOWMSG_CALLBACK : null,
	
	/**
	 * @param cfg
	 * 		title 标题, 缺省为消息
	 * 		msg 信息内容
	 * 		option 空||0=不显示底 	1只有确定按钮	2=确定 取消
	 * 		callback(r) 回调方法 点确定时r=ok	点取消时r=cancel
	 */
	showMsg : function(cfg) {
		if(CU.isEmpty(cfg))cfg={};
		if(CU.isEmpty(cfg.title))cfg.title="消息";
		if(CU.isEmpty(cfg.msg))cfg.msg="";
		if(CU.isEmpty(cfg.option))cfg.option=0;
		$("#BSMODEL_SHOWMSG_TITLE").html(cfg.title);
		$("#BSMODEL_SHOWMSG_CONTENT").html(cfg.msg);
		$("#BSMODEL_SHOWMSG_FOOTER").attr("style", "display:"+(cfg.option==0?"none":"block"));
		$("#BSMODEL_SHOWMSG_BTN_CANCEL").attr("style", "display:"+(cfg.option==2?"":"none"));
		$("#BSMODEL_SHOWMSG").modal("show");
		CC.BSMODEL_SHOWMSG_CALLBACK = cfg.callback;
	},
	
	showMsgCallback : function(t) {
		if(CU.isFunction(CC.BSMODEL_SHOWMSG_CALLBACK)) {
			CC.BSMODEL_SHOWMSG_CALLBACK(t);
		}
	},
	
	
	/**
	 * 对外提供面包线点击事件
	 * @param moduId 面包线对应模块ID
	 * @param moduCode 面包线对应模块代码
	 * @param url 指向跳转页面的URL
	 * @return boolean||string false表示中断事件, string表示重写url
	 */
	onBreadLineClick : function(moduId, moduCode, url) {
	},
	
	clickBreadLine : function() {
		var moduCode = this.id.substring(this.id.lastIndexOf('_')+1);
		var s = this.id.substring(0, this.id.lastIndexOf('_'));
		var moduId = s.substring(s.lastIndexOf('_')+1);
		
		var url = ContextPath + "/dispatch/mi/" + moduId;
		var ba = CC.onBreadLineClick(moduId, moduCode, url);
		if(ba === false) return ;
		if(!CU.isEmpty(ba) && typeof(ba)=="string") url = ba;
		window.location = url;
	},
	
	refreshBreadLineLinks : function() {
		var links = $("#BS_BREAD_LINE").find("a");
		if(!CU.isEmpty(links) && links.length>0) {
			for(var i=0; i<links.length; i++) {
				var m = $(links[i]);
				var aid = m.prop("id");
				if(!CU.isEmpty(aid) && aid.indexOf("BS_BREAD_LINE_LINK_")==0) {
					m.bind("click", CC.clickBreadLine);
				}
			}
		}
	},
	
	getParentLayoutBorder : function() {
		var w = PRQ.get("ParentLeftWidth");
		var h = PRQ.get("ParentHeaderHeight");
		if(CU.isEmpty(w)) {
			w = cookie.get("ParentLeftWidth");
			if(CU.isEmpty(w)) w = "0";
		}else {
			cookie.put("ParentLeftWidth", w);
		}
		if(CU.isEmpty(h)) {
			h = cookie.get("ParentHeaderHeight");
			if(CU.isEmpty(h)) h = "0";
		}else {
			cookie.put("ParentHeaderHeight", h);
		}
		return {width:parseInt(w,10),height:parseInt(h,10)};
	}
};
</script>
</head>



<body style="background:#e7ebee;">


<div class="container" style="background:#e7ebee;">
<div class="row">
<div class="col-lg-12">


<!-- 面包线 -->
<%=breadLineHtml%>


