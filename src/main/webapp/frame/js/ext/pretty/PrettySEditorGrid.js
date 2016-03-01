

/**
 * @param {} cfg
 * 		cm: [{header:"列头",width:"列宽",align:"对齐方式",dataIndex:"绑定值-键",style:"",inputType:"none|text|radio|checkbox(缺省为none)",renderer:function(value,rowdata,rowIndex,grid,data,colIndex,name){}}...]
 * 		service: 生成树方法所在的类, 缺省为当前service
 * 		method: service中取数据的方法名
 * 		style:
 * 
 * 		cm扩展：openconfig	- beforeopen(openconfig, field, column, rowIndex) callback(result, field, column, rowIndex)
 */
function PrettySEditorGrid(cfg) {
	var thiz = this;
	this.id = "ID_SEditorGrid_"+CU.getId();
	this.cm = cfg.cm;
	this.fields = cfg.fields;
	this.data = [];
	this.editable = true;
	this.getElName = function(fieldName) {return "TD_TF_"+thiz.id+"_"+fieldName;};
	this.getId = function() {
		return thiz.id;
	};
	this.getHtml = function() {
		var tabwidth = 0;
		for(var i=0; i<thiz.cm.length; i++){
			var cw = thiz.cm[i].width;
			tabwidth += (CU.isEmpty(cw)?100:(typeof cw == "string" ? parseInt(cw,10) : cw));
		}
		var html = ["<table id='",thiz.id,"' width='"+tabwidth+"' border='1' cellpadding='0' cellspacing='0' class='table_seditor x-form-item x-form-item-label' bordercolorlight='#cccccc' bordercolordark='#ffffff' "+(CU.isEmpty(cfg.style)?"":"style='"+cfg.style+"'")+">"];
		html.push("<tr class='table_seditor_headers' style='height:26px;'>");
		for(var i=0; i<thiz.cm.length; i++) {
			if(CU.isEmpty(thiz.cm[i].align))thiz.cm[i].align="left";
			html.push("<td align='"+thiz.cm[i].align+"' valign='middle' width='"+thiz.cm[i].width+"'>"+thiz.cm[i].header+"</td>");
		}
		html.push("</tr></table>");
		return html.join("");
	};
	
	this.deleteRow = function(index) {
		var tab = document.getElementById(thiz.id);
		if(CU.isEmpty(index))index=tab.rows.length-1;
		tab.deleteRow(index+1);
		thiz.data.splice(index,1);
	};
	
	/**
	 * 根据指定列与值来删除行
	 * @param {} field
	 * @param {} value
	 */
	this.removeRow = function(field,value) {
		var array = thiz.getDataAt(field);
		if(CU.isEmpty(array)) return ;
		for(var i=0; i<array.length; i++) {
			if(array[i]==value) {
				thiz.deleteRow(i);
				break;
			}
		}
	};
	this.deleteAll = function() {
		var tab = document.getElementById(thiz.id);
		while(tab.rows.length > 1) tab.deleteRow(1);
		while(thiz.data.length>0)thiz.data.pop();
	};
	this.addRow = function(rowdata) {
		thiz.insert(document.getElementById(thiz.id).rows.length-1, rowdata);
	};
	this.getCount = function() {return thiz.data.length};
	this.insert = function(index, rowdata) {
		var tab = document.getElementById(thiz.id);
		var row = tab.insertRow(index+1);
		row.height = 24;
		if(CU.isEmpty(rowdata))rowdata={};
		if(index < tab.rows.length) {
			CU.insert(thiz.data,index,rowdata);
		}else {
			thiz.data.push(rowdata);
		}
		for(var j=0; j<thiz.cm.length; j++) {
			var cell = row.insertCell();
			cell.align = thiz.cm[j].align;
			cell.valign="middle";
			cell.width=thiz.cm[j].width;
			cell.style.wordBreak = "normal";
			cell.style.width = thiz.cm[j].width;
			var v = rowdata[thiz.cm[j].dataIndex];
			if(v==undefined || v==null) v = "";
			var name = thiz.getElName(thiz.cm[j].dataIndex);
			if(CU.isFunction(thiz.cm[j].renderer))v=thiz.cm[j].renderer(v,rowdata,index,tab,thiz.data,j,name);
			if(CU.isEmpty(thiz.cm[j].inputType))thiz.cm[j].inputType="none";
			var iscom = true;
			var style=CU.isEmpty(thiz.cm[j].style)?"":thiz.cm[j].style;
			var textvalue="";
			var adddblclick = false;
			switch(thiz.cm[j].inputType) {
				case "text": 
				case "textarea": 
					var ista = thiz.cm[j].inputType=="textarea";
					var ip = ista ? "textarea" : "input";
					var areav = ista ? v : "";
					textvalue = v;
					if(CU.isObject(thiz.cm[j].openconfig)) {
						if(!CU.isEmpty(thiz.cm[j].hiddenIndex))adddblclick=true;
						v="<"+ip+" name='"+name+"' "+(adddblclick?"hiddenName='"+thiz.cm[j].hiddenIndex+"'":"")+" style='width:"+(thiz.cm[j].width-18)+"px;height:100%;"+(ista?"overflow:hidden;":"")+style+"' class='input_label x-form-item-label' "+(ista?">"+areav+"</"+ip+">":">")+"<img plugin_dataIndex='"+thiz.cm[j].dataIndex+"' style='cursor:hand;' align='center' src='"+ContextPath+"/framework/images/icons/16x16/select.gif'></img>";
						
					}else {
						v="<"+ip+" name='"+name+"' style='width:"+thiz.cm[j].width+";height:100%;border:0px;text-align:"+thiz.cm[j].align+";"+(ista?"overflow:hidden;":"")+style+"' class='x-form-text x-form-field'>"+areav+"</"+ip+">";
					}
					break;
				case "radio": v="<input name='"+name+"' type='radio' "+((v==true||v==="true"||v==1)?"checked":"")+" />";break;
				case "checkbox": v="<input name='"+name+"' type='checkbox' "+((v==true||v==="true"||v==1)?"checked":"")+" />"; break;
			}
			if(CU.isEmpty(v))v="&nbsp;";
			cell.innerHTML = v;
			if(thiz.cm[j].inputType=="text"){cell.childNodes[0].value=textvalue;}
			if(!CU.isEmpty(cell.childNodes)&&cell.childNodes.length>1&&!CU.isEmpty(cell.childNodes[1])&&!CU.isEmpty(cell.childNodes[1].plugin_dataIndex))cell.childNodes[1].onclick=thiz.pluginTrigger;
			if(adddblclick)cell.childNodes[0].ondblclick=thiz.dblClear;
		}
	};
	this.pluginTriggerCallback = function(result) {
		var colname = event.srcElement.plugin_dataIndex;
		var field = event.srcElement.parentNode.childNodes[0];
		if(CU.isEmpty(colname) || CU.isEmpty(field)) return ;
		var col = thiz.getColumn(colname);
		if(CU.isEmpty(result)) return ;
		var v="";
		if(CU.isArray(result)) {
			for(var i=0; i<result.length; i++) {
				if(i > 0) v += ",";
				v += result[i].codeid;
			}
		}else {
			v = result.codeid;
		}
		field.value = v;
		if(CU.isFunction(col.openconfig.callback_bak))col.openconfig.callback_bak(result, field, col, thiz.getRowIndex(event.srcElement));
	};
	this.pluginTrigger = function() {
		var colname = event.srcElement.plugin_dataIndex;
		var field = event.srcElement.parentNode.childNodes[0];
		if(CU.isEmpty(colname) || CU.isEmpty(field)) return ;
		var col = thiz.getColumn(colname);
		if(CU.isObject(col.openconfig)) {
			if(CU.isEmpty(col.openconfig.callback_bak)) {
				col.openconfig.callback_bak = CU.isFunction(col.openconfig.callback) ? col.openconfig.callback : true;
				col.openconfig.callback = thiz.pluginTriggerCallback;
			}
			if(CU.isFunction(col.openconfig.beforeopen) && col.openconfig.beforeopen(col.openconfig, field, col, thiz.getRowIndex(event.srcElement))===false) return;
			CU.openModule(col.openconfig);
		}
	};
	this.dblClear = function() {
		var field = event.srcElement;
		var index = thiz.getRowIndex(field);
		field.value="";
		thiz.setValueAt(index, field.hiddenName, "");
	};
	this.executeQuery = function(ps,callback,errorcallback) {
		ps=CU.isEmpty(ps)?[]:(CU.isArray(ps)?ps:[ps]);
		var params = {};
		params[CU.BG.GBV]=CU.toString({pageSize:-1});
		params[CU.BG.PS]=-1;
		params[CU.BG.AV]=CU.toString(ps);
		params["start"]=0;
		EU.ajax({action:"/ExtGrid.do",service:cfg.service,method:cfg.method,params:params,errorcallback:function(e,result,response, options) {
			if(!CU.isEmpty(result) && CU.isEmpty(result.success)) {this.callback(result);return;}
			if(CU.isFunction(errorcallback)) errorcallback(result,response, options);
		},callback:function(result) {
			if(CU.isObject(result))result=result.valueList;
			thiz.deleteAll();
			if(CU.isEmpty(result)) return ;
			for(var i=0; i<result.length; i++) {
				thiz.insert(i, result[i]);
			}
			if(CU.isFunction(callback)) callback(result);
		}});		
	};
	this.getData = function(fields) {
		var data = {};
		if(CU.isEmpty(fields))fields=thiz.fields;
		for(var i=0; i<fields.length; i++) {
			data[fields[i]]=thiz.getDataAt(fields[i]);
		}
		return data;
	};
	
	this.getDataList = function(fields) {
		var list = [];
		if(CU.isEmpty(fields))fields=thiz.fields;
		var count = thiz.getCount();
		for(var i=0; i<count; i++)list.push({});
		var data = thiz.getData(fields);
		for(var i=0; i<fields.length; i++) {
			var cols = data[fields[i]];
			for(var j=0; j<count; j++) {
				list[j][fields[i]]=cols[j];
			}
		}
		return list;
	};
	
	/**
	 * 根据列名获取列对象
	 * @param {} field
	 */
	this.getColumn = function(field) {
		var col = null;
		for(var i=0; i<thiz.cm.length; i++) {
			if(thiz.cm[i].dataIndex == field) {
				col = thiz.cm[i];
				break;
			}
		}
		return col;
	};
	/**
	 * 跟据字段中获取在cm中的位置,没找到返回-1
	 */
	this.getColumnIndex = function(field) {
		for(var i=0; i<thiz.cm.length; i++) {
			if(thiz.cm[i].dataIndex == field) return i;
		}
		return -1;
	};
	/**
	 * 跟据字段位置获取字段名称,index越界则返回null
	 */
	this.getColumnName = function(index) {
		if(index<0||index>=thiz.cm.length)return null;
		return thiz.cm[index].dataIndex;
	};
	
	/**
	 * 获取指定某列值
	 * @param {} field
	 * @return {}
	 */
	this.getDataAt = function(field) {
		var array = [];
		var col = thiz.getColumn(field);
		if(col == null) {
			for(var i=0; i<thiz.data.length; i++) {
				var v = thiz.data[i][field];
				if(v==null||v==undefined)v="";
				array.push(v);
			}
			return array;
		}
		var name = thiz.getElName(field);
		var els = document.getElementsByName(name);
		if(CU.isEmpty(els) || CU.isEmpty(els.length) || els.length==0) {
			if(col.inputType=="none") {
				for(var i=0; i<thiz.data.length; i++) {
					var v = thiz.data[i][field];
					if(v==null||v==undefined)v="";
					array.push(v);
				}
			}
		}else {
			for(var i=0; i<els.length; i++) {
				var v = els[i].value;
				if(v==undefined||v==null)v="";
				switch(col.inputType) {
					case "radio": v=els[i].checked?"1":"0"; break;
					case "checkbox": v=els[i].checked?"1":"0"; break;
				}
				array.push(v);
			}
		}
		return array;
	};
	
	/**
	 * 获取指定行数据
	 * @param {} index
	 */
	this.getRowData = function(index) {
		var row = document.getElementById(thiz.id).rows[index+1];
		if(CU.isEmpty(row)) return null;
		var rowdata = {};
		for(var i=0; i<thiz.fields.length; i++) {
			rowdata[thiz.fields[i]]=thiz.data[index][thiz.fields[i]];
		}
		for(var i=0; i<thiz.fields.length; i++) {
			var v = "";
			var col = thiz.getColumn(thiz.fields[i]);
			if(col == null) {
				v = thiz.data[index][thiz.fields[i]];
			}else {
				var els = document.getElementsByName(thiz.getElName(thiz.fields[i]));
				if(CU.isEmpty(els) || CU.isEmpty(els.length) || els.length==0) {
					v=thiz.data[index][thiz.fields[i]];
				}else {
					switch(col.inputType) {
						case "text":
						case "textarea": v=els[index].value; break;
						case "radio": v=els[index].checked?"1":"0"; break;
						case "checkbox": v=els[index].checked?"1":"0"; break;
						default: v = CU.isEmpty(els[index].value) ? "" : els[index].value;
					}
				}
			}
			if(v==null||v==undefined)v="";
			rowdata[thiz.fields[i]] = v;
		}
		return rowdata;
	};
	this.setRowData = function(index, data) {
		for(var key in data)thiz.setValueAt(index, key, data[key]); 
	};
	/**
	 * 设置具体方格值
	 */
	this.setValueAt = function(rowIndex, field, value) {
		if(rowIndex<0 || rowIndex>=thiz.getCount() || CU.isEmpty(field) || thiz.fields.indexOf(field)<0) return;
		if(value==undefined || value==null) value="";
		thiz.data[rowIndex][field] = value;
		var col = thiz.getColumn(field);
		if(!CU.isEmpty(col)&&CU.isFunction(col.renderer))value=col.renderer(value,thiz.data[rowIndex],rowIndex,document.getElementById(thiz.id),thiz.data,thiz.getColumnIndex(field),thiz.getElName(field));
		var els = document.getElementsByName(thiz.getElName(field));
		if(CU.isEmpty(els) || CU.isEmpty(els.length) || els.length==0) {
			var colindex = thiz.getColumnIndex(field);
			if(colindex == -1) return ;
			if(value=="") value = "&nbsp;";
			thiz.getRowEl(rowIndex).childNodes[colindex].innerHTML=value;
		}else {
			els[rowIndex].value = value;
		}
	};
	
	/**
	 * 获取具体方格值, 没找到值则返回null
	 */
	this.getValueAt = function(rowIndex, field) {
		if(rowIndex<0 || rowIndex>=thiz.getCount() || CU.isEmpty(field) || thiz.fields.indexOf(field)<0) return null;
		var els = document.getElementsByName(thiz.getElName(field));
		if(CU.isEmpty(els) || CU.isEmpty(els.length) || els.length==0) {
			return thiz.data[rowIndex][field];
		}else {
			return els[rowIndex].value;
		}
	};
	
	/**
	 * 获取行元素
	 */
	this.getRowEl = function(index) {
		return document.getElementById(thiz.id).rows[index+1];
	};
	
	/**
	 * 根据列表单里面组件获取组件所在的行号
	 * @param {} fieldel
	 */
	this.getRowIndex = function(fieldel) {
		var tr = null;
		while(!CU.isEmpty(fieldel.parentNode)) {
			if(fieldel.parentNode.tagName=="TR") {
				tr = fieldel.parentNode;
				break;
			}else {
				fieldel = fieldel.parentNode;
			}
		}
		if(CU.isEmpty(tr)) return -1;
		var count = thiz.getCount();
		for(var i=0; i<count; i++) {
			if(thiz.getRowEl(i)==tr) return i;
		}
		return -1;
	};
	
	/**
	 * 交换指定的两行
	 * @param {} index1
	 * @param {} index2
	 */
	this.exchange = function(index1, index2) {
		if(index1 == index2) return ;
		var sm = index1>index2 ? index2 : index1;
		var big = index1>index2 ? index1 : index2;
		var smel = thiz.getRowEl(sm);
		var bigel = thiz.getRowEl(big);
		if(CU.isEmpty(smel) || CU.isEmpty(bigel)) return ;
		var tab = document.getElementById(thiz.id);
		tab.moveRow(sm+1,big+1);
		tab.moveRow(big,sm+1);
		var t = thiz.data[sm];
		thiz.data[sm] = thiz.data[big];
		thiz.data[big] = t;
	};
	
	/**
	 * 设置表单是否要操作
	 * @param {} edit
	 */
	this.setEditable = function(edit) {
		var edit = edit!==false;
		for(var i=0; i<thiz.cm.length; i++) {
			var col = thiz.cm[i];
			var els = document.getElementsByName(thiz.getElName(col.dataIndex));
			if(!CU.isEmpty(els) && !CU.isEmpty(els.length) && els.length>0) {
				for(var j=0; j<els.length; j++) {
					if(els[j].type=="text" || els[j].type=="textarea") {
						els[j].readOnly = !edit;
					}else {
						els[j].disabled = !edit;
					}
				}
			}
		}
		thiz.editable = edit;
	};
	
	
}



