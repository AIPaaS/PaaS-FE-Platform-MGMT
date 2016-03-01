var CurrentId = "";
var CurrentPageNum = 1;
/** 初始化 **/
function init() {
	
	initData(function() {
		initComponent();
		initListener();
		initFace();
		if(!CU.isEmpty(CurrentId)) {
			queryInfo();
		}
	});
}

/** 初始化页面、内存等基本数据 **/
function initData(cb) {
	CurrentId = PRQ.get("id");
	CurrentPageNum = PRQ.get("pageNum");
	if(CU.isEmpty(CurrentPageNum)) CurrentPageNum = 1;
	RS.ajax({url:"/res/computer/getComputerRegionDropListMap",ps:{addEmpty:true, addAttr:true ,opts:"dc|rc"},cb:function(result) {
		DROP["DV_DATA_CENTER_CODE"] = result["dc"];
		DROP["DV_RES_CENTER_CODE"] = result["rc"];
		var dcselhtml = PU.getSelectOptionsHtml("DV_DATA_CENTER_CODE");
		$("#sel_dataCenter").html(dcselhtml);
		if(CU.isFunction(cb)) cb();
	}});
}

/** 初始化组件 **/
function initComponent() {
	
}

/** 对组件设置监听 **/
function initListener() {
	$("#sel_dataCenter").bind("change",function() {
		var dcId = $("#sel_dataCenter").val();
		reloadResCenterId(dcId);
	});
	$("#form_netZone").submit(function(e){
	    e.preventDefault();
	    submitForm();
	});
	RS.setAjaxLodingButton("btn_submit");
}

/** 初始化界面 **/
function initFace() {
	
}
function reloadResCenterId(dcId,cb){
	$("#sel_resCenter").html("");
	if(!CU.isEmpty(dcId)) {
		var rs = DROP["DV_RES_CENTER_CODE"];
		var ls = [rs[0]];
		for(var i=1; i<rs.length; i++) {
			if(rs[i].attributes.dataCenterId == dcId) {
				ls.push(rs[i]);
			}
		}
		$("#sel_resCenter").html(getSelOpHtml(ls));
		if(CU.isFunction(cb)) cb();
	}
}

function getSelOpHtml(ls){
	var html = [];
	if(!CU.isEmpty(ls)){
		for(var i=0;i<ls.length;i++){
			html.push("<option value=\""+ls[i].code+"\">"+ls[i].name+"</option>");
		}
	}
	return html.join("");
}

function queryInfo(){
	RS.ajax({url:"/res/netzone/queryById",ps:{id:CurrentId},cb:function(result) {
		var status = result.status;
		if(status){
			$("#status").prop("checked",true);
		}else{
			$("#status").prop("checked",false);
		}
		var dataCenterId = result.dataCenterId;
		$("#sel_dataCenter").val(result.dataCenterId);
		reloadResCenterId(dataCenterId,function(){
			$("#sel_resCenter").val(result.resCenterId);
		});
		$("#zoneCode").val(result.zoneCode);
		$("#zoneName").val(result.zoneName);
		$("#netSegDesc").val(result.netSegDesc);
		$("#netSegExp").val(result.netSegExp);
		
	}});
}

/**提交表单**/
function submitForm(){
	var dataCenterId = $("#sel_dataCenter").val();
	var resCenterId = $("#sel_resCenter").val();
	var zoneCode = $("#zoneCode").val();
	var zoneName = $("#zoneName").val();
	var netSegDesc = $("#netSegDesc").val();
	var netSegExp = $("#netSegExp").val();
	var status = 1;
	var isChecked = $("#status").prop("checked");
	if(!isChecked) status = 0;
	var record = {id:CurrentId,dataCenterId:dataCenterId,resCenterId:resCenterId,zoneCode:zoneCode,zoneName:zoneName,netSegDesc:netSegDesc,netSegExp:netSegExp,status:status};
	RS.ajax({url:"/res/netzone/saveOrUpdate",ps:record,cb:function(r) {
		var url = ContextPath+"/dispatch/mc/0204";
		if(!CU.isEmpty(CurrentPageNum)) url += "?pageNum="+CurrentPageNum;
		window.location = url;
	}});
}



