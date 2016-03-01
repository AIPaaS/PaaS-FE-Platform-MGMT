


/**
 * Ext相关公用方法集
 */
function ExtUtils() {
	var thiz = this;
	/**
	 * 调用远程方法
	 * @param {} config:
	 * 		async: 是否异步: true=异步	false=同步, 缺省为异步
	 * 		url: 
	 * 		ps: 参数
	 * @return {}
	 */
	this.RS = function(config) {
		if (config.async === false || config.async == "false") {
			var backel = CU.seal();
			var url = CU.getServerLink({url:config.url});
			var result = null;
			CU.request({
				url : url,
				method : "POST",
				params : config.ps,
				async : false,
				success : function(response) {
					if (!CU.isEmpty(backel)) document.body.removeChild(backel);
					result = CU.toObject(response.responseText);
					if (result.success === true || result.success == "true") {
						result = result.data;
					} else {
						BASEFLAG_ERRORMSG = new Error(result.message,
								result.stackTrace);
						throw "ServerError";
					}
				},
				failure : function(response) {
					if (!CU.isEmpty(backel))
						document.body.removeChild(backel);
					throw "HttpConnectionError";
				}
			});
			return result;
		} else {
			thiz.ajax(config);
		}
	};
	/**
	 * 同步调用远程方法
	 * @param {} url: 服务名称
	 * @param {} ps: 服务参数数组
	 */
	this.callRS = function(url,ps){return thiz.RS({async:false,url:url,ps:ps,msg:false});};
	
	/**
	 * 异步调用远程方法
	 * @param {} config
	 */
	this.ajax = function(config) {RS.ajax(config);};
	
	/**
	 * 下载
	 * @param {} cfg
	 * 		url
	 * 		ps: 对应服务方法参数项[]
	 * 		filename: 下载文件显示名
	 */
	this.download = function(cfg){CU.download(cfg);};
	
	this.submit = function(config) {config.form.submit(config);};
	this.load = function(config) {config.form.load(config);};
	this.showMsg = function(obj) {
		if (obj == undefined || obj == null)
			obj = {};
		if (obj.title == undefined || obj.title == null)
			obj.title = "消息";
		if (obj.msg == undefined || obj.msg == null)
			obj.msg = "";
		if (obj.option == undefined || obj.option == null)
			obj.option = -1;
		if ((obj.icon == undefined || obj.icon == null) && obj.prompt !== true)
			obj.icon = Ext.MessageBox.INFO;
		if (obj.width == undefined || obj.width == null) {
			var msglength = obj.msg.length;
			if (msglength <= 10) {
				obj.width = 226;
			} else if (msglength >= 25) {
				obj.width = 386;
			} else {
				obj.width = 226 + (msglength - 10) * 10.67;
			}
		}
		obj.fn = obj.callback;
		if (obj.buttons == undefined || obj.buttons == null) {
			switch (obj.option) {
			case 0:
				obj.buttons = Ext.Msg.YESNO;
				break;
			case 1:
				obj.buttons = Ext.Msg.YESNOCANCEL;
				break;
			case 2:
				obj.buttons = Ext.Msg.OKCANCEL;
				break;
			default:
				obj.buttons = Ext.Msg.OK;
				break;
			}
		}
		Ext.Msg.show(obj);
	};
	this.parseTreeData = function(tree, data, icondir) {var root = (tree instanceof Ext.tree.TreePanel) ? tree.root : tree;if(CU.isEmpty(icondir)) icondir = ContextPath+"/framework/images/icons/16x18/";if(CU.isArray(data) && data.length>0) {var parents = [];for(var i=0; i<data.length; i++) {if(data[i].id == root.id) {root.setText(data[i].text);root.leaf = data[i].leaf;break;}}parents.push(root);var tps = null;for(var i=0; i<parents.length; i++) {for(var j=0; j<data.length; j++) {if(parents[i].id != data[j].parentid) continue ;data[j].leaf = CU.isEmpty(data[j].leaf) || data[j].leaf===1 || data[j].leaf==='1' || data[j].leaf==='true' || data[j].leaf===true;data[j].icon = CU.isEmpty(data[j].icon) ? undefined : icondir+data[j].icon;data[j].checked = !CU.isEmpty(data[j].checked) ? (data[j].checked===1 || data[j].checked==='1' || data[j].checked==='true' || data[j].checked===true) : undefined;var child = EF.getTreeNode(data[j]);parents[i].appendChild(child);if(data[j].leaf) continue ;if(tps === null) tps = [];tps.push(child);}if(i==parents.length-1 && tps!==null) {parents = tps;tps = null;i = -1;}}}};
	this.reloadAllNode = function(node, callback) {if(node.isLeaf() || node.leaf==1 || node.leaf=='true' || node.reload==undefined) return ;node.reload(function() {if(CU.isFunction(callback)) callback(node);var childnodes = node.childNodes;for(var i=0; i<childnodes.length; i++) {thiz.reloadAllNode(childnodes[i], callback);}});};
	this.expandAllNode = function(node,path){if(node.isLeaf()||node.leaf==1||node.leaf=='true')return;if(!CU.isEmpty(path)&&node.id!="00"&&path.indexOf(node.text)<0)return;var childs=node.childNodes;if(CU.isEmpty(childs)&&CU.isFunction(node.reload)) {node.reload(function() {var cs = node.childNodes;for(var i=0; i<cs.length; i++) {thiz.expandAllNode(cs[i],path);}});}else {node.expand();for(var i=0; i<childs.length; i++) {thiz.expandAllNode(childs[i],path);}}};
	this.setNodeChecked = function(node, checked) {if(node instanceof Ext.ux.PrettyTreeNode) {node.setChecked(checked);}else {node.getUI().toggleCheck(checked);}};
	this.isNodeChecked = function(node) {return (node instanceof Ext.ux.PrettyTreeNode) ? node.isChecked() : node.getUI().isChecked();};
	this.setNodesChecked = function(array, node) {thiz.setNodeChecked(node, false);for(var i=0;i<array.length;i++) {if(array[i]==node.id) {thiz.setNodeChecked(node,true);break;}}var childs=node.childNodes;if(CU.isArray(childs)&&childs.length>0){for(var i=0; i<childs.length; i++){thiz.setNodesChecked(array, childs[i]);}}};
	this.setAllChildsChecked = function(node, checked) {thiz.setNodeChecked(node, checked);var childs = node.childNodes;if(CU.isArray(childs) && childs.length>0) {for(var i=0; i<childs.length; i++) {thiz.setAllChildsChecked(childs[i], checked);}}};
	this.getCheckedNodes = function(array, node, onlyLeaf) {var childs = node.childNodes;if(!CU.isEmpty(childs) && childs.length>0) {if(!onlyLeaf) if(thiz.isNodeChecked(node)) array.push(node);for(var i=0; i<childs.length; i++) {thiz.getCheckedNodes(array, childs[i], onlyLeaf);}}else {if(thiz.isNodeChecked(node)) array.push(node);}return array;};
	this.getColumnIndex = function(cm, key) {var count = cm.getColumnCount();for(var i=0; i<count; i++) {if(cm.getDataIndex(i) == key) return i;}return -1;};
	this.scrollLast = function(panel) {panel.body.scroll("b",9999999,true);};
	this.setIconClass = function(panel, cls) {var old = panel.iconCls;panel.iconCls = cls;if(panel.rendered && panel.header){if(panel.frame){panel.header.addClass('x-panel-icon');panel.header.replaceClass(old, panel.iconCls);}else{var img = panel.header.child('.x-panel-inline-icon');if (img) {img.replaceClass(old, panel.iconCls);}else{var tool = panel.header.last('.x-tool');if (tool) {Ext.DomHelper.insertAfter(tool, {tag: 'img', src: Ext.BLANK_IMAGE_URL,cls: 'x-panel-inline-icon '+ panel.iconCls});} else {Ext.DomHelper.insertBefore(panel.header.dom.firstChild, {tag: 'img', src: Ext.BLANK_IMAGE_URL,cls: 'x-panel-inline-icon '+ panel.iconCls});}}}}};
	this.getGridBreakHeader = function(header, fontsize, columnsize) {if(header.indexOf("<div class=\"x-grid3-hd-checker\">") > -1) return header;var scount = parseInt(columnsize/fontsize,10);var slength = header.length/scount;var intslength = parseInt(slength, 10);if(slength > intslength) intslength = intslength+1;var newheader = "";for(var i=0; i<slength; i++) {newheader += header.substring(i*scount, (i+1)*scount);if(i < slength-1) newheader += "<br>";}return newheader;};
	this.breakGridCell = function(grid) {var el = grid.getEl();if(el==undefined || el==null) return;el.select("table[class=x-grid3-row-table]").each(function(x) {x.addClass('x-grid3-cell-text-visible');});};
	this.setGridColumnAlign = function(grid, align, col) {var cm = grid.getColumnModel();if(col==undefined || col==null) col = grid.view.hdCtxIndex;var column = cm.getColumnById(cm.getColumnId(col));if(column==undefined || column==null) return false;var oldalign = column.align;if(oldalign == align) return false;column.align = align;cm.setConfig(cm.config);return true;};
	
	this.executeQuery = function(store,params,cb,ecb) {
		if (store instanceof Ext.grid.GridPanel)store=store.store;
		store.load({
			params:{start:0},
			callback:function(records,options,success) {
				if (success){if(CU.isFunction(cb))cb(records, options);
				}else{
					if (CU.isFunction(ecb)) {
						var einfo = "";
						if (!CU.isEmpty(store.response)) {
							einfo = store.response.responseText;
							if (CU.isEmpty(einfo)) {
								einfo=store.response.raw;
							} else if (!CU.isEmpty(einfo)&&einfo.length>1) {
								einfo=CU.toObject(einfo);
							}
						}
						ecb(records, options, einfo);
					} else {
						thiz.showMsg({msg : "访问远程服务器失败!"});
					}
				}
			}
		});
	};
	
	
	this.clearAll = function(arr) {for(var i=0; i<arr.length; i++) {if(CU.isEmpty(arr[i])) continue ;if((arr[i] instanceof Ext.form.Radio) || (arr[i] instanceof Ext.form.Checkbox)) {arr[i].setValue(false);}else {arr[i].setValue("");}}};
	this.setAllVisible = function(arr, visible) {for(var i=0; i<arr.length; i++) {if(!CU.isEmpty(arr[i]) && CU.isFunction(arr[i].setVisible)) arr[i].setVisible(visible);}};
	this.setAllDisabled = function(arr, disable) {for(var i=0; i<arr.length; i++) {if(!CU.isEmpty(arr[i]) && CU.isFunction(arr[i].setDisabled)) arr[i].setDisabled(disable);}};
	this.showPopupMenu = function(menu, exw, exh, maxw, maxh, itemcount, mw, mh, e) {
		if (CU.isEmpty(mw)) mw = 120;
		if (CU.isEmpty(mh)) mh = 25;
		if (CU.isEmpty(itemcount)) itemcount = menu.items.items.length;
		mh = itemcount * mh;
		var ex = 0;
		var ey = 0;
		if(!CU.isEmpty(e) && CU.isFunction(e.getPageX)) {
			ex = e.getPageX();
			ey = e.getPageY();
		}else {
			ex = event.clientX;
			ey = event.clientY;
		}
		
		var x = ex - exw;
		var y = ey - exh;
		if (maxw - x < mw) ex = ex - mw;
		if (maxh - y < mh) ey = ey - mh;
		menu.showAt([ ex, ey ]);
	};
	this.refreshTabTip = function(tabpanel) {var tabs = tabpanel.items.items;if(tabpanel.rendered) {var dom = tabpanel.el.dom;var spans = dom.getElementsByTagName("SPAN");if(CU.isEmpty(spans)) return ;var tabbit = 0;for(var i=0; i<spans.length; i++) {if(!CU.isEmpty(spans[i].qtip)) {spans[i].qtip = tabs[tabbit].title;tabbit ++ ;}}}else {for(var i=0; i<tabs.length; i++) {tabs[i].tabTip = tabs[i].getTitle();}}};
	this.getStoreData = function(store, fields, fillNull) {var data = {};var count = store.getCount();for(var i=0; i<fields.length; i++) {data[fields[i]] = [];for(var j=0; j<count; j++) {var value = store.getAt(j).get(fields[i]);if(fillNull!==false && (value===undefined || value===null)) value = "";data[fields[i]].push(value);}}return data;};
	this.getStoreList = function(store, fields, fillNull) {var list=[];var c=store.getCount();for(var i=0; i<c; i++){var r = store.getAt(i);var row={};for(var j=0; j<fields.length; j++){var v = r.get(fields[j]);if(fillNull!==false&&(v===undefined||v===null))v="";row[fields[j]]=v;}list.push(row);}return list;};
	this.getStoreDataAt = function(store, field, fillNull) {var data = [];var count = store.getCount();for(var i=0; i<count; i++) {var value = store.getAt(i).get(field);if(fillNull!==false && (value===undefined || value===null)) value = "";data.push(value);}return data;};
	this.setCascadeParentChecked = function(node, checked) {var parent = node.parentNode;if(parent.id == "00") return ;if(parent instanceof Ext.ux.PrettyTreeNode) {parent.setChecked(checked);}else {parent.getUI().toggleCheck(checked);}thiz.setCascadeParentChecked(parent, checked);};
	this.getComponents = function(arr, p) {var items=p.items;if(items === undefined) {arr.push(p);}else {if(items===null || CU.isEmpty(items.items)) return ;for(var i=0; i<items.items.length; i++) {thiz.getComponents(arr, items.items[i]);}}};
	this.setAllValue = function(comparray, params) {
		for ( var i = 0; i < comparray.length; i++) {
			var hiddenName = comparray[i].hiddenName;
			var name = comparray[i].name;
			var havhiddename = false;
			if (!CU.isEmpty(hiddenName) && CU.isFunction(comparray[i].setValue)) {
				for ( var key in params) {
					if (key == hiddenName) {
						havhiddename = true;
						comparray[i].setValue(params[key]);
						break;
					}
				}
			}
			if (!CU.isEmpty(name)) {
				for ( var key in params) {
					if (key == name) {
						if (havhiddename) {
							if (!CU.isEmpty(comparray[i].el))
								comparray[i].el.dom.value = params[key];
						} else {
							if ((comparray[i] instanceof Ext.form.Radio)
									|| (comparray[i] instanceof Ext.form.Checkbox)) {
								comparray[i]
										.setValue(comparray[i].inputValue == params[key]);
							} else {
								if (CU.isFunction(comparray[i].setValue))
									comparray[i].setValue(params[key]);
							}
						}
						break;
					}
				}
			}
		}
	};
	this.getAllValue = function(arr) {
		var values = {};
		for ( var i = 0; i < arr.length; i++) {
			if (CU.isEmpty(arr[i]))
				continue;
			if ((arr[i] instanceof Ext.form.Radio)
					|| (arr[i] instanceof Ext.form.Checkbox)) {
				if (CU.isEmpty(arr[i].name) || CU.isEmpty(arr[i].inputValue))
					continue;
				if (arr[i].getValue() === true)
					values[arr[i].name] = arr[i].inputValue;
				else if (!CU.isEmpty(arr[i].uncheckValue))
					values[arr[i].name] = arr[i].uncheckValue;
			} else if ((arr[i] instanceof Ext.form.ComboBox)
					|| (!CU.isEmpty(Ext.ux.PrettySelectField) && arr[i] instanceof Ext.ux.PrettySelectField)) {
				if (!CU.isEmpty(arr[i].hiddenName))
					values[arr[i].hiddenName] = arr[i].getValue();
				if (!CU.isEmpty(arr[i].name) && !CU.isEmpty(arr[i].el))
					values[arr[i].name] = arr[i].el.dom.value;
			} else if (!CU.isEmpty(Ext.ux.PrettyListBox)
					&& arr[i] instanceof Ext.ux.PrettyListBox) {
				if (!CU.isEmpty(arr[i].hiddenName))
					values[arr[i].hiddenName] = arr[i].getValue();
				if (!CU.isEmpty(arr[i].name))
					values[arr[i].name] = arr[i].getText();
			} else if (arr[i] instanceof Ext.form.DateField) {
				if (!CU.isEmpty(arr[i].hiddenName))
					values[arr[i].hiddenName] = arr[i].getValue();
				if (!CU.isEmpty(arr[i].name) && !CU.isEmpty(arr[i].el))
					values[arr[i].name] = arr[i].el.dom.value;
			} else if (arr[i] instanceof Ext.form.NumberField) {
				if (!CU.isEmpty(arr[i].name)) {
					var number = arr[i].getValue();
					if (number == "")
						number = 0;
					values[arr[i].name] = number;
				}
			} else if (!CU.isEmpty(Ext.ux.PrettySelectField)
					&& arr[i] instanceof Ext.ux.PrettySelectField) {
				var value = arr[i].getValue();
				var hv = "";
				var dv = "";
				if (CU.isObject(value)) {
					hv = value.codeid;
					dv = value.codename;
				} else {
					hv = dv = value;
				}
				if (!CU.isEmpty(arr[i].hiddenName))
					values[arr[i].hiddenName] = hv;
				if (!CU.isEmpty(arr[i].name))
					values[arr[i].name] = dv;
			} else {
				if (!CU.isEmpty(arr[i].name))
					values[arr[i].name] = arr[i].getValue();
			}
		}
		return values;
	};
	this.setRecordValue = function(record, object, fields, filterNull) {if(!CU.isArray(fields) || fields.length==0) {fields = [];for(var key in object) {fields.push(key);}}for(var i=0; i<fields.length; i++) {var value = object[fields[i]];if(filterNull!==false && (value===null||value===undefined)) value = "";record.set(fields[i], value);}};
	this.getRecordValue = function(record, fields, filterNull) {if(!CU.isArray(fields) || fields.length==0) {var data = record.data;fields = [];for(var key in data) {fields.push(key);}}var object = {};for(var i=0; i<fields.length; i++) {var value = record.get(fields[i]);if(filterNull!==false && (value===null||value===undefined)) value = "";object[fields[i]] = value;}return object;};
	this.getFieldUnitStyle = function(unit) {var length = CU.isObject(unit) ? unit.unitstring.length : unit.length;var width = CU.isEmpty(unit.unitwidth) ? (CU.isEmpty(unit.unitfontsize) ? 13 : unit.unitfontsize)*length+2 : unit.unitwidth;return "background: #ffffff url("+thiz.getUnitBgWordImageLink(unit)+") no-repeat right;padding-right:"+width+"px;";};
	this.createUnitSpace = function(field,ct) {var width = field.getWidth();if(!CU.isEmpty(field.anchor)) field.anchor = undefined;ct.createChild({tag:"span",html:(field.addunitspace!==false?"&nbsp;":"")+field.unittext});var unitwidth = CU.isEmpty(field.unitwidth) ? field.unittext.length*12+4 : field.unitwidth;field.setWidth(width - unitwidth);};
	this.reloadParentNode = function(pn, currid, callback) {
		if (CU.isFunction(pn.reload)) {
			pn.reload(function(n) {
				var cs = n.childNodes;
				if (CU.isEmpty(cs)) {
					if (CU.isFunction(callback))
						callback(pn);
					return;
				}
				var cn = null;
				for ( var i = 0; i < cs.length; i++) {
					if (cs[i].id == currid) {
						cn = cs[i];
						cn.select();
						break;
					}
				}
				if (CU.isFunction(callback))
					callback(pn, cn);
			});
		} else {
			pn.parentNode.reload(function(n) {
				var cs = n.childNodes;
				if (CU.isEmpty(cs)) {
					if (CU.isFunction(callback))
						callback();
					return;
				}
				var npn = null;
				for ( var i = 0; i < cs.length; i++) {
					if (cs[i].id == pn.id) {
						npn = cs[i];
						break;
					}
				}
				if (npn == null) {
					if (CU.isFunction(callback))
						callback();
				} else {
					if (CU.isFunction(npn.reload)) {
						thiz.reloadParentNode(npn, currid, callback);
					} else {
						if (CU.isFunction(callback))
							callback(npn);
					}
				}
			});
		}
	};
	this.getAllParents = function(node, array, addroot, rootid, addown) {if(array==undefined||array==null)array=[];if(CU.isEmpty(rootid))rootid="00";if(addown) array.push(node);if(node.parentNode.id==rootid){if(addroot===true)array.push(node.parentNode);return array;}else{return thiz.getAllParents(node.parentNode, array, addroot, rootid, true);}};
}

var EU = new ExtUtils();






