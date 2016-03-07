
var TreeData = null;
var SelForCenterType = null;	//1=数据中心    2=资源中心 	3=网络区域
var SelForCenterId = null;

var mouseenter = false;

var CurrDataMap = {};

var CurrentCheckApply = null;

var ParentLeftWidth = 0;
var ParentHeaderHeight = 0;


function init() {
	initData(function() {
		initComponent();
		initListener();
		initFace();
		$("#cdtStatus").val(0);
		query(1);
	});
	
}


function initData(cb) {
	ParentLeftWidth = PRQ.get("ParentLeftWidth");
	ParentHeaderHeight = PRQ.get("ParentHeaderHeight");
	ParentLeftWidth = CU.isEmpty(ParentLeftWidth) ? 0 : parseInt(ParentLeftWidth, 10);
	ParentHeaderHeight = CU.isEmpty(ParentHeaderHeight) ? 0 : parseInt(ParentHeaderHeight, 10);
	
	var ls = DROP["V_PS_RES_APPLY_CHECK_STATUS"];
	for(var i=0; i<ls.length; i++) {
		if(ls[i].code=="9") CU.remove(ls, i);
	}
	var statusselhtml = PU.getSelectOptionsHtml("V_PS_RES_APPLY_CHECK_STATUS");
	$("#cdtStatus").html(statusselhtml);
	
	RS.ajax({url:"/res/computer/getComputerRegionDropListMap",ps:{addEmpty:true, addAttr:true, opts:"dc|rc|nc"},cb:function(result) {
		DROP["DV_DATA_CENTER_CODE"] = result["dc"];
		DROP["DV_RES_CENTER_CODE"] = result["rc"];
		DROP["DV_NET_ZONE_CODE"] = result["nc"];
		
		var dropList = [];
		for(var i=1; i<result["dc"].length; i++) dropList.push(result["dc"][i]);
		for(var i=1; i<result["rc"].length; i++) dropList.push(result["rc"][i]);
		for(var i=1; i<result["nc"].length; i++) dropList.push(result["nc"][i]);
		TreeData = toTreeData(dropList);
		
		if(CU.isFunction(cb))cb();
	}});
}
function initComponent() {
	$("#cdtApplyTime").datetimepicker({
		minView: "month",
		format: "yyyy-mm-dd", 
		language: "zh-CN",
		autoclose:true
	});
	$("#sel_forcenter").treeview({data:TreeData,color:"#428bca",selectedBackColor:"#f0f8ff",selectedColor:"#428bca",collapseIcon:"fa fa-minus-square-o",expandIcon:"fa fa-plus-square-o",onNodeSelected: function(e, node) {
		if(CU.isEmpty(node.id)) {
			SelForCenterType = null;
			SelForCenterId = null;
			$("#forcenter").val("");
		}else {
			SelForCenterType = node.param1;
			SelForCenterId = node.id;
			$("#forcenter").val(node.text);
		}
		$('#sel_forcenter').hide();
		query();
	}});
	$("#sel_forcenter").treeview("collapseAll", {silent:true});
}
function initListener() {
	$("#cdtApplyTime").bind("change", function(){query();});
	$("#cdtStatus").bind("change", function(){query();});
	
	$("#forcenter").bind("focus",function(){
		var sul = $('#sel_forcenter');
		sul.css("top", $("#forcenter").offset().top-$("#forcenter").height()+ParentHeaderHeight+10);
		sul.css("left", $("#forcenter").offset().left-$("#forcenter").width()-90+ParentLeftWidth+5);
		sul.show();
	});
	$("#forcenter").on("blur", function() {
		if(!mouseenter) $("#sel_forcenter").hide();
	});
	
	$("#sel_forcenter").on("mouseenter",function(){mouseenter=true;});
	$("#sel_forcenter").on("mouseleave",function(){mouseenter=false;});
	$("#sel_forcenter").bind("click", function() {
		if(!$("#sel_forcenter").is(":hidden")) $("#forcenter").focus();
	});
	
	$("#btn_query").bind("click",function(){query();});
	$("#grid_pageSize").bind("change",function(){query();});
	
	$("#btn_check_pass").bind("click", checkMntPass);
	$("#btn_check_back").bind("click", checkMntBack);
}
function initFace() {
}


/** 执行条件文本框回车查询 **/
function doCdtTFKeyUp(e) {
	if(e.keyCode === 13) query();
}


function toTreeData(dropList) {
	var tree = [{}];
	var pnobj = {};
	for(var i=0; i<dropList.length; i++) {
		var item = dropList[i];
		var type = item.param1;
		
		item.id = item.code;
		item.text = item.name;
		
		pnobj[item.code+"_"+type] = item;
		
		if(type == "1") {
			item.icon = "fa fa-database";
			tree.push(item);
		}else {
			item.icon = type=="2" ? "fa fa-sitemap" : "fa fa-flash";
			var pn = pnobj[item.parentCode+"_"+(parseInt(type, 10)-1)];
			if(CU.isEmpty(pn)) continue ;
			if(CU.isEmpty(pn.childNodes)) pn.childNodes = [];
			pn.childNodes.push(item);
		}
	}
	return tree;
}


