

/**
 * @param {} config
 * 		tabPosition : tab所在位置,left\right  缺省为:left
 * 		items: Array子项
 * 
 * 事件:以下事件由方法 addEvent(eventKey, callback) 来添加
 * 		beforeheadrender: beforeheadrender(tabs, this);
 * 		afterheadrender: afterheadrender(tabs, this);
 * 		beforetabrender: beforetabrender(tab, this);
 * 		tabrender: tabrender(tab);
 * 		aftertabrender: aftertabrender(tab);
 * 		beforetabchange: beforetabchange(oldtab,newtab,this) 返回false则停止激活新的tab
 * 		tabchange: tabchange(oldtab,newtab,this)
 * 		beforeaddtab: beforeaddtab(tab,this) 返回false则停止添加
 * 		afteraddtab: afteraddtab(tab,this)
 * 		beforeremovetab: beforeremovetab(tab, this); 返回false则停止删除
 * 		afterremovetab: afterremovetab(tab, this);
 */
Ext.ux.PrettyTabCardPanel = function(config) {
	var thiz = this;
	this.currentTab = null;
	this.cards = {};
	if(!CU.isEmpty(config.items)) {
		for(var i=0; i<config.items.length; i++) {
			var key = config.items[i]["key"];
			var obj = config.items[i]["card"];
			if(!CU.isEmpty(key)&&CU.isFunction(obj))thiz.cards[key]=new obj(config);
		}
	}
	var renderedids = [];
	var beforeheadrenders = [];
	var afterheadrenders = [];
	var beforetabrenders = [];
	var tabrenders = [];
	var aftertabrenders = [];
	var beforetabchanges = [];
	var tabchanges = [];
	var beforeaddtabs = [];
	var afteraddtabs = [];
	var beforeremovetabs = [];
	var afterremovetabs = [];
	if(CU.isEmpty(config)) config = {};
	config.layout = "border";
	var tableft = config.tabPosition !== "right";
	var tabreg = tableft ? "west" : "east";
	var headimg = tableft ? "tab_left_bg.gif" : "tab_right_bg.gif";
	var tabheadid = "tabcard_head_id_"+CU.getId();
	var tabHeadHtml = "<table id='"+tabheadid+"' width='100%' height='100%' border='0' cellpadding='0' cellspacing='0' style='font-size:12px;font-family:sans-serif;background:url("+ContextPath+"/framework/images/cardtab/"+headimg+")'><tr><td>&nbsp;</td></tr></table>";
	this.temptabitems = CU.isEmpty(config.items) ? [] : config.items;
	this.tabitems = [];
	this.tabHead = EF.getPanel({border:false,layout:"fit",region:tabreg,width:28,html:tabHeadHtml});
	this.center = EF.getPanel({border:false,layout:"fit",region:"center"});
	delete config.tabPosition;
	delete config.items;
	config.items = [thiz.tabHead,thiz.center];
	Ext.ux.PrettyTabCardPanel.superclass.constructor.apply(this, arguments);
	this.tabHead.on("afterrender", function() {
		if(beforeheadrenders.length > 0) {
			for(var i=0; i<beforeheadrenders.length; i++) {
				if(CU.isFunction(beforeheadrenders[i])) beforeheadrenders[i](thiz.temptabitems, this);
			}
		}
		if(!CU.isEmpty(thiz.temptabitems)) {
			for(var i=0; i<thiz.temptabitems.length; i++) {
				if(!CU.isEmpty(thiz.temptabitems[i])) thiz.addTab(thiz.temptabitems[i], true);
			}
			delete thiz.temptabitems;
		}
		if(afterheadrenders.length > 0) {
			for(var i=0; i<afterheadrenders.length; i++) {
				if(CU.isFunction(afterheadrenders[i])) afterheadrenders[i](thiz.tabitems, thiz);
			}
		}
	});
	/**
	 * 添加tab, 注意：此方法只有再tabHead被渲染之后调用才有效
	 * @return: 返回新添加的tab
	 */
	this.addTab = function(tab) {
		if(CU.isEmpty(tab)) return ;
		var headtable = document.getElementById(tabheadid);
		if(CU.isEmpty(headtable)) return ;		
		if(CU.isEmpty(tab.id)) tab.id = "cardtabid_"+CU.getId();
		if(beforeaddtabs.length > 0) {
			for(var i=0; i<beforeaddtabs.length; i++) {
				if(CU.isFunction(beforeaddtabs[i]) && beforeaddtabs[i](tab, thiz)===false) return;
			}
		}
		var title = tab.title;
		var wordlength = tab.wordlength;
		delete tab.title;
		if(CU.isEmpty(wordlength)) {
			wordlength = 2;
			if(CU.isEmpty(title)) {
				title = "&nbsp;";
			}else if(title.length > 8) {
				title = title.substring(0,8);
				wordlength = 8;
			}else {
				wordlength = title.length;
			}
		}
		var css = "tab_"+(tableft?"left":"right")+"_dark_"+wordlength;
		var row = headtable.insertRow(headtable.rows.length-1);
		row.id = "tabcardheadtrid_"+tab.id;
		var cell = row.insertCell();
		cell.id = "tabcardheadtdid_"+tab.id;
		cell.innerHTML = title;
		cell.className = css;
		cell.onclick = function() {thiz.activeAt(this.id.substring(this.id.indexOf("_")+1));}
		thiz.tabitems.push(tab);
		if(afteraddtabs.length > 0) {
			for(var i=0; i<afteraddtabs.length; i++) {
				if(CU.isFunction(afteraddtabs[i])) afteraddtabs[i](tab, thiz);
			}
		}
	};
	/**
	 * 删除指定tab
	 * @param tab: String\Number\Panel
	 * @return 返回被删除的tab
	 */
	this.removeTab = function(tab) {
		if(CU.isEmpty(tab)) return ;
		if(typeof(tab)!=="string" && typeof(tab)!=="number") tab = tab.id;
		var findtab = thiz.getTab(tab);
		if(CU.isEmpty(findtab)) return ;
		if(beforeremovetabs.length > 0) {
			for(var i=0; i<beforeremovetabs.length; i++) {
				if(CU.isFunction(beforeremovetabs[i]) && beforeremovetabs[i](findtab, thiz)==false) return ;
			}
		}
		if(thiz.currentTab.id === findtab.id) thiz.currentTab = null;
		var headtable = document.getElementById(tabheadid);
		headtable.deleteRow(thiz.getTabIndex(findtab.id));
		if(thiz.isRenderd(findtab.id)) findtab.destroy();
		thiz.tabitems.remove(findtab);
		if(afterremovetabs.length > 0) {
			for(var i=0; i<afterremovetabs.length; i++) {
				if(CU.isFunction(afterremovetabs[i])) afterremovetabs[i](findtab, thiz);
			}
		}
		return findtab;
	};
	/**
	 * 判断tab是否被渲染, 如果找不到panel则返回false
	 * @param tab: String\Number\Panel
	 */
	this.isRenderd = function(tab) {
		var tabid = "";
		if(typeof(tab) == "number") {
			var findtab = thiz.getTab(tab);
			if(CU.isEmpty(findtab)) return false;
			tabid = findtab.id;
		}else if(typeof(tab) == "string") {
			tabid = tab;
		}else {
			tabid = tab.id;
		}
		return renderedids.indexOf(tabid) > -1;
	};
	/**
	 * 清除当前被激活面版
	 */
	this.clearActive = function() {
		if(CU.isEmpty(thiz.currentTab)) return ;
		thiz.currentTab.hide();
		var td = document.getElementById("tabcardheadtdid_"+thiz.currentTab.id);
		if(CU.isEmpty(td)) return ;
		var css = td.className;
		if(css.indexOf("light") > 0) {
			css = css.substring(0,css.indexOf("light"))+"dark"+css.substring(css.indexOf("light")+5);
			td.className = css;
		}
	};
	/**
	 * 获取指定tab, 返回找到的tab
	 * @param tab: String\Number
	 */
	this.getTab = function(tab) {
		if(CU.isEmpty(tab) || CU.isEmpty(thiz.tabitems)) return ;
		if(typeof(tab) == "number") {
			return thiz.tabitems[tab];
		}else {
			for(var i=0; i<thiz.tabitems.length; i++) {
				if(thiz.tabitems[i].id == tab) return thiz.tabitems[i];
			}
		}
	};
	/**
	 * 获取tab在Head中的位置,没找到则返回-1
	 * @param tab: String\Panel
	 */
	this.getTabIndex = function(tab) {
		var id = tab;
		if(typeof(tab) != "string") id = tab.id;
		for(var i=0; i<thiz.tabitems.length; i++) {
			if(id == thiz.tabitems[i].id) return i;
		}
		return -1;
	};
	/**
	 * 获取当前tab总个数
	 */
	this.getTabCount = function() {
		return thiz.tabitems.length;
	};
	/**
	 * 获取当前
	 */
	this.getTabAt = function(index) {
		return thiz.tabitems[index];
	};
	/**
	 * 获取所有的tab
	 */
	this.getTabs = function() {
		return thiz.tabitems;
	};
	/**
	 * 激话指定tab, 如果指定的tab没的找到则停止激活
	 * @param tab: String\Number\Panel
	 */
	this.activeAt = function(tab) {
		if(CU.isEmpty(thiz.tabitems)) return ;
		var activetab = tab;
		if(typeof(tab)=="string" || typeof(tab)=="number") {
			activetab = thiz.getTab(tab);
			if(CU.isEmpty(activetab)) return ;
		}
		if(!CU.isEmpty(thiz.currentTab) && thiz.currentTab.id==activetab.id) return ;
		var oldtab = thiz.currentTab;
		if(beforetabchanges.length > 0) {
			for(var i=0; i<beforetabchanges.length; i++) {
				if(CU.isFunction(beforetabchanges[i]) && beforetabchanges[i](oldtab,activetab,thiz)==false) return ;
			}
		}
		this.clearActive();
		thiz.currentTab = activetab;
		var td = document.getElementById("tabcardheadtdid_"+thiz.currentTab.id);
		if(CU.isEmpty(td)) return ;
		var css = td.className;
		if(css.indexOf("dark") > 0) {
			css = css.substring(0,css.indexOf("dark"))+"light"+css.substring(css.indexOf("dark")+4);
			td.className = css;
		}
		if(thiz.isRenderd(thiz.currentTab.id)) {
			thiz.currentTab.show();
		}else {
			var key = thiz.currentTab.key;
			var id = thiz.currentTab.id;
			if(CU.isEmpty(thiz.cards[key])&&!CU.isEmpty(thiz.currentTab["card"]))thiz.cards[key]=thiz.currentTab["card"];
			var obj = thiz.cards[key];
			if(!CU.isEmpty(obj)) {
				obj.init();
				thiz.currentTab = obj.getBasePanel();
				thiz.currentTab.id = id;
				thiz.currentTab.key = key;
			}
			if(beforetabrenders.length > 0) {
				for(var i=0; i<beforetabrenders.length; i++) {
					if(CU.isFunction(beforetabrenders[i])) beforetabrenders[i](thiz.currentTab, thiz);
				}
			}
			if(!(thiz.currentTab instanceof Ext.Panel)) thiz.currentTab = EF.getPanel(thiz.currentTab);
			if(!(thiz.tabitems[thiz.getTabIndex(thiz.currentTab.id)] instanceof Ext.Panel)) thiz.tabitems[thiz.getTabIndex(thiz.currentTab.id)] = thiz.currentTab;
			if(tabrenders.length > 0) {
				for(var i=0; i<tabrenders.length; i++) {
					if(CU.isFunction(tabrenders[i])) thiz.currentTab.on("render",tabrenders[i]);
				}
			}
			if(aftertabrenders.length > 0) {
				for(var i=0; i<aftertabrenders.length; i++) {
					if(CU.isFunction(aftertabrenders[i])) thiz.currentTab.on("afterrender",aftertabrenders[i]);
				}
			}
			thiz.center.add(thiz.currentTab);
			thiz.currentTab.show();
			thiz.center.doLayout();
			renderedids.push(thiz.currentTab.id);
		}
		if(tabchanges.length > 0) {
			for(var i=0; i<tabchanges.length; i++) {
				if(CU.isFunction(tabchanges[i])) tabchanges[i](oldtab,thiz.currentTab,thiz);
			}
		}
	};
	/**
	 * 获取当前被激活tab，如没一个被激话则返回null
	 */
	this.getActiveTab = function() {
		return thiz.currentTab;
	};
	/**
	 * 注册监听
	 */
	this.addEvent = function(eventKey, callback) {
		if(CU.isEmpty(eventKey) || !CU.isFunction(callback)) return ;
		if(eventKey === "afterheadrender") {
			afterheadrenders.push(callback);
		}else if(eventKey === "tabrender") {
			tabrenders.push(callback);
		}else if(eventKey === "beforetabchange") {
			beforetabchanges.push(callback);
		}else if(eventKey === "tabchange") {
			tabchanges.push(callback);
		}else if(eventKey === "aftertabrender") {
			aftertabrenders.push(callback);
		}else if(eventKey === "beforeheadrender") {
			beforeheadrenders.push(callback);
		}else if(eventKey === "beforeaddtab") {
			beforeaddtabs.push(callback);
		}else if(eventKey === "afteraddtab") {
			afteraddtabs.push(callback);
		}else if(eventKey === "beforeremovetab") {
			beforeremovetabs.push(callback);
		}else if(eventKey === "afterremovetab") {
			afterremovetabs.push(callback);
		}else if(eventKey === "beforetabrender") {
			beforetabrenders.push(callback);
		}
	};
	this.getCard = function(key) {
		return thiz.cards[key];
	};
}
Ext.extend(Ext.ux.PrettyTabCardPanel, Ext.Panel, {
});

