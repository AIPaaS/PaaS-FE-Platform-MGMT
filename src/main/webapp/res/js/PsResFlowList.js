var ResId = "";
var DataCenterId = "";
var ResCenterId = "";
var NetZoneId = "";
var PageNum = "";

function init() {
	initData(function() {
		initComponent();
		initListener();
		initFace();
		query(1);
	});
	
}


function initData(cb) {
	ResId = PRQ.get("resId");
	DataCenterId = PRQ.get("dataCenterId");
	ResCenterId = PRQ.get("resCenterId");
	NetZoneId = PRQ.get("netZoneId");
	PageNum = PRQ.get("pageNum");
	
	if(CU.isEmpty(ResId) || CU.isEmpty(DataCenterId) || CU.isEmpty(ResCenterId) || CU.isEmpty(NetZoneId)) {
		alert("没有找到资源");
		pageBack();
		return ;
	}
	
	RS.ajax({url:"/res/computer/getComputerRegionDropListMap",ps:{addEmpty:true, addAttr:true},cb:function(result) {
		DROP["DV_DATA_CENTER_CODE"] = result["dc"];
		DROP["DV_RES_CENTER_CODE"] = result["rc"];
		DROP["DV_NET_ZONE_CODE"] = result["nc"];
		
		var html = "["+PU.getDropValue("DV_DATA_CENTER_CODE",DataCenterId,false)+"]"
				 + "&nbsp;-&nbsp;"
				 + "["+PU.getDropValue("DV_RES_CENTER_CODE",ResCenterId,false)+"]"
				 + "&nbsp;-&nbsp;"
				 + "["+PU.getDropValue("DV_NET_ZONE_CODE",NetZoneId,false)+"]";
		$("#span_title").html(html);
		
		if(CU.isFunction(cb))cb();
	}});
}
function initComponent() {
	
}
function initListener() {
	$("#grid_pageSize").bind("change",function(){query(1);});
	$("#a_backToResList").bind("click", pageBack);
}
function initFace() {
}


function query(pageNum){
	$("#resChangeLogTable").html("");
	$("#ul_pagination").remove();
	$("#pagination_box").html('<ul id="ul_pagination" class="pagination-sm"></ul>');
	var pageSize = $("#grid_pageSize").val();
	var orders = "ID DESC";
	
	var ps = {pageNum:pageNum,pageSize:pageSize,resId:ResId,orders:orders};
	
	RS.ajax({url:"/res/rescres/queryFlowPage",ps:ps,cb:function(r) {
		if(!CU.isEmpty(r)){
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
			$('#resChangeLogTable-tmpl').tmpl(r).appendTo("#resChangeLogTable");
		}
	}});
	
}



function pageBack() {
	var url = ContextPath + "/dispatch/mc/0206?1=1";
	if(!CU.isEmpty(PageNum)) url += "&pageNum="+PageNum;
	window.location = url;
}
