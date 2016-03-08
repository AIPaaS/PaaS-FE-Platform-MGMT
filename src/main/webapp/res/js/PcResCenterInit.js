var CurrDataMap = {};
var CurrCompId = "";

var TreeData = null;
var SelForCenterType = null;	//1=数据中心    2=资源中心    3=网络区域
var SelForCenterId = null;

var mouseenter = false;

var CurrentPageNum = 1;

var GridAddId = 1;

var resId = $('#sel_resCenter :selected').val();

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
		if(CU.isFunction(cb))cb();
	}});

	
}
function initComponent() {

}
function initListener() {
	$("#btn_init").bind("click", function() {
		initRes(resId);
	});
	$("#sel_resCenter").bind("change",function(){query();});

}
function initFace() {
}
function query(){
	var resId = $('#sel_resCenter :selected').val();
	if(resId==null) return false;
	RS.ajax({url:"/res/computer/queryByResCenter",ps:{resCenterId : resId},cb:function(result) {

		var slavePartList = result.slavePartList;

		$('#pcComputerTable-tmpl').tmpl(result).appendTo("#pcComputerTable");

	}});
	
}

function initRes(resId){
	$('#div-log').show();
	
	RS.ajax({url:"/res/resc/initResCenter",ps:{resCenterId : resId},cb:function(result) {
		if(result==0){
			alert("初始化成功！");
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