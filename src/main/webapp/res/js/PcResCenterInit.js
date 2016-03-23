var CurrDataMap = {};
var CurrCompId = "";

var TreeData = null;
var SelForCenterType = null;	//1=数据中心    2=资源中心    3=网络区域
var SelForCenterId = null;

var mouseenter = false;

var CurrentPageNum = 1;

var GridAddId = 1;

var centerSize = 0;
var visitSize =0;
var slaveSize = 0;

var initStatus = 0;  //0-未初始化，1-正在初始化，2-初始化完成，3-初始化错误

function init() {
	initData(function() {
		initComponent();
		initListener();
		initFace();
		query();
	});
	
}


function initData(cb) {
	CurrentPageNum = PRQ.get("pageNum");
	if(CU.isEmpty(CurrentPageNum)){
		CurrentPageNum = 1;
	}
	RS.ajax({url:"/res/computer/getComputerRegionDropListMap",ps:{addEmpty:true, addAttr:true},cb:function(result) {
		DROP["DV_COMP_ROOM_CODE"] = result["room"];
		DROP["DV_DATA_CENTER_CODE"] = result["dc"];
		DROP["DV_RES_CENTER_CODE"] = result["rc"];
		DROP["DV_NET_ZONE_CODE"] = result["nc"];
		var dropList = [];
		for(var i=1; i<result["dc"].length; i++) dropList.push(result["dc"][i]);
		for(var i=1; i<result["rc"].length; i++) dropList.push(result["rc"][i]);
		for(var i=1; i<result["nc"].length; i++) dropList.push(result["nc"][i]);
		TreeData = toTreeData(dropList);
		
		var roomselhtml = PU.getSelectOptionsHtml("DV_RES_CENTER_CODE");
		$("#sel_resCenter").html(roomselhtml);
		$("#sel_resCenter").find("option").first().remove();
		if(CU.isFunction(cb))cb();
	}});

	
}
function initComponent() {

}
function initListener() {
	$("#btn_init").bind("click", function() {
		initResCenter();
	});
	$("#sel_resCenter").bind("change", function() {
		query();
	});
	$("#btn_query").bind("click", function() {
		query();
	});
	$("#btn_cancel").bind("click", function() {
		cancelRes();
	});
	$("#btn_add").bind("click",function(){
		$("#div_appResUse").modal("show");
	})
	$('#btn_add_pass').bind("click",function(){
		addComputerInRes();
	})
	$('#btn_add_back').bind("click",function(){
		$("#div_appResUse").modal("hide");
	})
}
function initFace() {
}
function query(){
	var resId = "";
	resId=$('#sel_resCenter :selected').val();
	if(resId=="") return ;
	RS.ajax({url:"/res/computer/queryByResCenter",ps:{resCenterId : resId},cb:function(result) {
		initStatus = result.initStatus;
		if(initStatus==1) {
			$('#btn_init').attr("disabled",true);
			$('#btn_init').addClass("disabled");
			$('#btn_init').removeClass("btn-success");
			$("#btn_cancel").attr("disabled",true);
			$("#btn_cancel").addClass("disabled");
			$("#btn_cancel").removeClass("btn-success");
		}else if(initStatus==2){
			$('#btn_init').attr("disabled",true);
			$('#btn_init').addClass("disabled");
			$('#btn_init').removeClass("btn-success");
			$("#btn_cancel").attr("disabled",false);
			$("#btn_cancel").addClass("btn-success");
			$("#btn_cancel").removeClass("disabled");
		}else {
			$('#btn_init').attr("disabled",false);
			$('#btn_init').addClass("btn-success");
			$('#btn_init').removeClass("disabled");
			$("#btn_cancel").attr("disabled",true);
			$("#btn_cancel").addClass("disabled");
			$("#btn_cancel").removeClass("btn-success");
		}
		
		$('#pcComputerTable').html("");
		$('#appResTable').html("");
		var slavePartList = result.slavePartList;
		var masterPartList = result.corePartList;
		var visitPartList = result.visitPartList;
		var computerList = result.computerList;
		var toAddComputerList = result.toAddComputer;
		centerSize = result.corePartList==null?0:masterPartList.length;
		visitSize = result.visitPartList==null?0:visitPartList.length;
		slaveSize = result.slavePartList==null?0:slavePartList.length;

		$('#pcComputerTable-tmpl').tmpl(result).appendTo("#pcComputerTable");
		$('#appResTable-tmpl').tmpl(result).appendTo("#appResTable");
		
		$('#resCenter-des').html("");
		var statudesc = "状态：";
		switch (initStatus){
			case 0:statudesc += "未部署"; break;
			case 1:statudesc += "正在部署中"; break;
			case 2:statudesc += "已部署完成"; break;
			case 3:statudesc += "部署失败"; break;
		}
		var html = '';
			html+= '<span class="col-lg-2 control-label">'+statudesc+'</span>';
		html += '<font color="blue"> 核心控制域：'+centerSize+'台     访问入口域：'+visitSize+'台    服务域：'+slaveSize+'台</font>';
		$('#resCenter-des').append(html);
	
	}});
}

