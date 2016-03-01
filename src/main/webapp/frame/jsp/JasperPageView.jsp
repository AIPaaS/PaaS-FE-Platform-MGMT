<%@ page contentType="text/html; charset=utf-8"%>


<%
	StringBuffer buffer = (StringBuffer) request.getAttribute("HtmlBuffer");
	Integer currentPage = (Integer) request.getAttribute("CurrentPage");
	Integer totalPages = (Integer) request.getAttribute("TotalPages");
%>

<script>
var currentPage = <%=currentPage%>;
var totalPages = <%=totalPages%>;
</script>

<%=buffer %>
