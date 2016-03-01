<%@ page contentType="text/html; charset=utf-8" %>

<%
String ContextPath = request.getContextPath();
%>

<html>
<head>
<title>图片预览</title>
</head>
<body>
<table style="width:100%;height:100%">
<tr><td align="center" valign="middle">
<img id="PreviewImage" src="<%=ContextPath%>/framework/images/core/s.gif">
</td></tr>
</table>
</body>
<script type="text/javascript">
window.onload = function() {
	var params = window.dialogArguments;
	var imgurl = params.PreviewURL;
	document.getElementById("PreviewImage").src = imgurl;
}
</script>
</html>