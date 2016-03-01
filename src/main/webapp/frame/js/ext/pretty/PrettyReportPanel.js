
/**
 * extends: Ext.Panel
 * @param {} config
 * 		service: 生成报表的service, 缺省为当前service
 * 		method: 生成报表的method
 * 		params: 携带参数
 * 		autoload: 是否一初始化就加载, 缺省为true
 */
Ext.ux.PrettyReportPanel = function(cfg) {
	var thiz = this;
	if(CU.isEmpty(cfg)) cfg = {};
	this.iframeid = CU.isEmpty(cfg.id)?"SmartReportPanel_IFId_"+CU.getId():cfg.id;
	this.service = CU.isEmpty(cfg.service) ? dynamicService : cfg.service;
	this.method = cfg.method;
	this.params = cfg.params;
	cfg.html = "<iframe id='"+thiz.iframeid+"' width='100%' height='100%' frameborder='0' src=''/>";
	Ext.ux.PrettyReportPanel.superclass.constructor.apply(this, arguments);
	this.on("afterrender", function(){if(cfg.autoload!==false)thiz.repaint();});
    this.setParams = function(params){thiz.params = params;};
    this.repaint = function(params) {
    	if(params != undefined) thiz.params = params;
    	var iframe = document.getElementById(thiz.iframeid);
    	iframe.reportparams = "";
    	if(!CU.isEmpty(thiz.params)) {
    		iframe.reportparams = CU.toString(CU.isArray(thiz.params)?thiz.params:[thiz.params]);
    	}
    	var width = thiz.getInnerWidth();
    	var height = thiz.getInnerHeight();
    	if(thiz.border) {width -= 2;height -= 2;}
    	var url = ContextPath+"/framework/jsp/ReportIFrame.jsp?service="+thiz.service+"&method="+thiz.method+"&iframeid="+thiz.iframeid+"&width="+width+"&height="+height;
    	document.getElementById(thiz.iframeid).src = url+"&date="+new Date().getTime();
    };
};
Ext.extend(Ext.ux.PrettyReportPanel, Ext.Panel, {
	layout:"fit",
	border:false
});

