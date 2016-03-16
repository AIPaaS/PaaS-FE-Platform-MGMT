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
	
	RS.ajax({url:"/res/comproom/getCompRoomDropList",ps:{addEmpty:true, addAttr:true},cb:function(rs) {
		DROP["DV_COMP_ROOM_CODE"] = rs;
		var selhtml = PU.getSelectOptionsHtml("DV_COMP_ROOM_CODE");
		$("#roomId").html(selhtml);
		if(CU.isFunction(cb))cb();
	}});
}

/** 初始化组件 **/
function initComponent() {

	
}

/** 对组件设置监听 **/
function initListener() {
	$("#roomId").bind("change",verifyRoomHasSnapshoot);
	$("#form_imageResp").submit(function(e){
	    e.preventDefault();
	    submitForm();
	});
	RS.setAjaxLodingButton("btn_submit");
}

/** 初始化界面 **/
function initFace() {
	
}
function queryInfo(){
	RS.ajax({url:"/res/imgresp/queryById",ps:{id:CurrentId},cb:function(rs) {
		PU.setFormData(rs, "form_imageResp");
		verifyRoomHasSnapshoot();
	}});
}



function verifyRoomHasSnapshoot() {
	$("#imgRespType").prop("disabled", false);
	
	var cdt = {};
	cdt.roomId = $("#roomId").val();
	if(CU.isEmpty(cdt.roomId)) return ;
	
	if(!CU.isEmpty(CurrentId))	cdt.imgRespId = CurrentId;
	RS.ajax({url:"/res/imgresp/verifyRoomHasSnapshoot", ps:cdt, cb:function(rs) {
		$("#imgRespType").prop("disabled",!rs);
		if(!rs) $("#imgRespType").prop("checked", false);
	}});
}



/**提交表单**/
function submitForm(){
	var bean = PU.getFormData("form_imageResp");
	RS.ajax({url:"/res/imgresp/isExistImageCode",ps:{imgRespCode : bean.imgRespCode},cb:function(r) {
		if(r && CurrentId==null){
			CC.showMsg({msg:"镜像库代码已存在!"});
			return;
		}else{
			
			if(!CU.isEmpty(CurrentId)) bean.id = CurrentId;
			RS.ajax({url:"/res/imgresp/saveOrUpdate",ps:bean,cb:function(r) {
				var url = ContextPath+"/dispatch/mc/0401";
				if(!CU.isEmpty(CurrentPageNum)) url += "?pageNum="+CurrentPageNum;
				window.location = url;
			}});
		}
	}});
	
}



