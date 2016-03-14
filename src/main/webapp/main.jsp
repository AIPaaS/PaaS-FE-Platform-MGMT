<%@ page contentType="text/html; charset=utf-8"%>
<%@page import="com.binary.framework.web.SessionKey,com.binary.framework.bean.User"%>

<%
String ContextPath = request.getContextPath();
User user = (User)session.getAttribute(SessionKey.SYSTEM_USER);

if(user == null) {
	response.sendRedirect(ContextPath+"/index.jsp");
	return ;
}

Long userId = user.getId();
%>

<!doctype html>
<html>
<head>
<title>EBDP-SDAS-CONSOLE Main</title>
<script type="text/javascript">
var ContextPath = "<%=ContextPath%>";

function forward2ModuCode(mc) {
	var url = ContextPath + "/dispatch/mc/"+mc;
	forward(url);
}

function forward(url) {
	document.getElementById("if_page").src = url + "?PARENT_SID=<%=userId%>&ParentLeftWidth=220&ParentHeaderHeight=50&d="+new Date().getTime();
}


</script>
</head>

<body>

<table>
<tr>
	<td colspan="2">
	&nbsp;
	</td>
</tr>
<tr>
	<td id="td_leftmenu" width="300" valign="top">
		<table>
			<tr>
				<td>
					<span style="padding-left:20px;">资源管理</span><br>
					<span style="padding-left:60px;"><a href="###" onclick="forward2ModuCode('0201')">机房登记</a></span><br>
					<span style="padding-left:60px;"><a href="###" onclick="forward2ModuCode('0202')">数据中心</a></span><br>
					<span style="padding-left:60px;"><a href="###" onclick="forward2ModuCode('0203')">资源中心</a></span><br>
					<span style="padding-left:60px;"><a href="###" onclick="forward2ModuCode('0204')">网络区域</a></span><br>
					<span style="padding-left:60px;"><a href="###" onclick="forward2ModuCode('0205')">服务器登记</a></span><br>
					<span style="padding-left:60px;"><a href="###" onclick="forward2ModuCode('0206')">平台资源</a></span><br>
					<span style="padding-left:60px;"><a href="###" onclick="forward2ModuCode('0207')">资源初始化</a></span><br>
					
				</td>
			</tr>
			<tr>
				<td>
					<span style="padding-left:20px;">租户管理</span><br>
					<span style="padding-left:60px;"><a href="###" onclick="forward2ModuCode('0302')">资源配额审批</a></span><br>
				</td>
			</tr>
			<tr>
				<td width="300" valign="top">
					<span style="padding-left:20px;">镜像管理</span><br>
					<span style="padding-left:60px;"><a href="###" onclick="forward2ModuCode('0401')">镜像库管理</a></span><br>
				</td>
			</tr>
		</table>
	</td>
	<td align="center">
		<iframe id="if_page" frameborder='1' width='900' height='600' src="###"></iframe>
	</td>
</tr>
</table>

<br>
<br>

</body>

</html>
