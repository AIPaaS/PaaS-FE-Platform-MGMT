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
	if(CU.isFunction(cb))cb();
}

/** 初始化组件 **/
function initComponent() {

	
}

/** 对组件设置监听 **/
function initListener() {
	$("#form_computerRoom").submit(function(e){
	    e.preventDefault();
	    submitForm();
	});
	RS.setAjaxLodingButton("btn_submit");
}

/** 初始化界面 **/
function initFace() {
	
}
function queryInfo(){
	RS.ajax({url:"/res/comproom/queryById",ps:{id:CurrentId},cb:function(result) {
		var status = result.status;
		if(status){
			$("#status").prop("checked",true);
		}else{
			$("#status").prop("checked",false);
		}
		$("#roomCode").val(result.roomCode);
		$("#roomName").val(result.roomName);
		$("#roomAddr").val(result.roomAddr);
		$("#contactName").val(result.contactName);
		$("#contactPhone").val(result.contactPhone);
		$("#contactPhone2").val(result.contactPhone2);
		$("#contactEmail").val(result.contactEmail);
		$("#remark").val(result.remark);
		
	}});
}

/**提交表单**/
function submitForm(){
	var roomCode = $("#roomCode").val();
	var roomName = $("#roomName").val();
	var roomAddr = $("#roomAddr").val();
	var contactName = $("#contactName").val();
	var contactPhone = $("#contactPhone").val();
	var contactPhone2 = $("#contactPhone2").val();
	var contactEmail = $("#contactEmail").val();
	var remark = $("#remark").val();
	var status = 1;
	var isChecked = $("#status").prop("checked");
	if(!isChecked) status = 0;
	RS.ajax({url:"/res/comproom/isExistRoomCode",ps:{roomCode:roomCode},cb:function(r) {
		if(r && CurrentId==null){
			CC.showMsg({msg:"机房编号已存在!"});
			return;
		}else{
			var record = {id:CurrentId,roomCode:roomCode,roomName:roomName,roomAddr:roomAddr,contactName:contactName,contactPhone:contactPhone,contactPhone2:contactPhone2,contactEmail:contactEmail,remark:remark,status:status};
			RS.ajax({url:"/res/comproom/saveOrUpdate",ps:record,cb:function(r) {
				var url = ContextPath+"/dispatch/mc/0201";
				if(!CU.isEmpty(CurrentPageNum)) url += "?pageNum="+CurrentPageNum;
				window.location = url;
			}});
		}
	}});
}



