<%@ page contentType="text/html; charset=utf-8" %>
<%@page import="java.net.URLEncoder"%>

<%
try {
	String action = request.getParameter("downaction");
	if(action==null || (action=action.trim()).length()==0)action="/HttpForward.do";
	RequestDispatcher dispatcher = application.getRequestDispatcher(action);
	dispatcher.forward(request,response);
}catch(Exception e) {
	out.println("Error: ");
	if(e != null) out.println(e.getMessage());
}
%>