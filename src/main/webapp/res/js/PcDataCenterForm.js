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
	$("#form_dataCenter").submit(function(e){
	    e.preventDefault();
	    submitForm();
	});
	RS.setAjaxLodingButton("btn_submit");
}

/** 初始化界面 **/
function initFace() {
	
}
function queryInfo(){
	RS.ajax({url:"/res/datac/queryById",ps:{id:CurrentId},cb:function(result) {
		var status = result.status;
		if(status){
			$("#status").prop("checked",true);
		}else{
			$("#status").prop("checked",false);
		}
		$("#code").val(result.code);
		$("#name").val(result.name);
		$("#remark").val(result.remark);
		
	}});
}

/**提交表单**/
function submitForm(){
	var code = $("#code").val();
	var name = $("#name").val();
	var remark = $("#remark").val();
	var status = 1;
	var isChecked = $("#status").prop("checked");
	if(!isChecked) status = 0;
	var record = {id:CurrentId,code:code,name:name,remark:remark,status:status};
	RS.ajax({url:"/res/datac/saveOrUpdate",ps:record,cb:function(r) {
		var url = ContextPath+"/dispatch/mc/0202";
		if(!CU.isEmpty(CurrentPageNum)) url += "?pageNum="+CurrentPageNum;
		window.location = url;
	}});
}



