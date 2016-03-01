<%@ page contentType="text/html; charset=utf-8"%>

<html>
<head>
	<title>打印预览</title>

<%
String ContextPath = request.getContextPath();
String aspectservice = request.getParameter("aspectservice");
String paramsString = (String)request.getAttribute("paramsString");
%>

</head>
<body style="margin-top:0px;margin-left:0px;margin-bottom:0px;margin-right:0px;overflow:hidden;">
<center style="margin-top:0px;margin-left:0px;margin-bottom:0px;margin-right:0px;">
 <applet codebase="applets" code="com.project.framework.applet.JasperApplet.class" border="0" width="100%" height="100%" style="margin-top:0px;margin-left:0px;margin-bottom:0px;margin-right:0px;">
 	<param name="contextpath" 		value="<%=ContextPath%>" />
 	<param name="aspectservice" 	value="<%=aspectservice%>" />
 	<param name="paramsString" 		value="<%=paramsString%>" />
 	<param name="archive" 			value="<%=ContextPath%>/framework/applet/jasperreports-3.6.0-applet.jar,<%=ContextPath%>/framework/applet/commons-logging-1.0.4.jar,<%=ContextPath%>/framework/applet/commons-collections-2.1.1.jar,<%=ContextPath%>/framework/applet/" />
</applet>
</center>
</body>
</html>
