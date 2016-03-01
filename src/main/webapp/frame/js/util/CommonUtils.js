/**
 * 基础处理方法
 */
function CommonUtils() {
	var thiz = this;
	this.BASEFLAG_COUNTER = 0;
	this.BG = {SN:"BASEFLAG_ServiceName",SMN:"BASEFLAG_MethodName",PS:"BASEFLAG_PageSize",P:"BASEFLAG_Paging",AV:"BASEFLAG_AppendValues",ARP:"BASEFLAG_AjaxRequestParams",TBV:"BASEFLAG_TreeBeanValues",GBV:"BASEFLAG_GridBeanValues",VN:"BASEFLAG_ViewName",AE:"BASEFLAG_AddEmpty",CIS:"BASEFLAG_CodeIds",SP:"BASEFLAG_SearchParam",BV:"BASEFLAG_BindValues",GSR:"BASEFLAG_GroupSummaryRow"};
	this.userAgent = navigator.userAgent.toLowerCase();
	this.activeX = ['MSXML2.XMLHTTP.5.0','MSXML2.XMLHTTP.4.0','MSXML2.XMLHTTP.3.0','MSXML2.XMLHTTP','Microsoft.XMLHTTP'];
	this.getId = function() {this.BASEFLAG_COUNTER ++ ;return this.BASEFLAG_COUNTER;};
	this.isOpera = function() {return /opera/.test(this.userAgent);};
	this.isIE = function() {return !thiz.isOpera() && /msie/.test(this.userAgent);};
	this.isIE6 = function() {return thiz.isIE() && /msie 6/.test(this.userAgent);};
	this.isIE7 = function() {return thiz.isIE() && /msie 7/.test(this.userAgent);};
	this.isIE8 = function() {return thiz.isIE() && /msie 8/.test(this.userAgent);};
	this.isEmpty = function(v, allowBlank) {return v === null || v === undefined || ((thiz.isArray(v) && !v.length)) || (!allowBlank ? v === '' : false);};
    this.isArray = function(v){return Object.prototype.toString.apply(v) === '[object Array]';};
    this.clearArray = function(a){while(a.length>0)a.pop();};
    this.isObject = function(v){ return v && typeof v == "object"; };
    this.isPrimitive = function(v){var t=typeof v; return t == 'string' || t == 'number' || t == 'boolean'; };
    this.isFunction = function(v){return typeof v == "function";};
    this.undef = function(value) {return value !== undefined ? value : "";};
	this.toObject = function(v) {return JSON.parse(v);};
	this.toString = function(v) {return JSON.stringify(v);};
	this.parseParams = function(paramsobj) {var paramsstr = "";for(var key in paramsobj) {var value = paramsobj[key];if(thiz.isEmpty(value, true)) continue;if(thiz.isArray(value)) {for(var i=0; i<value.length; i++) {paramsstr += "&" + key + "=" + value[i];}}else {paramsstr += "&" + key + "=" + value;}}return paramsstr;};
	this.insert = function(array,index,item) {if(thiz.isEmpty(index))index=array.length;if(index<0||index>array.length)return;for(var i=array.length; i>index; i--)array[i]=array[i-1];array[index]=item;return item;};
	this.remove = function(array,index) {if(index<0||index>=array.length)return;var item=array[index];array.splice(index,1);return item;};
	this.format = function(v,len,mustlen){v+="";if(v.length==0)v="0";if(mustlen!==false)return parseFloat(v).toFixed(len);if(!thiz.isEmpty(v)&&v.indexOf(".")>0&&v.substring(v.indexOf(".")+1).length>len) {value = parseFloat(value).toFixed(len);}};
	/**
	 * 获取远程地址
	 * @param {} config
	 * 		addroot: 是否添加ContextPath, 缺省为添加
	 * 		url: 远程地址
	 * 		ps:
	 * @return {}
	 */
	this.getServerLink = function(config) {
		var url = [];
		if (config.addroot !== false) url.push(ContextPath);
		if (!thiz.isEmpty(config.url)) url.push(config.url);
		if (thiz.isObject(config.ps)) {
			url.push("?1=1");
			url.push(thiz.parseParams(config.ps));
		}
		return url.join("");
	};
	this.createXmlHttp = function() {
		try {
			return new XMLHttpRequest();
		} catch (e) {
			for (var i = 0; i < thiz.activeX.length; i++) {
				try {
					return new ActiveXObject(thiz.activeX[i]);
				} catch (e1) {
				}
			}
		}
		alert('No browser XMLHttpRequest (AJAX) support');
	};
	
	/**
	 * 基础请求远程服务
	 * @param {} config
	 * 		url: 远程地址
	 * 		method: POST\GET	缺省为POST
	 * 		async: 是否异步: true=异步	false=同步, 缺省为异步
	 * 		success: 请求成功所执行方法 success(xmlhttp)
	 * 		failure: 请求失败所执行方法 failure(xmlhttp)
	 * @return {}
	 */
	this.request = function(config) {
		if (thiz.isEmpty(config.method)) config.method = "POST";
		if (thiz.isEmpty(config.async)) config.async = true;
		var xmlhttp = thiz.createXmlHttp();
		if (config.async && (thiz.isFunction(config.success) || thiz.isFunction(config.failure))) {
			xmlhttp.onreadystatechange = function() {
				if (xmlhttp.readyState == 4) {
					if (xmlhttp.status == 200) {
						if (thiz.isFunction(config.success))
							config.success(xmlhttp);
					} else {
						if (thiz.isFunction(config.failure))
							config.failure(xmlhttp);
					}
				}
			};
		}
		xmlhttp.open(config.method, config.url, config.async);
		var sendparams = null;
		if (thiz.isObject(config.params)) {
			xmlhttp.setRequestHeader("Content-Type",
					"application/x-www-form-urlencoded;charset=utf-8");
			sendparams = thiz.parseParams(config.params);
			if (sendparams.length > 0)
				sendparams = sendparams.substring(1);
		}
		xmlhttp.send(sendparams);
		if (!config.async) {
			if (xmlhttp.status == 200) {
				if (thiz.isFunction(config.success)) {
					config.success(xmlhttp);
				} else {
					return xmlhttp;
				}
			} else {
				if (thiz.isFunction(config.failure)) {
					config.failure(xmlhttp);
				} else {
					return new Error(xmlhttp.responseText);
				}
			}
		}
	};
	this.createEl = function(config, properties) {var el;if(typeof(config) == "string") {el = document.createElement(config);}else {if(thiz.isEmpty(config)) config = {};if(thiz.isEmpty(config.tagName)) config.tagName = "DIV";el = document.createElement(config.tagName);if(!thiz.isEmpty(config.id)) el.id = config.id;if(!thiz.isEmpty(config.name)) el.name = config.name;if(!thiz.isEmpty(config.cls)) el.className = config.cls;if(!thiz.isEmpty(config.style)) el.style.cssText = config.style;if(!thiz.isEmpty(config.html)) el.innerHTML = config.html;if(thiz.isArray(config.items)) for(var i=0; i<config.items.length; i++) el.appendChild(config.items[i]);}if(thiz.isObject(properties)) for(var key in properties) el[key] = properties[key];return el;};
	this.trim = function(str) {if(str==undefined || str==null) return str;var length = str.length;var i;var t;var s;for(i=0; i<length; i++) {t = str.charAt(i);if(t != " ") {break;}}s = str.substring(i, length);for(i=s.length-1; i>=0; i--) {t = s.charAt(i);if(t != " ") {break;}}return s.substring(0, i+1);};
	this.getDate = function() {return thiz.toDateString(new Date());};
	this.getTime = function() {return thiz.toTimeString(new Date());};
	this.toDate = function(value) {return new Date(Date.parse(value.replace(/-/g,"/")));};
	this.toDateString = function(date) {var y = date.getFullYear();var m = date.getMonth()+1;if(m < 10) m = "0"+m;var d = date.getDate();if(d < 10) d = "0"+d;return y+"-"+m+"-"+d;};
	this.toTimeString = function(date) {var y = date.getFullYear();var m = date.getMonth()+1;if(m < 10) m = "0"+m;var d = date.getDate();if(d < 10) d = "0"+d;var h = date.getHours();if(h < 10) h = "0"+h;var mi = date.getMinutes();if(mi < 10) mi = "0"+mi;var s = date.getSeconds();if(s < 10) s = "0"+s;return y+"-"+m+"-"+d+" "+h+":"+mi+":"+s;};
	this.getDateDiff = function(small, big) {return (big-small)/1000/60/60/24;};
	this.getBeforeDate = function(day) {return new Date(new Date().getTime()-1000*60*60*24*day);};
	this.getBeforeDateString = function(day) {var date = thiz.getBeforeDate(day);var y = date.getFullYear();var m = date.getMonth()+1;var d = date.getDate();if(m < 10) m = "0"+m;if(d < 10) d = "0"+d;return y+"-"+m+"-"+d;};
	this.getAfterDate = function(day) {return new Date(new Date().getTime()+1000*60*60*24*day);};
	this.getAfterDateString = function(day) {var date = thiz.getAfterDate(day);var y = date.getFullYear();var m = date.getMonth()+1;var d = date.getDate();if(m < 10) m = "0"+m;if(d < 10) d = "0"+d;return y+"-"+m+"-"+d;};
	this.getDaysInMonth = function(year, month) {switch (month) {case 1:case 3:case 5:case 7:case 8:case 10:case 12: return 31;case 4:case 6:case 9:case 11: return 30;case 2: return ((year%4==0 && year%100!=0) || (year%400==0)) ? 29 : 28;default: return -1;}};
	this.clone = function(obj) {if(obj==null || obj==undefined) return obj;var newobj;if(obj.constructor == Object) {newobj = new obj.constructor();}else {newobj = new obj.constructor(obj.valueOf());}for(key in obj) {var value = obj[key];if(newobj[key] != obj[key]) {if(typeof(value) == "object") {newobj[key] = thiz.clone(value);}else {newobj[key] = value;}}}newobj.toString = obj.toString;newobj.valueOf = obj.valueOf;return newobj;};
	this.getNumberFormatKeyPress=function(negative, decimal){if(thiz.isEmpty(decimal)) decimal = 0;if(!thiz.isPrimitive(decimal)) decimal = parseInt(decimal, 10);negative = negative === true;var keypress = "var sel=document.selection.createRange();sel.moveStart(\"character\", -this.value.length);var sellen=sel.text.length;if((event.keyCode<48||event.keyCode>57)&&event.keyCode!=46&&event.keyCode!=45){event.returnValue=false;return;}";keypress += negative ? "if(event.keyCode==45&&(sellen>0||this.value.indexOf(\"-\")>-1)){event.returnValue=false;return;}" : "if(event.keyCode==45){event.returnValue=false;return;}";keypress += decimal>0 ? "if(event.keyCode==46&&(sellen==0||this.value.indexOf(\".\")>0)){event.returnValue=false;return;}if(this.value.indexOf(\".\")>0&&sellen>this.value.indexOf(\".\")&&this.value.substring(this.value.indexOf(\".\")+1).length>="+decimal+"){event.returnValue=false;return;}if(event.keyCode==46&&this.value.length-sellen>"+decimal+"){this.value=this.value.substring(0,sellen+"+decimal+");sel.collapse(true);sel.moveEnd(\"character\", sellen);sel.moveStart(\"character\", sellen);sel.select();}" : "if(event.keyCode==46){event.returnValue=false;return;}";return keypress;};
	this.onNumberFormatKeyPress=function(dom, negative, decimal){if(thiz.isEmpty(decimal))decimal=0;if(!thiz.isPrimitive(decimal)) decimal = parseInt(decimal, 10);negative = negative === true;var sel = document.selection.createRange();sel.moveStart("character", -dom.value.length);var sellen=sel.text.length;if((event.keyCode<48||event.keyCode>57)&&event.keyCode!=46&&event.keyCode!=45){event.returnValue=false;return;}if(negative) {if(event.keyCode==45&&(sellen>0||dom.value.indexOf("-")>-1)){event.returnValue=false;return;}}else {if(event.keyCode==45){event.returnValue=false;return;}}if(decimal > 0) {if(event.keyCode==46&&(sellen==0||dom.value.indexOf(".")>0)){event.returnValue=false;return;}if(dom.value.indexOf(".")>0&&sellen>dom.value.indexOf(".")&&dom.value.substring(dom.value.indexOf(".")+1).length>=decimal){event.returnValue=false;return;}if(event.keyCode==46&&dom.value.length-sellen>decimal){dom.value=dom.value.substring(0,sellen+decimal);sel.collapse(true);sel.moveEnd("character", sellen);sel.moveStart("character", sellen);sel.select();}}else {if(event.keyCode==46){event.returnValue=false;return;}}};
	this.getDateFormatKeyPress=function(type){if(thiz.isEmpty(type)) type=3;var keypress = "if((event.keyCode<48||event.keyCode>57)&&event.keyCode!=45){event.returnValue=false;return;}var sel=document.selection.createRange();sel.moveStart(\"character\", -this.value.length);var sellen=sel.text.length;";if(type==1 || type=="y") {keypress += "if(event.keyCode==45||this.value.length>=4){event.returnValue=false;return;}";}else if(type==2 || type=="m") {keypress += "if(event.keyCode==45){if(this.value.indexOf(\"-\")>-1||sellen>4||this.value.length-sellen>2){event.returnValue=false;return;}}else {if(this.value.indexOf(\"-\")>-1) {if(sellen<=this.value.indexOf(\"-\")) {if(this.value.indexOf(\"-\")>=4){event.returnValue=false;return;}}else {if(this.value.length-this.value.indexOf(\"-\")-1>=2){event.returnValue=false;return;}}}else {if(this.value.length>=6){event.returnValue=false;return;}}}";}else if(type==3||type=="d") {keypress += "var wcount = this.value.indexOf(\"-\")<0 ? 0 : (this.value.lastIndexOf(\"-\")==this.value.indexOf(\"-\") ? 1 : 2);if(event.keyCode==45){if(wcount == 2){event.returnValue=false;return;}if(wcount==1) {if(sellen>this.value.indexOf(\"-\")) {if(this.value.length-sellen>2||sellen-this.value.indexOf(\"-\")-1>2||this.value.indexOf(\"-\")>4){event.returnValue=false;return;}}else {if(sellen>4||this.value.indexOf(\"-\")-sellen-1>2||this.value.length-this.value.indexOf(\"-\")-1>2){event.returnValue=false;return;}}}else {if(sellen>6){event.returnValue=false;return;}}}else {if(wcount == 0) {if(this.value.length>=8){event.returnValue=false;return;}}else if(wcount == 1) {if(this.value.length>=9||this.value.indexOf(\"-\")>=6||this.value.length-this.value.indexOf(\"-\")-1>=4){event.returnValue=false;return;}}else if(wcount == 2) {if(sellen<=this.value.indexOf(\"-\")) {if(this.value.indexOf(\"-\")>=4){event.returnValue=false;return;}}else if(sellen>this.value.indexOf(\"-\")&&sellen<=this.value.lastIndexOf(\"-\")) {if(this.value.lastIndexOf(\"-\")-this.value.indexOf(\"-\")-1>=2){event.returnValue=false;return;}}else {if(this.value.length-sellen>2||this.value.length-this.value.lastIndexOf(\"-\")-1>=2){event.returnValue=false;return;}}}}";}return keypress;};
	this.onDateFormatKeyPress=function(dom, type){if(thiz.isEmpty(type))type=3;if((event.keyCode<48||event.keyCode>57)&&event.keyCode!=45){event.returnValue=false;return;}var sel = document.selection.createRange();sel.moveStart("character", -dom.value.length);var sellen=sel.text.length;if(type==1 || type=="y") {if(event.keyCode==45){event.returnValue=false;return;}if(dom.value.length>=4){event.returnValue=false;return;}}else if(type==2 || type=="m") {if(event.keyCode==45) {if(dom.value.indexOf("-")>-1||sellen>4||dom.value.length-sellen>2){event.returnValue=false;return;}}else {if(dom.value.indexOf("-")>-1) {if(sellen<=dom.value.indexOf("-")) {if(dom.value.indexOf("-")>=4){event.returnValue=false;return;}}else {if(dom.value.length-dom.value.indexOf("-")-1>=2){event.returnValue=false;return;}}}else {if(dom.value.length>=6){event.returnValue=false;return;}}}}else if(type==3||type=="d") {var wcount = dom.value.indexOf("-")<0 ? 0 : (dom.value.lastIndexOf("-")==dom.value.indexOf("-") ? 1 : 2);if(event.keyCode==45){if(wcount == 2){event.returnValue=false;return;}if(wcount==1) {if(sellen>dom.value.indexOf("-")) {if(dom.value.length-sellen>2||sellen-dom.value.indexOf("-")-1>2||dom.value.indexOf("-")>4){event.returnValue=false;return;}}else {if(sellen>4||dom.value.indexOf("-")-sellen-1>2||dom.value.length-dom.value.indexOf("-")-1>2){event.returnValue=false;return;}}}else {if(sellen>6){event.returnValue=false;return;}}}else {if(wcount == 0) {if(dom.value.length>=8){event.returnValue=false;return;}}else if(wcount == 1) {if(dom.value.length>=9||dom.value.indexOf("-")>=6||dom.value.length-dom.value.indexOf("-")-1>=4){event.returnValue=false;return;}}else if(wcount == 2) {if(sellen<=dom.value.indexOf("-")) {if(dom.value.indexOf("-")>=4){event.returnValue=false;return;}}else if(sellen>dom.value.indexOf("-")&&sellen<=dom.value.lastIndexOf("-")) {if(dom.value.lastIndexOf("-")-dom.value.indexOf("-")-1>=2){event.returnValue=false;return;}}else {if(dom.value.length-sellen>2||dom.value.length-dom.value.lastIndexOf("-")-1>=2){event.returnValue=false;return;}}}}}};
	this.getTempletFormatKeyDown=function(templet, type){if(thiz.isEmpty(type))type=2;var emptys="[";for(var i=0; i<templet.length; i++) {var c = templet.charAt(i);if(c == "_") {if(emptys.length>1)emptys+=",";emptys += i;}}emptys += "]";var keydown = "var emptys="+emptys+";var sel = document.selection.createRange();sel.moveStart(\"character\", -this.value.length);var sellen=sel.text.length;var code = event.keyCode;if(code==45 || code==17) {event.returnValue=false;return;}if(code==46) {event.returnValue=false;if(emptys.indexOf(sellen) < 0) return;this.value = this.value.substring(0,sellen)+\"_\"+this.value.substring(sellen+1);sel.collapse(true);sel.moveEnd(\"character\", sellen);sel.moveStart(\"character\", sellen);sel.select();}else if(code==8) {event.returnValue=false;if(emptys.indexOf(sellen-1) < 0) return;this.value = this.value.substring(0,sellen-1)+\"_\"+this.value.substring(sellen);sel.collapse(true);sel.moveEnd(\"character\", sellen-1);sel.moveStart(\"character\", sellen-1);sel.select();}else {if(code<48||(code>57&&code<65)||code>90) {if(code!=37 && code!=39) {event.returnValue=false;return;}if(type==0&&code>=65&&code<=90) {event.returnValue=false;return;}else if(type==1&&code>=48&&code<=57) {event.returnValue=false;return;}}else {if(emptys.indexOf(sellen) < 0) {event.returnValue=false;return;}this.value = this.value.substring(0,sellen)+this.value.substring(sellen+1);sel.collapse(true);sel.moveEnd(\"character\", sellen);sel.moveStart(\"character\", sellen);sel.select();}}";return keydown;};
	this.onTempletFormatKeyDown=function(dom,templet,type){var emptys = [];for(var i=0; i<templet.length; i++) {var c = templet.charAt(i);if(c == "_") emptys.push(i);}var sel = document.selection.createRange();sel.moveStart("character", -dom.value.length);var sellen=sel.text.length;var code = event.keyCode;if(code==45 || code==17) {event.returnValue=false;return;}if(code==46) {event.returnValue=false;if(emptys.indexOf(sellen) < 0) return;dom.value = dom.value.substring(0,sellen)+"_"+dom.value.substring(sellen+1);sel.collapse(true);sel.moveEnd("character", sellen);sel.moveStart("character", sellen);sel.select();}else if(code==8) {event.returnValue=false;if(emptys.indexOf(sellen-1) < 0) return;dom.value = dom.value.substring(0,sellen-1)+"_"+dom.value.substring(sellen);sel.collapse(true);sel.moveEnd("character", sellen-1);sel.moveStart("character", sellen-1);sel.select();}else {if(code<48||(code>57&&code<65)||code>90) {if(code!=37 && code!=39) {event.returnValue=false;return;}}else {if(emptys.indexOf(sellen) < 0) {event.returnValue=false;return;}dom.value = dom.value.substring(0,sellen)+dom.value.substring(sellen+1);sel.collapse(true);sel.moveEnd("character", sellen);sel.moveStart("character", sellen);sel.select();}}};
	
	
	this.seal = function(backid) {if(thiz.isEmpty(backid)) backid = "base_elementid_backid_"+thiz.getId();var bw = parseInt(document.documentElement.scrollWidth);var bh = parseInt(document.documentElement.scrollHeight);var backel = thiz.createEl({id:backid,style:"top:0px;left:0px;position:absolute;background:#e6e6e6;width:"+bw+"px;height:"+bh+"px;filter:alpha(opacity=40);"+(thiz.isIE() ? "filter:alpha(opacity=40);" : "opacity:0.40;")});document.body.appendChild(backel);return backel;};
	this.createTableHtml = function(config){if(thiz.isEmpty(config.id)) config.id = "common_table_html_"+thiz.getId();var cm=config.cm;var buffer = [];buffer.push("<table id='"+config.id+"' border='0' cellspacing='0' class='table_seditor' bordercolorlight='#FFB951' bordercolordark='#ffffff' ");if(!thiz.isEmpty(config.style))buffer.push("style='"+config.style+"'>");buffer.push("<tr class='table_seditor_headers' style='height:26px;'>");for(var i=0; i<cm.length; i++) {var width = thiz.isEmpty(cm[i].width) ? 100 : cm[i].width;var header = thiz.isEmpty(cm[i].header) ? "&nbsp;" : cm[i].header;var align = thiz.isEmpty(cm[i].align) ? "left" : cm[i].align;buffer.push("<td class='table_seditor_td' style='padding-top:4px;' width='"+width+"' align='"+align+"'>"+header+"</td>");}buffer.push("</tr></table>");return buffer.join("");};
	this.refreshPage = function() {window.location.reload();};
	
	this.callRemoteService = function(serviceName, methodName, args) {var params={BaseFlag_service:serviceName,BaseFlag_method:methodName};if(!thiz.isEmpty(args))params.BaseFlag_arguments=Ext.util.JSON.encode(args);var backel=thiz.seal();var result=null;thiz.request({url:ContextPath+"/remote.do",method:"POST",params:params,async:false,success:function(xmlhttp){if(!thiz.isEmpty(backel))document.body.removeChild(backel);result=xmlhttp.responseText;if(result!=undefined&&result!=null&&result.length>13&&result.substring(0,result.indexOf("_"))=="BASEFLAGERROR"){var errorinfo=eval("("+result.substring(result.indexOf("_")+1)+")");BASEFLAG_ERRORMSG=errorinfo.stackTrace;throw "ServerError";}if(result!=null&&result!=undefined&&result.length>1){var l=result.substring(0,1);var r=result.substring(result.length-1);if(l=="["&&r=="]"){result=eval(result);}else if(l=="{"&&r=="}"){result=eval("("+result+")");}}},failure:function(xmlhttp){if(!thiz.isEmpty(backel))document.body.removeChild(backel);throw "HttpConnectionError";}});return result;};
	/**
	 * Web - forward
	 * @param {} config 配置参数如下
	 * 		url: 
	 * 		ps: 符带参数
	 * 		mask: 是否带遮罩效果, 缺少为true
	 */
	this.forward = function(config){if(thiz.isEmpty(config))config={};if(config.mask !== false) thiz.seal();var url = thiz.getServerLink(config);window.location = url;};
	
	/**
	 * Web - submit
	 * @param {} config 配置参数如下
	 * 		form: 页面中的form元素
	 * 		url: 所访问的service名称, 缺省为当前系统所配好的service
	 * 		ps: 符带参数
	 * 		mask: 是否带遮罩效果, 缺少为true
	 */
	this.submit = function(config) {
		if(thiz.isEmpty(config)) config = {};
		if(config.mask !== false) thiz.seal();
		var url = thiz.getServerLink({url:config.url});
		var formexists = true;
		if(thiz.isEmpty(config.form)) {
			config.form = thiz.createEl("form");
			formexists = false;
		}else if(typeof(config.form) === "string") {
			config.form = document.getElementById(config.form);
		}
		config.form.action = url;
		config.form.method = "POST";
		if(thiz.isObject(config.ps)) {
			for(var key in config.ps) {
				var value = config.ps[key];
				if(thiz.isEmpty(value, true)) continue;
				if(thiz.isArray(value)) {
					for(var i=0; i<value.length; i++) {
						config.form.appendChild(thiz.createEl("input",{type:"hidden",name:key,value:value[i]}));
					}
				}else {
					config.form.appendChild(thiz.createEl("input",{type:"hidden",name:key,value:value}));
				}
			}
		}
		document.body.appendChild(config.form);
		config.form.submit();
		if(!formexists) {
			document.body.removeChild(config.form);
			delete config.form;
		}
	};
	
	/**
	 * 以弹出窗口方式打开模块
	 * @param {} config
	 *  mc: 弹出窗口代码 (平台代码)
	 *  ps: 携带参数
	 */
	this.getModuleUrl = function(cfg) {
		var url = RS.getModuleCodeUrl(cfg.mc);
		if (thiz.isObject(cfg.ps)) url += thiz.parseParams(cfg.ps);
		return url;
	};
	
	/**
	 * 以弹出窗口方式打开模块
	 * @param {} config
	 * 	url: 如果指定的url则以url为优先
	 *  mc: 弹出窗口代码 (平台代码)
	 *  ps: 携带参数
	 *  httpparams: 通过HttpUrl方式传递的参数
	 *  recordid: 弹出窗口所对应的记录ID
	 *  recordids: 弹出窗口所对应的记录ID数组
	 *  width: 窗口宽度   缺省为800
	 *  height: 窗口高度   缺省为600
	 *  resizable: 是否可变大小   缺省为false
	 *  callback: 窗口关闭时回调方法(只对模态窗口起作用)
	 *  modal: 是否为模态窗口   缺省为true
	 */
	this.openModule = function(config) {
		var url = config.url;
		if(thiz.isEmpty(url)) {
			url = thiz.getModuleUrl({mc:config.mc,ps:config.httpparams});
		}
		var params = thiz.isEmpty(config.ps) ? {} : config.ps;
		if(!thiz.isEmpty(config.recordid)) params.BaseFlag_RecordId = config.recordid;
		if(!thiz.isEmpty(config.recordids)) params.BaseFlag_RecordIds = config.recordids;
		var winwidth = thiz.isEmpty(config.width) ? 800 : config.width;
		var winheight = thiz.isEmpty(config.height) ? 600 : config.height;
		var winresizable = config.resizable==true ? "yes" : "no";
		if(config.modal === false) {
			url += thiz.parseParams(params);
			return window.open(url,"_blank","fullscreen=0,menubar=0,resizable="+winresizable+",toolbar=0,location=0,scrollbars=0,status=0,left=300,top=100,width="+winwidth+",height="+winheight);
		}else {
			if(thiz.isIE6()) {winwidth+=6;winheight+=45;}
			var parentwindow = typeof(PRQ)==="undefined"||PRQ===null ? window : PRQ.getParentWindow();
			if(config.modal == "less") {
				return window.showModelessDialog(url,{ParentWindow:parentwindow,OpenParams:params},"dialogWidth:"+winwidth+"px;dialogHeight:"+winheight+"px;center:yes;help:no;resizable:"+winresizable+";status:no;");
			}else {
				var returnWinValue = window.showModalDialog(url,{ParentWindow:parentwindow,OpenParams:params},"dialogWidth:"+winwidth+"px;dialogHeight:"+winheight+"px;center:yes;help:no;resizable:"+winresizable+";status:no;");
				if (returnWinValue===undefined) {
					returnWinValue = window.returnValue;
				}
				if(thiz.isFunction(config.callback)) config.callback(returnWinValue);
				return returnWinValue;
			}
		}
	};
	
	/**
	 * 页面跳转
	 * @param {} config
	 * 	mc: 弹出窗口代码 (平台代码)
	 * 	ps: 携带参数
	 * 	requestMethod: 跳转方式: post||get  缺省为post
	 */
	this.forwardModule = function(config) {
		var params = thiz.isEmpty(config.params) ? {} : config.params;
		params.OpenModuleCode = config.modulecode;
		var cfg = {service:"SystemSafety",method:"openModule",params:params};
		if(thiz.isEmpty(config.requestMethod) || config.requestMethod.toUpperCase()!=="GET") {
			thiz.submit(cfg);
		}else {
			thiz.forward(cfg);
		}
	};
	
	/**
	 * 获取最顶层父窗口
	 * @param {} win
	 * @return {}
	 */
	this.getTopOpener = function(win){if(thiz.isEmpty(win))win=window;return thiz.isEmpty(win.opener) ? win : thiz.getTopOpener(win.opener);};
	
	
	/**
	 * 下载
	 * @param {} cfg
	 * 		action:
	 * 		service:
	 * 		method:
	 * 		params: 对应服务方法参数项[]
	 * 		safe: 是否安全下载	缺省为false
	 */
	this.download = function(cfg, timeout){ 
		var win=thiz.isEmpty(PRQ)?window:PRQ.getParentWindow();
		var opwin = null;
		if(cfg.safe !== true) {
			var url = thiz.getServerLink({action:"/framework/jsp/download.jsp",service:cfg.service,method:cfg.method});
			if(!thiz.isEmpty(cfg.action))url += "&downaction="+cfg.action;
			if(!thiz.isEmpty(cfg.params)) {
				if(!thiz.isArray(cfg.params))cfg.params=[cfg.params];
				url += "&"+thiz.BG.AV+"="+encodeURIComponent(thiz.toString(cfg.params));
			}
			opwin = win.open(url, "_blank", 'fullscreen=0,menubar=0,toolbar=0,location=0,scrollbars=0,status=1,left=300,top=100,width=200,height=200');
		}else {
			var url = ContextPath+"/framework/jsp/safedownload.jsp";
			win.SafeDownload_openerparams = {action:cfg.action,service:cfg.service,method:cfg.method,params:cfg.params};
			opwin = win.open(url, "_blank", 'fullscreen=0,menubar=0,toolbar=0,location=0,scrollbars=0,status=1,left=300,top=100,width=200,height=200');
		}
		if(CU.isEmpty(timeout))timeout=15000;
		setTimeout(function(){if(thiz.isObject(opwin)&&!opwin.closed)opwin.close();},timeout);
	};
	this.downloadext = function(downloaduri,displayname, parentwin) {
		//thiz.submit({action:"/framework/jsp/download.jsp",params:{DownloadURI:downloaduri,DisplayName:displayname},mask:false});
		var url = ContextPath+"/framework/jsp/ExternalDownload.jsp?DownloadURI="+encodeURIComponent(downloaduri)+"&DisplayName="+encodeURIComponent(displayname)+"&date="+new Date().getTime();
		if(thiz.isEmpty(parentwin)) parentwin = window;
		parentwin.location = url;
	};
	/**
	 * 预览
	 * @param {} cfg
	 * 		service:
	 * 		method:
	 * 		params: 对应服务方法参数项[]
	 */
	this.preview = function(cfg) {
		var previewurl = cfg.imgurl;
		if(thiz.isEmpty(previewurl)) {
			if(thiz.isEmpty(cfg.action))cfg.action="/HttpForward.do";
			if(thiz.isEmpty(cfg.service))cfg.service=dynamicService;
			if(!thiz.isEmpty(cfg.params)){
				var params={};
				params[thiz.BG.AV]=thiz.toString(cfg.params);
				cfg.params = params;
			}
			previewurl = thiz.getServerLink(cfg);
		}
		var url = ContextPath+"/framework/jsp/ImagePreview.jsp";
		window.showModelessDialog(url,{PreviewURL:previewurl},"dialogWidth:800px;dialogHeight:600px;center:yes;help:no;resizable:yes;status:no;");
	};
	
	/**
	 * 将二进制数按单位转换
	 * @param v
	 * @return
	 */
	this.toByteUnit = function(v, space) {
		if(thiz.isEmpty(v)) return "";
		v = parseFloat(""+v);
		if(space===null || space===undefined || space!==false) space = " ";
		
		if(v >= 1125899906842624) {
			v = parseInt(((v*100)/1125899906842624),10)/100 + space + "P";
		}else if(v >= 1099511627776) {
			v = parseInt(((v*100)/1099511627776),10)/100 + space + "T";
		}else if(v >= 1073741824) {
			v = parseInt(((v*100)/1073741824),10)/100 + space + "G";
		}else if(v >= 1048576) {
			v = parseInt(((v*100)/1048576),10)/100 + space + "M";
		}else if(v >= 1024) {
			v = parseInt(((v*100)/1024),10)/100 + space + "K";
		}else {
			v = v + "";
		}
		return v;
	};
	
	
	/**
	 * 将二进制数按单位转换
	 * @param v 单位为MB
	 * @return
	 */
	this.toMegaByteUnit = function(v, space) {
		if(thiz.isEmpty(v)) return "";
		v = parseFloat(""+v);
		if(space===null || space===undefined || space!==false) space = " ";
		
		if(v >= 1125899906842624) {
			v = parseInt(((v*100)/1125899906842624),10)/100 + space + "Z";
		}else if(v >= 1099511627776) {
			v = parseInt(((v*100)/1099511627776),10)/100 + space + "E";
		}else if(v >= 1073741824) {
			v = parseInt(((v*100)/1073741824),10)/100 + space + "P";
		}else if(v >= 1048576) {
			v = parseInt(((v*100)/1048576),10)/100 + space + "T";
		}else if(v >= 1024) {
			v = parseInt(((v*100)/1024),10)/100 + space + "G";
		}else {
			v = v + space + "M";
		}
		return v;
	};
	
	
	
	/**
	 * 将日期格式的数值转换成String日期格式, 由yyyyMMdd  -> yyyy-MM-dd
	 * @param dateNum
	 * @return
	 */
	this.toStringDate = function(dateNum) {
		if(thiz.isEmpty(dateNum)) return "";
		var s = dateNum + "";
		if(s.length != 8) return "";
		return s.substring(0,4)+"-"+s.substring(4,6)+"-"+s.substring(6,8);
	};
	
	
	
	/**
	 * 将日期时间格式的数值转换成String日期格式, 由yyyyMMddHHmmss  -> yyyy-MM-dd HH:mm:ss
	 * @param dateTimeNum
	 * @return
	 */
	this.toStringDateTime = function(dateTimeNum) {
		if(thiz.isEmpty(dateTimeNum)) return "";
		var s = dateTimeNum + "";
		if(s.length != 14) return "";
		return s.substring(0,4)+"-"+s.substring(4,6)+"-"+s.substring(6,8)+" "+s.substring(8,10)+":"+s.substring(10,12)+":"+s.substring(12,14);
	};
	
	this.toTimeUnit = function(time) {
		var s = "";
		if(time >= 3600) {
			s += parseInt(time/3600, 10)+"时";
			time = time % 3600;
			
			if(time < 60) {
				s += 0+"分";
			}
		}
		if(time >= 60) {
			s += parseInt(time/60, 10)+"分";
			time = time % 60;
		}
		
		s += time + "秒";
		
		return s;
	};
	
	/**
	 * 记算t1-t2, 结果返回秒数, t1、t2为格式为yyyyMMddHHmmss数值
	 */
	this.timeDifference = function(t1, t2) {
		var td1 = thiz.toDate(thiz.toStringDateTime(t1));
		var td2 = thiz.toDate(thiz.toStringDateTime(t2));
		return parseInt((td1.getTime()-td2.getTime())/1000, 10);
	};
	this.getDropItemRecord = function(def, value) {
		var ls = DROP[def];
		if(!CU.isEmpty(ls)) {
			value = value + "";
			for(var i=0; i<ls.length; i++) {
				if(ls[i].code == value) {
					return ls[i];
				}
			}
		}
		return null;
	};
	this.getDropItemRecordByName = function(def, name) {
		var ls = DROP[def];
		if(!CU.isEmpty(ls)) {
			for(var i=0; i<ls.length; i++) {
				if(ls[i].name == name) {
					return ls[i];
				}
			}
		}
		return null;
	};
	

	this.ip2String = function(ip) {
		var ips = ""+ip;
		var s = "";
		
		for(var i=0; ips.length>0; i++) {
			if(i > 0) s = "." + s;
			
			var a = "";
			if(ips.length > 3) {
				a = ips.substring(ips.length-3, ips.length);
				ips = ips.substring(0, ips.length-3);
			}else {
				a = ips;
				ips = "";
			}
			var b = parseInt(a, 10);
			
			s = b + s;
		}
		return s;
	};
	
	this.toStoreObject = function(obj, robj, prix) {
		if(!thiz.isObject(obj) || !thiz.isObject(robj)) return ;
		for(var key in obj) {
			var value = obj[key];
			if(!thiz.isEmpty(prix)) key = prix+"."+key;
			if(thiz.isObject(value)) {
				thiz.toStoreObject(value, robj, key);
			}else {
				robj[key] = value;
			}
		}
	};
	this.toStoreData = function(data) {
		var rdata = [];
		if(!thiz.isEmpty(data) && thiz.isArray(data)) {
			for(var i=0; i<data.length; i++) {
				var robj = {};
				thiz.toStoreObject(data[i], robj, "");
				rdata.push(robj);
			}
		}
		return rdata;
	};
}

var CU = new CommonUtils();