function query(pageNum){
	if(CU.isEmpty(pageNum)) pageNum = 1;
	
	$("#applyTabList").html("");
	$("#ul_pagination").remove();
	$("#pagination_box").html('<ul id="ul_pagination" class="pagination-sm"></ul>');
	delete CurrDataMap;
	CurrDataMap = {};
	
	var pageSize = $("#grid_pageSize").val();
	var applyTime = $("#cdtApplyTime").val();
	var status = $("#cdtStatus").val();
	var orders = " ID DESC ";
	
	var cdt = {pageNum:pageNum,pageSize:pageSize,orders:orders};
	if(!CU.isEmpty(SelForCenterType) && !CU.isEmpty(SelForCenterId)) {
		switch (SelForCenterType) {		//1=数据中心    2=资源中心    3=网络区域
			case "1": cdt.dataCenterId = SelForCenterId; break;
			case "2": cdt.resCenterId = SelForCenterId; break;
			case "3": cdt.netZoneId = SelForCenterId; break;
		}
	}
	if(!CU.isEmpty(status)) cdt.status = status;
	if(!CU.isEmpty(applyTime)) {
		applyTime = applyTime.replace(/-/g, "");
		cdt.startApplyTime = applyTime + "000000";
		cdt.endApplyTime = applyTime + "235959";
	}
	
	RS.ajax({url:"/res/mntresapply/queryInfoPage",ps:cdt,cb:function(r) {
		if(!CU.isEmpty(r)){
			var data = r.data;
			for(var i=0; i<data.length; i++) {
				CurrDataMap["key_"+data[i].apply.id] = data[i];
			}
			
			ParamApplyPageNum = r.pageNum;
			$("#ul_pagination").twbsPagination({
		        totalPages: r.totalPages?r.totalPages:1,
		        visiblePages: 7,
		        startPage: r.pageNum,
		        first:"首页",
		        prev:"上一页",
		        next:"下一页",
		        last:"尾页",
		        onPageClick: function (event, page) {
		        	query(page);
		        }
		    });
			$('#applyTabList-tmpl').tmpl(r).appendTo("#applyTabList");
			
			for(var i=0;i<data.length;i++){
				$("#btn_check_view_"+data[i].apply.id).bind("click", function() {
					var obj = CurrDataMap["key_"+this.id.substring(this.id.lastIndexOf("_")+1)];
					showCheckView(obj);
				});
				
				$("#btn_checking_"+data[i].apply.id).bind("click",function(){
					var obj = CurrDataMap["key_"+this.id.substring(this.id.lastIndexOf("_")+1)];
					showCheckForm(obj);
				});
			}
		}
	}});
}


function showCheckForm(info) {
	CurrentCheckApply = info;
	$("#div_checkFormTitle").html("租户[<font color='blue'>"+info.merchent.mntCode+"</font>][<font color='blue'>"+info.merchent.mntName+"</font>]资源申请单[<font color='#008800'>"+info.apply.code+"</font>]审核");
	$('#div_checkForm').modal('show');
}
function showCheckView(info) {
	$("#tabCheckView").html("");
	$("#div_checkViewTitle").html("租户[<font color='blue'>"+info.merchent.mntCode+"</font>][<font color='blue'>"+info.merchent.mntName+"</font>]资源申请单[<font color='#008800'>"+info.apply.code+"</font>]审核情况");
	$('#tabCheckView-tmpl').tmpl(info).appendTo("#tabCheckView");
	$('#div_checkView').modal('show');
}


function replaceDesc(desc) {
	if(CU.isEmpty(desc)) return "";
	return (desc+"").replace(/\n/g, "<br>");
}


function checkMntPass() {
	checkMnt(1);
}
function checkMntBack() {
	checkMnt(2);
}


//ct=1通过, ct=2退回
function checkMnt(ct) {
	var desc = $("#winCheckDesc").val();
	if(CU.isEmpty(desc)) {
		CC.showMsg({msg:"请输入审核意见!",option:1});
		return ;
	}
	
	CC.showMsg({msg:"您确定要审核[<font color='"+(ct==1?"#008800":"red")+"'>"+(ct==1?"通过":"退回")+"</font>]当前租户资源申请单吗?",option:2,callback:function(cr) {
		if(cr != "ok") return ;
		var url = "/res/mntresapply/"+(ct==1?"/checkApplyPass":"/checkApplyBack");
		RS.ajax({url:url,ps:{id:CurrentCheckApply.apply.id,checkDesc:desc,cb:function() {
			$('#div_checkForm').modal('hide');
			setTimeout(function(){query();}, 500);
		}}});
	}});
}

