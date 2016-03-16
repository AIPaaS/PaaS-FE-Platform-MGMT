var ParamPageNum = 1;
var CurrDataMap = {};

function init() {
	initData(function() {
		initComponent();
		initListener();
		initFace();
		query(ParamPageNum);
	});
	
}


function initData(cb) {
	ParamPageNum = PRQ.get("pageNum");
	if(CU.isEmpty(ParamPageNum)) ParamPageNum = 1;
	RS.ajax({url:"/res/comproom/getCompRoomDropList",ps:{addEmpty:true, addAttr:true},cb:function(rs) {
		DROP["DV_COMP_ROOM_CODE"] = rs;
		var selhtml = PU.getSelectOptionsHtml("DV_COMP_ROOM_CODE");
		$("#roomId").html(selhtml);
		if(CU.isFunction(cb))cb();
	}});
	
}
function initComponent() {
}
function initListener() {
	$("#imgRespCode").bind("keyup", doCdtTFKeyUp);
	$("#roomId").bind("change",function(){query();});
	$("#sel_projectId").bind("change",function(){query();});
	$("#btn_query").bind("click",function(){query();});
	$("#grid_pageSize").bind("change",function(){query();});
	$("#btn_add").bind("click",function(){window.location = ContextPath + "/dispatch/mc/040101?pageNum="+ParamPageNum;});
}
function initFace() {
}
/** 执行条件文本框回车查询 **/
function doCdtTFKeyUp(e) {
	if(e.keyCode === 13) query();
}

function query(pageNum){
	if(CU.isEmpty(pageNum)) pageNum = 1;
	$("#imageRepoTable").html("");
	$("#ul_pagination").remove();
	$("#pagination_box").html('<ul id="ul_pagination" class="pagination-sm"></ul>');
	var pageSize = $("#grid_pageSize").val();
	var imgRespCode = $("#imgRespCode").val();
	var roomId = $("#roomId").val();
	var orders = "IMG_RESP_CODE , ID";
	
	var ps = {pageNum:pageNum,pageSize:pageSize,imgRespCode:imgRespCode,roomId:roomId,orders:orders};
	RS.ajax({url:"/res/imgresp/queryPage",ps:ps,cb:function(r) {
		if(!CU.isEmpty(r)){
			var data = r.data;
			for(var i=0; i<data.length; i++) {
				CurrDataMap["key_"+data[i].id] = data[i];
			}
			ParamPageNum = r.pageNum;
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
			$('#imageRepoTable-tmpl').tmpl(r).appendTo("#imageRepoTable");
			for(var i=0; i<data.length; i++) {
				$("#a_remove_image_repo_"+data[i].id).bind("click",function(){
					var obj = CurrDataMap["key_"+this.id.substring(this.id.lastIndexOf("_")+1)];
					removeImageRepo(obj.id);
				});
			}
		}
	}});
	
}

function removeImageRepo(id){
	RS.ajax({url:"/res/imgresp/isImageRepUsed",ps:{id:id},cb:function(r) {
		if(r){
			CC.showMsg({msg:"该镜像库正在被使用，不能被删除!"});
			return;
		}else{
			var obj = CurrDataMap["key_"+id];
			CC.showMsg({msg:"您确定要删除镜像库[<font color='blue'>"+obj.imgRespCode+"</font>]吗?",option:2,callback:function(r) {
				if(r != "ok") return ;
				RS.ajax({url:"/res/imgresp/removeById",ps:{id:id},cb:function() {
					query(ParamPageNum);
				}});
			}});
		}
	}});
	
}