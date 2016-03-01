
//屏蔽js错误 
window.onerror = function() {
	return false;
};
document.onmouseup = function() {
	//if(!CU.isEmpty(window.parent) && !CU.isEmpty(window.parent.M_tabmenu) && window.parent.M_tabmenu.isVisible()) window.parent.M_tabmenu.hide();
};
//屏蔽鼠标右键
document.oncontextmenu = function() {
	//return false;
};
//屏蔽F1帮助
window.onhelp = function() {
	return false;
};
document.onkeydown = function() {
	var e = window.event;
	var key = e.keyCode;
	/**
	屏蔽系统功能键
	F5 ---(key == 116)：刷新;
	F11---(key == 122)：全屏;
	',"---(key == 222);
	ctrl+'N'---'(event.ctrlKey)&&(key==78)'：新开窗口
	ctrl+'R'---'(event.ctrlKey)&&(key==82)'：刷新
	**/
	if(key==116 || key==122 || (e.ctrlKey&&key==78) || (e.ctrlKey&&key==82)) {
		invalidateKey(e);
		return false;
	}
	//屏蔽回退
	if(key==8 && isback(e)) {
		invalidateKey(e);
		return false;
	}
	//屏蔽shift+link
	if(e.shiftKey && e.srcElement.tagName=='A') {
		invalidateKey(e);
		return false;
	}
	//屏蔽Alt+F4
	if(e.altKey && key==115) {
		window.showModelessDialog("about:blank","","dialogWidth:1px;dialogheight:1px");
		invalidateKey(e);
		return false;
	}
	//显示异常信息
	if(e.altKey && key==80) {
		if(BASEFLAG_ERRORMSG==undefined || BASEFLAG_ERRORMSG==null) return ;
		window.showModalDialog(ContextPath+"/framework/jsp/Error.jsp?BASEFLAG_ERRORMSG="+encodeURI(BASEFLAG_ERRORMSG),"","dialogWidth:800px;dialogHeight:600px; edge:Raised; center:yes; help:no; resizable:no; status:no;");
	}
};

/** 使按键无效 **/
function invalidateKey(e) {
	e.keyCode = 0;
    e.cancelBubble = true;
    e.returnvalue = false;
}
/** 判断event所在的组件是否需要屏蔽回退键 **/
function isback(e) {
	return !((e.srcElement.type=='text' || e.srcElement.type=='textarea' || e.srcElement.type=='password')
				&& !e.srcElement.readOnly);
}
