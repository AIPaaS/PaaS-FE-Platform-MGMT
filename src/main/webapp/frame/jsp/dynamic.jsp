<%@ page contentType="text/html; charset=utf-8"%>
<%@page import="com.aic.paas.frame.cross.bean.DropRecord,com.aic.paas.frame.cross.bean.SysModuRes,com.aic.paas.frame.cross.bean.SysModu,com.aic.paas.frame.util.RequestKey,com.aic.paas.frame.cross.bean.ModuInfo,com.binary.core.util.BinaryUtils,java.util.Enumeration,com.binary.framework.web.SessionKey,com.binary.framework.bean.User,java.util.List,java.util.ArrayList,java.util.Map,java.util.HashMap,com.binary.json.JSON,com.binary.framework.exception.ServiceException"%>


<%
String ContextPath = request.getContextPath();
User user = (User)session.getAttribute(SessionKey.SYSTEM_USER);
ModuInfo info = (ModuInfo)request.getAttribute(RequestKey.DYNAMIC_MODUINFO_KEY);
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

out.print("<html>");
out.print("<head>");
out.print("<title>"+modu.getModuName()+"</title>");
out.print("<link rel='stylesheet' type='text/css' href='"+ContextPath+"/frame/extjs/resources/css/ext-all.css'>");
out.print("<link rel='stylesheet' type='text/css' href='"+ContextPath+"/frame/css/body.css'>");
out.print("<link rel='stylesheet' type='text/css' href='"+ContextPath+"/frame/css/core.css'>");
out.print("<link rel='stylesheet' type='text/css' href='"+ContextPath+"/frame/css/icon.css'>");

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


out.print("<script type='text/javascript' src='"+ContextPath+"/frame/extjs/ext-base.js'></script>");
out.print("<script type='text/javascript' src='"+ContextPath+"/frame/extjs/ext-all.js'></script>");
out.print("<script type='text/javascript' src='"+ContextPath+"/frame/extjs/ext-lang-zh_CN.js'></script>");
out.print("<script type='text/javascript' src='"+ContextPath+"/frame/js/ext/RowExpander.js'></script>");
out.print("<script type='text/javascript' src='"+ContextPath+"/frame/js/ext/SliderTip.js'></script>");
out.print("<script type='text/javascript' src='"+ContextPath+"/frame/js/ext/Spinner.js'></script>");
out.print("<script type='text/javascript' src='"+ContextPath+"/frame/js/ext/SpinnerField.js'></script>");
out.print("<script type='text/javascript' src='"+ContextPath+"/frame/js/ext/pretty/PrettySimpleComps.js'></script>");
out.print("<script type='text/javascript' src='"+ContextPath+"/frame/js/ext/pretty/PrettyDatetimeField.js'></script>");
out.print("<script type='text/javascript' src='"+ContextPath+"/frame/js/ext/pretty/PrettyListBox.js'></script>");
out.print("<script type='text/javascript' src='"+ContextPath+"/frame/js/ext/pretty/PrettyComboBox.js'></script>");
out.print("<script type='text/javascript' src='"+ContextPath+"/frame/js/ext/pretty/PrettyGridExpander.js'></script>");
out.print("<script type='text/javascript' src='"+ContextPath+"/frame/js/ext/pretty/PrettyGridPanel.js'></script>");
out.print("<script type='text/javascript' src='"+ContextPath+"/frame/js/ext/pretty/PrettyEditorGrid.js'></script>");
out.print("<script type='text/javascript' src='"+ContextPath+"/frame/js/ext/pretty/PrettyFormPanel.js'></script>");
out.print("<script type='text/javascript' src='"+ContextPath+"/frame/js/ext/pretty/PrettyPagingToolbar.js'></script>");
out.print("<script type='text/javascript' src='"+ContextPath+"/frame/js/ext/pretty/PrettySEditorGrid.js'></script>");
out.print("<script type='text/javascript' src='"+ContextPath+"/frame/js/ext/pretty/PrettyTreeNode.js'></script>");
out.print("<script type='text/javascript' src='"+ContextPath+"/frame/js/ext/pretty/PrettyTreePanel.js'></script>");
out.print("<script type='text/javascript' src='"+ContextPath+"/frame/js/ext/pretty/PrettyColumnTree.js'></script>");
out.print("<script type='text/javascript' src='"+ContextPath+"/frame/js/ext/pretty/PrettySelectField.js'></script>");
out.print("<script type='text/javascript' src='"+ContextPath+"/frame/js/ext/pretty/PrettyUploadField.js'></script>");
out.print("<script type='text/javascript' src='"+ContextPath+"/frame/js/ext/ExtUtils.js'></script>");
out.print("<script type='text/javascript' src='"+ContextPath+"/frame/js/ext/ExtFactory.js'></script>");
out.print("<script type='text/javascript' src='"+ContextPath+"/frame/js/util/json2.js'></script>");
out.print("<script type='text/javascript' src='"+ContextPath+"/frame/js/util/CommonUtils.js'></script>");
out.print("<script type='text/javascript' src='"+ContextPath+"/frame/js/util/Event.js'></script>");
out.print("<script type='text/javascript' src='"+ContextPath+"/frame/js/util/Cookie.js'></script>");
out.print("<script type='text/javascript' src='"+ContextPath+"/frame/js/util/Error.js'></script>");
out.print("<script type='text/javascript' src='"+ContextPath+"/frame/js/util/RemoteService.js'></script>");
out.print("<script type='text/javascript' src='"+ContextPath+"/frame/js/util/PageRequest.js'></script>");
out.print("<script type='text/javascript' src='"+ContextPath+"/frame/js/util/ProjectUtils.js'></script>");


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



out.print("<script type='text/javascript'>");
out.print("var ContextPath = '"+ContextPath+"';");
out.print("var MODU = "+JSON.toString(modu)+";");		//当前模块对象
if(user == null) {
	out.print("var SU = {};");
}else {
	out.print("var SU = {id:"+user.getId()+",userCode:\""+user.getUserCode()+"\",userName:\""+user.getUserName()+"\"};");		//登录用户
}
out.print("var DROP = "+JSON.toString(dropmap)+";");
out.print("var PRQ = new PageRequest({params:"+(params==null?"{}":JSON.toString(params))+",attributes:"+(attributes==null?"{}":JSON.toString(attributes))+"});");
out.print("var BASEFLAG_ERRORMSG;");
out.print("var BASEFLAG_COUNTER=1;");
out.print("var BaseDefaultStyleColor='black';");
out.print("var BaseDisabledStyleColor='gray';");
out.print("function initializtion() {");
out.print("Ext.BLANK_IMAGE_URL = '"+ContextPath+"/frame/images/core/s.gif';");
out.print("Ext.QuickTips.init();");
out.print("Ext.form.Field.prototype.msgTarget ='under';");
out.print("RS.showErrMsg = function(errcode, errmsg) {EU.showMsg({msg:\"出现错误：<font color='red'>\"+errmsg+\"</font>\"}); return false;};");
out.print("}");
out.print("</script>");
out.print("</head>");

out.print("<body></body>");
out.print("<script type='text/javascript'>");
out.print("window.onload = function() {initializtion();init();}");
out.print("</script>");
out.print("</html>");
%>
