var CurrDataMap = {};
var CurrCompId = "";

var TreeData = null;
var SelForCenterType = null;	//1=数据中心    2=资源中心    3=网络区域
var SelForCenterId = null;

var mouseenter = false;

var CurrentPageNum = 1;

var GridAddId = 1;

var ParentLeftWidth = 0;
var ParentHeaderHeight = 0;

function init() {
	initData(function() {
		initComponent();
		initListener();
		initFace();
		query();
	});
	
}


function initData(cb) {
	var pb = CC.getParentLayoutBorder();
	ParentLeftWidth = pb.width;
	ParentHeaderHeight = pb.height;
	
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
		
		var roomselhtml = PU.getSelectOptionsHtml("DV_COMP_ROOM_CODE");
		$("#sel_compRoom").html(roomselhtml);
		if(CU.isFunction(cb))cb();
	}});
	
}
function initComponent() {
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
		query(1);
	}});
	$("#sel_forcenter").treeview("collapseAll", {silent:true});
}
function initListener() {
	$("#code").bind("keyup", doCdtTFKeyUp);
	$("#ip").bind("keyup", doCdtTFKeyUp);
	
	$("#btn_query").bind("click",function(){query(1);});
	$("#sel_compRoom").bind("change",function(){query(1);});
	$("#forcenter").bind("focus",function(){
		var sul = $('#sel_forcenter');
		sul.css("top", $("#forcenter").offset().top-$("#forcenter").height()+ParentHeaderHeight+10);
		sul.css("left", $("#forcenter").offset().left-$("#forcenter").width()-140+ParentLeftWidth+5);
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
	
	$("#grid_pageSize").bind("change",function(){query(1);});
	$("#btn_add").bind("click",function(){window.location = ContextPath + "/dispatch/mc/020501?pageNum="+CurrentPageNum;});
	$("#a_add_tag").bind("click",function(){addTagRow();});
	$("#btn_Ok").bind("click",function(){saveCompTags();});
	
	RS.setAjaxLodingButton("btn_Ok");
}
function initFace() {
}


/** 执行条件文本框回车查询 **/
function doCdtTFKeyUp(e) {
	if(e.keyCode === 13) query(1);
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
	$("#pcComputerTable").html("");
	$("#ul_pagination").remove();
	$("#pagination_box").html('<ul id="ul_pagination" class="pagination-sm"></ul>');
	var pageSize = $("#grid_pageSize").val();
	var roomId = $("#sel_compRoom").val();
	var code = $("#code").val();
	var ip = $("#ip").val();
	var orders = "CODE";
	
	var ps = {pageNum:pageNum,pageSize:pageSize,roomId:roomId,code:code,ip:ip,orders:orders};
	
	if(!CU.isEmpty(SelForCenterType) && !CU.isEmpty(SelForCenterId)) {
		switch (SelForCenterType) {		//1=数据中心    2=资源中心    3=网络区域
			case "1": ps.dataCenterId = SelForCenterId; break;
			case "2": ps.resCenterId = SelForCenterId; break;
			case "3": ps.netZoneId = SelForCenterId; break;
		}
	}
	
	RS.ajax({url:"/res/computer/queryPage",ps:ps,cb:function(r) {
		if(!CU.isEmpty(r)){
			var data = r.data;
			for(var i=0;i<data.length;i++){
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
			$('#pcComputerTable-tmpl').tmpl(r).appendTo("#pcComputerTable");
			for(var i=0;i<data.length;i++){
				$("#a_comp_tags_"+data[i].id).bind("click",function(){
					var obj = CurrDataMap["key_"+this.id.substring(this.id.lastIndexOf("_")+1)];
					showCompTags(obj.id);
				});
			}
		}
	}});
	
}
function showCompTags(id){
	CurrCompId = id;
	var obj =  CurrDataMap["key_"+id];
	$("#div_compTagsTitle").html("服务器[<font color='blue'>"+obj.code+"</font>]标签列表");
	$("#compTagsTable").html("");
	RS.ajax({url:"/res/computer/queryComputerTagList",ps:{computerId:obj.id, orders:"ID"},cb:function(rs) {
		for(var i=0;i<rs.length;i++){
			addTagRow(rs[i]);
		}
	}});
	$('#div_compTags').modal('show');
}




function addTagRow(obj) {
	var name = CU.isEmpty(obj)||CU.isEmpty(obj.tagName) ? "" : obj.tagName;
	var value = CU.isEmpty(obj)||CU.isEmpty(obj.tagValue) ? "" : obj.tagValue;
	var desc = CU.isEmpty(obj)||CU.isEmpty(obj.tagDesc) ? "" : obj.tagDesc;
	
	GridAddId ++ ;
	var trid = "tr_add_" + GridAddId;
	var tr = $("<tr id='"+trid+"'></tr>");
	var a = $("<a href=\"###\" class=\"table-link  danger\" title=\"删除标签\">"
			+ "<span class=\"fa-stack\">"
			+ "<i class=\"fa fa-square fa-stack-2x\"></i>"
			+ "<i class=\"fa fa-minus fa-stack-1x fa-inverse\"></i>"
			+ "</span>"
			+ "</a>");
	tr.append($("<td><input type=\"text\" class=\"form-control\" name=\"tagName\" value=\""+name+"\" maxlength=\"20\" /></td>"));
	tr.append($("<td><input type=\"text\" class=\"form-control\" name=\"tagValue\" value=\""+value+"\" maxlength=\"100\" /></td>"));
	tr.append($("<td><input type=\"text\" class=\"form-control\" name=\"tagDesc\" value=\""+desc+"\" maxlength=\"50\" /></td>"));
	tr.append($("<td></td>").append(a));
	a.bind("click", function() {removeTag(trid);});
	$("#compTagsTable").append(tr);
}

function getTableParams(){
	var params = [];
	var keys = [];
	
	var param_keys = $("input[name='param_key']");
	var param_descs = $("input[name='param_desc']");
	for(var i=0;i<param_keys.length;i++){
		var v = $.trim($(param_keys[i]).val());
		var desc = $.trim($(param_descs[i]).val());
		if(v.length == 0){
			CC.showMsg({msg:"第["+(i+1)+"]行，参数名不可以为空!"});
			return false ;
		}
		if(keys.indexOf(v) > -1) {
 			CC.showMsg({msg:"参数名<font color='blue'>["+$(param_keys[i]).val()+"]</font>不可以重复!"});
    		return false;
 		}
 		keys.push(v);
 		
 		var param = {};
		param.key = v;
		param.keyDesc = desc;
		
		params.push(param);
	}
	if(params.length>0){
		return CU.toString(params);
	}
	return "";
}



function saveCompTags(){
	var tags = [];
	var tagNames = [];
	
	var names = $("input[name='tagName']");
	var values = $("input[name='tagValue']");
	var descs = $("input[name='tagDesc']");
	
	for(var i=0;i<names.length;i++){
		var name = $.trim($(names[i]).val());
		var value = $.trim($(values[i]).val());
		var tagDesc = $.trim($(descs[i]).val());
		if(name.length == 0){
			CC.showMsg({msg:"第["+(i+1)+"]行，标签名不可以为空!"});
			return false ;
		}
		if(tagNames.indexOf(name) > -1) {
 			CC.showMsg({msg:"参数名<font color='blue'>["+$(names[i]).val()+"]</font>不可以重复!"});
    		return false;
 		}
		if(value.length == 0){
			CC.showMsg({msg:"第["+(i+1)+"]行，标签值不可以为空!"});
			return false ;
		}
		
		tagNames.push(name);
		
 		var tag = {};
		tag.tagName = name;
		tag.tagValue = value;
		tag.tagDesc = tagDesc;
		
		tags.push(tag);
	}
	var strTags = "";
	if(tags.length>0){
		strTags = CU.toString(tags);
	}
	RS.ajax({url:"/res/computer/saveComputerTags",ps:{computerId:CurrCompId, strTags:strTags},cb:function(r) {
		$("#btn_Ok").prop("title", "保存成功");
		$("#btn_Ok").tooltip("show");
		setTimeout(function(){
			$("#btn_Ok").prop("title", "");
			$("#btn_Ok").tooltip("destroy");
		}, 2000);
	}});
}
function removeTag(elId){
	$("#"+elId).remove();
}
