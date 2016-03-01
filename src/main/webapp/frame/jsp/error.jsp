<%@ page contentType="text/html; charset=utf-8"%>


<%
Exception ex = (Exception)request.getAttribute("exception");
String refurl = request.getHeader("Referer");
if(refurl==null||refurl.length()==0) refurl = request.getContextPath()+"/index.jsp";
%>

<html>
<body>
<br>
<a href="<%=refurl%>">返回</a>
<br>
<br>
出现错误：
<br>
<%=ex.toString()%>
</body>
</html>