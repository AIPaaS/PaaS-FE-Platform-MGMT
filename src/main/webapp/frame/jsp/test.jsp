<%@page contentType="text/html;charset=utf-8" %>
<%@page import="java.io.FileInputStream,java.io.BufferedOutputStream,java.io.BufferedInputStream"%>

<html>

<body>

<object id=FileDialog style="left: 0px; TOP: 0px" classid="clsid:f9043c85-f6f2-101a-a3c9-08002b2f49fb" codebase="http://activex.microsoft.com/controls/vb5/comdlg32.cab">
</object>
<input type=button value="打开Word文档" onclick='doword()'>
<input type=button value="HTML格式" onclick='window.confirm(App.innerHTML)'>
<div align=left id=App style="border:1 solid #000000;background-color:#FFFFFF;height:400px;overflow:auto;width:100%;z-index:2" contentEditable></div>
<script   language= "Javascript "> 
function   doword() 
{ 
var   WordApp=new   ActiveXObject( "Word.Application "); 
WordApp.Application.Visible=true; 
var   Doc=WordApp.Documents.Add( "D:\\Program   

Files\\Microsoft   Office\\Templates\\2052\\典雅型报告.dot ",true); 
} 
</script> 



	
</body>

</html>

