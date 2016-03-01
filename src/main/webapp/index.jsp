<%@ page contentType="text/html; charset=utf-8"%>
<%@page import="com.binary.core.http.URLResolver,com.binary.core.lang.Conver,com.binary.core.util.BinaryUtils"%>

<%
String ContextPath = request.getContextPath();
String url = ContextPath+"/sso/client/auth/verifyLogin";

String beforeUrl = request.getParameter("beforeUrl");
if(BinaryUtils.isEmpty(beforeUrl)) {
	beforeUrl = Conver.to(request.getAttribute("beforeUrl"), String.class);
}

if(!BinaryUtils.isEmpty(beforeUrl)) {
	if(beforeUrl.indexOf('/') >= 0) {
		beforeUrl = URLResolver.encode(beforeUrl);
	}
	url += "?beforeUrl="+beforeUrl;
}

//request.getRequestDispatcher("/sso/client/auth/verifyLogin").forward(request, response);
response.sendRedirect(url);
%>
