<%@ page contentType="text/html; charset=utf-8" %>

<html>
<head>
<%
String ContextPath = request.getContextPath();
%>
<script type='text/javascript' src='<%=ContextPath%>/framework/js/util/json2.js'></script>
<script type='text/javascript' src='<%=ContextPath%>/framework/js/util/CommonUtils.js'></script>
</head>
<body></body>
<script>
var ContextPath = "<%=ContextPath%>";
window.onload = function() {
	var openerparams = window.opener.SafeDownload_openerparams;
	var CU = new CommonUtils();
	var action = openerparams.action;
	var params = openerparams.params;
	if(CU.isEmpty(action))action="/HttpForward.do";
	if(CU.isArray(params)){params={};params[CU.BG.AV]=CU.toString(openerparams.params);}
	CU.submit({action:action,service:openerparams.service,method:openerparams.method,params:params});
};
</script>
</html>