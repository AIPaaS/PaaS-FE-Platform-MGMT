<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%> 
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>

<head>
<meta http-equiv="content-type" content="text/html; charset=gb2312">
<title>北京</title>
<meta name="generator" content="Namo WebEditor v5.0">
<style type="text/css">
<!--
.a_10:link {
	font-size: 12px;
	color: #000000;
	text-decoration: none;
}
.a_10:hover {
	font-size: 12px;
	color: #000000;
	text-decoration: none;
}
.a_10 {
	font-size: 12px;
	color: #000000;
	text-decoration: none;
}
.img {border:none;}
.a_9 {	font-size: 12px;
	color: #000000;
	text-decoration: none;
}
-->
</style>
</head>

<body bgcolor="white" text="black" link="blue" vlink="purple" alink="red">
<TABLE cellSpacing=0 cellPadding=0 width="100%" border=0>
<TBODY>
<TR>
<TD vAlign=top align=middle width="34%" rowSpan=4>
<TABLE cellSpacing=0 cellPadding=0 width="87%" border=0>
<TBODY>
<TR>
<TD align=middle height=25>
<DIV id=city><A class=a_10 id=url2  
target=_blank><STRONG>北京</STRONG></A></DIV></TD></TR>
<TR>
<TD align=middle height=20><IMG class=img id=big1 height=46 
src=<%=basePath%>framework/images/web/b0.gif width=50 name=big1></TD></TR>
<TR>
<TD class=a_10 align=middle height=25> 
<DIV id=weather1><A class=a_10 id=url3 target=_blank>无网络</A></DIV></TD></TR></TBODY></TABLE><A class=a_10 id=url4 
target=_blank></A></TD>
<TD class=a_10 vAlign=center noWrap align=left width="20%" height=20><A 
class=a_10 id=url5 
target=_blank>温度：</A></TD>
<TD class=a_10 vAlign=center align=left width="46%">
<DIV id=temp1><A class=a_10 id=url6 target=_blank>无网络</A></DIV></TD></TR>
<TR>
<TD vAlign=center align=left height=20><A class=a_10 id=url7 
target=_blank>风力：</A></TD>
<TD vAlign=center align=left height=20>
<DIV id=wd1><A class=a_10 id=url8 target=_blank>无网络</A></DIV></TD></TR>
<TR>
<TD align='left' height='20'><A class='a_10' id='url9' 
target=_blank>紫外线：</A></TD>
<TD vAlign=center align=left height=20>
<DIV id=index_uv><A class=a_10 id=url10  target=_blank>无网络</A></DIV></TD></TR>
<TR>
<TD vAlign=center align=left height=20><A class=a_10 id=url11 
target=_blank>穿衣：</A></TD>
<TD vAlign=center align=left height=20>
<DIV id=index><A class=a_10 id=url12  target=_blank>无网络</A></DIV></TD></TR></TBODY></TABLE>  
</body>

</html>
