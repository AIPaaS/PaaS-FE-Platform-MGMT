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
	if(CU.isFunction(cb)) cb();
}
function initComponent() {
}
function initListener() {
	$("#code").bind("keyup", doCdtTFKeyUp);
	$("#name").bind("keyup", doCdtTFKeyUp);
	$("#btn_query").bind("click",function(){query(1);});
	$("#grid_pageSize").bind("change",function(){query(1);});
	$("#btn_add").bind("click",function(){window.location = ContextPath + "/dispatch/mc/020201?pageNum="+CurrentPageNum;});
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
	$("#dataCenterTable").html("");
	$("#ul_pagination").remove();
	$("#pagination_box").html('<ul id="ul_pagination" class="pagination-sm"></ul>');
	var pageSize = $("#grid_pageSize").val();
	var code = $("#code").val();
	var name = $("#name").val();
	var orders = "CODE";
	
	var ps = {pageNum:pageNum,pageSize:pageSize,code:code,name:name,orders:orders};
	RS.ajax({url:"/res/datac/queryPage",ps:ps,cb:function(r) {
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
			$('#dataCenterTable-tmpl').tmpl(r).appendTo("#dataCenterTable");
		}
	}});
	
}

