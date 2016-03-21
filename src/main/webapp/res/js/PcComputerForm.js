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
	
	RS.ajax({url:"/res/computer/getComputerRegionDropListMap",ps:{addEmpty:true, addAttr:true,status:1},cb:function(result) {
		DROP["DV_COMP_ROOM_CODE"] = result["room"];
		DROP["DV_DATA_CENTER_CODE"] = result["dc"];
		DROP["DV_RES_CENTER_CODE"] = result["rc"];
		DROP["DV_NET_ZONE_CODE"] = result["nc"];
		
		var roomselhtml = PU.getSelectOptionsHtml("DV_COMP_ROOM_CODE");
		$("#roomId").html(roomselhtml);
		
		var dcselhtml = PU.getSelectOptionsHtml("DV_DATA_CENTER_CODE");
		$("#dataCenterId").html(dcselhtml);
		
		if(CU.isFunction(cb)) cb();
	}});
}

/** 初始化组件 **/
function initComponent() {
	
}

/** 对组件设置监听 **/
function initListener() {
	$("#dataCenterId").bind("change",function() {
		$("#resCenterId").html("");
		$("#netZoneId").html("");
		var dcId = $("#dataCenterId").val();
		fillResDropList(dcId);
	});
	$("#resCenterId").bind("change",function() {
		$("#netZoneId").html("");
		var rcId = $("#resCenterId").val();
		fillNetZoneDropList(rcId);
	});
	$("#form_computer").submit(function(e){
	    e.preventDefault();
	    submitForm();
	});
	RS.setAjaxLodingButton("btn_submit");
}

/** 初始化界面 **/
function initFace() {
	
}



function fillResDropList(dcId) {
	if(!CU.isEmpty(dcId)) {
		var rs = DROP["DV_RES_CENTER_CODE"];
		var ls = [rs[0]];
		for(var i=1; i<rs.length; i++) {
			if(rs[i].attributes.dataCenterId == dcId) {
				ls.push(rs[i]);
			}
		}
		$("#resCenterId").html(getSelOpHtml(ls));
	}
}
function fillNetZoneDropList(rcId) {
	if(!CU.isEmpty(rcId)) {
		var rs = DROP["DV_NET_ZONE_CODE"];
		var ls = [rs[0]];
		for(var i=1; i<rs.length; i++) {
			if(rs[i].attributes.resCenterId == rcId) {
				ls.push(rs[i]);
			}
		}
		$("#netZoneId").html(getSelOpHtml(ls));
	}
}


function getSelOpHtml(ls) {
	var html = [];
	if(!CU.isEmpty(ls)) {
		for(var i=0; i<ls.length; i++) {
			html.push("<option value=\""+ls[i].code+"\">"+ls[i].name+"</option>");
		}
	}
	return html.join("");
};



function queryInfo(){
	RS.ajax({url:"/res/computer/queryById",ps:{id:CurrentId},cb:function(rs) {
		if(!CU.isEmpty(rs.cpuCount)) rs.cpuCount = rs.cpuCount/100;
		if(!CU.isEmpty(rs.cpuOffer)) rs.cpuOffer = rs.cpuOffer/100;
		if(!CU.isEmpty(rs.memSize)) rs.memSize = rs.memSize/1024;
		if(!CU.isEmpty(rs.diskSize)) rs.diskSize = rs.diskSize/1024;
		if(!CU.isEmpty(rs.memOffer)) rs.memOffer = rs.memOffer/1024;
		
		if(!CU.isEmpty(rs.dataCenterId)) {
			fillResDropList(rs.dataCenterId);
		}
		if(!CU.isEmpty(rs.resCenterId)) {
			fillNetZoneDropList(rs.resCenterId);
			$("#resCenterId").val(rs.resCenterId);
			if(!CU.isEmpty(rs.netZoneId)) {
				$("#netZoneId").val(rs.netZoneId);
			}
		}
		
		PU.setFormData(rs, "form_computer");
	}});
}

/**提交表单**/
function submitForm(){
	var bean = PU.getFormData("form_computer");
	if(bean.cuptotal-bean.cpuoffer<1||bean.cpuoffer<=0){
		CC.showMsg({msg:"可用于集群的cpu核数填写错误！"});
		return ;
	}
	if(bean.memtotal-bean.memOffer<1||bean.memOffer<=0){
		CC.showMsg({msg:"可用于集群的内存填写错误！"});
		return ;
	}
	bean.cpuCount = parseInt(bean.cpuCount,10)*100;
	bean.cpuOffer = parseInt(bean.cpuOffer,10)*100;
	bean.memSize = parseInt(bean.memSize,10)*1024;
	bean.memOffer = parseInt(bean.memOffer,10)*1024;
	bean.diskSize = parseInt(bean.diskSize,10)*1024;
	if(!CU.isEmpty(CurrentId)) bean.id = CurrentId;
	
	
	
	
	RS.ajax({url:"/res/computer/isExistCompterCode",ps:bean,cb:function(r) {
		if(r && CurrentId==null){
			CC.showMsg({msg:"服务器编号已存在!"});
			return;
		}else {
			RS.ajax({url:"/res/computer/isExistInSlavePart",ps:bean,cb:function(r) {
				if(r){
					CC.showMsg({msg:"该主机ip已经在服务域中存在!"});
					return;
				}else {
					RS.ajax({url:"/res/computer/saveOrUpdate",ps:bean,cb:function(r) {
						CurrentId = r;
						var url = ContextPath+"/dispatch/mc/0205";
						if(!CU.isEmpty(CurrentPageNum)) url += "?pageNum="+CurrentPageNum;
						window.location = url;
					}});
				}
			}});
			
			
		}
	
	}});
	
	
}



