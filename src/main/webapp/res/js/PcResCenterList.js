var CurrDataMap = {};
var CurrentPageNum = 1;

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
	RS.ajax({url:"/res/datac/getDataCenterCodeList",ps:{addEmpty:true, addAttr:true},cb:function(result) {
		DROP["DV_DATA_CENTER_CODE"] = result;
		var selhtml = PU.getSelectOptionsHtml("DV_DATA_CENTER_CODE");
		$("#sel_dataCenter").html(selhtml);
		if(CU.isFunction(cb))cb();
	}});
}
function initComponent() {
}
function initListener() {
	$("#resCode").bind("keyup", doCdtTFKeyUp);
	$("#resName").bind("keyup", doCdtTFKeyUp);
	$("#btn_query").bind("click",function(){query(1);});
	$("#sel_dataCenter").bind("change",function(){query(1);});
	$("#grid_pageSize").bind("change",function(){query(1);});
	$("#btn_add").bind("click",function(){window.location = ContextPath + "/dispatch/mc/020301?pageNum="+CurrentPageNum;});
}
function initFace() {
}
/** 执行条件文本框回车查询 **/
function doCdtTFKeyUp(e) {
	if(e.keyCode === 13) query(1);
}

function query(pageNum){
	if(CU.isEmpty(pageNum)){
		pageNum = CurrentPageNum;
	}
	$("#resCenterTable").html("");
	$("#ul_pagination").remove();
	$("#pagination_box").html('<ul id="ul_pagination" class="pagination-sm"></ul>');
	var pageSize = $("#grid_pageSize").val();
	var dataCenterId = $("#sel_dataCenter").val();
	var resCode = $("#resCode").val();
	var resName = $("#resName").val();
	var orders = "RES_CODE";
	
	var ps = {pageNum:pageNum,pageSize:pageSize,dataCenterId:dataCenterId,resCode:resCode,resName:resName,orders:orders};
	RS.ajax({url:"/res/resc/queryInfoPage",ps:ps,cb:function(r) {
		if(!CU.isEmpty(r)){
			var data = r.data;
			
			for(var i=0; i<data.length; i++) {
				CurrDataMap["key_"+data[i].id] = data[i];	
			}
			CurrentPageNum = r.pageNum;
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
			$('#resCenterTable-tmpl').tmpl(r).appendTo("#resCenterTable");
		}
	}});
	
}

