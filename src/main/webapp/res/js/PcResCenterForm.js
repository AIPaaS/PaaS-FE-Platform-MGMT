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
	RS.ajax({url:"/res/datac/getDataCenterCodeList",ps:{addEmpty:true, addAttr:true ,status:1},cb:function(result) {
		DROP["DV_DATA_CENTER_CODE"] = result;
		var selhtml = PU.getSelectOptionsHtml("DV_DATA_CENTER_CODE");
		$("#dataCenterId").html(selhtml);
		
		RS.ajax({url:"/res/imgresp/getImageRespDropList",ps:{addEmpty:true, addAttr:true, imgRespType:0},cb:function(result) {
			DROP["DV_IMAGE_RESP_CODE"] = result;
			var selimgresphtml = PU.getSelectOptionsHtml("DV_IMAGE_RESP_CODE");
			$("#imgRespId").html(selimgresphtml);
			if(CU.isFunction(cb))cb();
		}});
	}});
}

/** 初始化组件 **/
function initComponent() {
	
}

/** 对组件设置监听 **/
function initListener() {
	var envTypeselhtml = PU.getSelectOptionsHtml("V_RES_CENTER_ENV_TYPE");
	$("#envType").html(envTypeselhtml);
	
	$("#form_resCenter").submit(function(e){
	    e.preventDefault();
	    submitForm();
	});
	RS.setAjaxLodingButton("btn_submit");
}

/** 初始化界面 **/
function initFace() {
	
}
function queryInfo(){
	RS.ajax({url:"/res/resc/queryById",ps:{id:CurrentId},cb:function(result) {
		PU.setFormData(result, "form_resCenter");
	}});
}

/**提交表单**/
function submitForm(){
	var bean = PU.getFormData("form_resCenter");
	RS.ajax({url:"/res/resc/isExistResCode",ps:{resCode:bean.resCode},cb:function(r) {
		if(r && CurrentId==null){
			CC.showMsg({msg:"资源中心代码已存在!"});
			return;
		}else{
			if(!CU.isEmpty(CurrentId)) bean.id = CurrentId;
			RS.ajax({url:"/res/resc/saveOrUpdate",ps:bean,cb:function(r) {
				var url = ContextPath+"/dispatch/mc/0203";
				if(!CU.isEmpty(CurrentPageNum)) url += "?pageNum="+CurrentPageNum;
				window.location = url;
			}});
			
		}
	}});
	
	

}