function cancelRes(){
	var resId = "";
	resId=$('#sel_resCenter :selected').val();
	if(resId==""||initStatus!=2) return ;
	$('#div-log').show();
	startGetLog();
	$('#div-init-button').hide();
	RS.ajax({url:"/res/resc/cancelResCenter",ps:{resCenterId:resId,useAgent:true,loadOnly:true},cb:function(result) {
		if(result.resultCode=="000000"){
			
			RS.ajax({url:"/res/resc/saveOrUpdate",ps:{id:resId,initStatus:0},cb:function(r) {
			}});
			
			clearInterval(intervalTime);
			CC.showMsg({msg:"注销资源中心成功"});
		}else{
//			RS.ajax({url:"/res/resc/saveOrUpdate",ps:{id:resId,initStatus:3},cb:function(r) {
//			}});
			
			//停止查询日志
			clearInterval(intervalTime);
			$('#div-log').hide();
			CC.showMsg({msg:"注销失败"});
			$('#div-init-button').show();
		}
	}});
}

function initResCenter(){
		if(centerSize<3||visitSize<2||slaveSize<1){
			CC.showMsg({msg:"该资源中心服务器不够"});
			return;
		}
		var resId = "";
		resId=$('#sel_resCenter :selected').val();
// 		if(initStatus==1){
// 			CC.showMsg({msg:"改资源中心正在初始化中"});
// 			return;
// 		}
		if(resId==""||initStatus==2) return ;
		$('#div-log').show();
		startGetLog();
		$('#div-init-button').hide();
// 		//资源状态置1，锁死
// 		RS.ajax({url:"/res/resc/saveOrUpdate",ps:{id:resId,initStatus:1},cb:function(r) {
// 		}});
		//开始初始化
		RS.ajax({url:"/res/resc/initResCenter",ps:{resCenterId:resId,useAgent:true,loadOnly:true},cb:function(result) {
			if(result.resultCode=="000000"){
				RS.ajax({url:"/res/resc/saveOrUpdate",ps:{id:resId,initStatus:2},cb:function(r) {
				}});
				
				clearInterval(intervalTime);
				CC.showMsg({msg:"初始化资源中心成功！"});
			}else{
				RS.ajax({url:"/res/resc/saveOrUpdate",ps:{id:resId,initStatus:3},cb:function(r) {
				}});
				
				//停止查询日志
				clearInterval(intervalTime);
				$('#div-log').hide();
				CC.showMsg({msg:"初始化错误"});
				$('#div-init-button').show();
			}
		}});
}

function addComputerInRes(){
	var computerId = new Array();
	$(":checkbox:checked").each(function(){
		computerId.push($(this).val());
	})
	RS.ajax({url:"/res/resc/addSlave",ps:{computerId : computerId.join()},cb:function(r) {
		
	}});
}


//刷新日志
var intervalTime;
function startGetLog() {
		/*轮询*/
		queryLog();
		intervalTime = setInterval(function() {
			queryLog();
	}, 5000);
}

function queryLog() {
	var resId = "";
	resId = $('#sel_resCenter :selected').val();
	RS.ajax({url:"/res/resc/getInitLogNew",ps:{resCenterId:resId},cb:function(msg) {
		if(CU.isEmpty(msg.data)) return;
		if (msg.length != 0) {
			var str = '';
			var d = msg.data;
			for (var i = 0; i < d.length; i++) {
				str += d[i].finishTime + '  日志信息:   ' + d[i].desc+ '\n';
			}
			var html =  str;
			$('#logWindow').html('');
			$('#logWindow').html(html);
			$("#logWindow").scrollTop($("#logWindow")[0].scrollHeight);
			return;
		}
	}});
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
