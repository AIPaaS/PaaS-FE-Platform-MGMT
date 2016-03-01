<%@ page contentType="text/html; charset=utf-8"%>

<%
String ContextPath = request.getContextPath();
%>

<jsp:include page="/layout/jsp/head.jsp"></jsp:include>



<div class="row">
	<div class="col-lg-12">
		<div class="main-box clearfix">
			<div class="filter-block pull-left">
				<div class="form-group pull-left">
					<div class="form-group pull-left">
						&nbsp;&nbsp;镜像库代码:
					</div>
					<div class="form-group pull-left">
						<input type="text" name="imgRespCode" id="imgRespCode" class="form-control" style="width:120px;">
					</div>
					<div class="form-group pull-left">
						所属机房:
					</div>
					<div class="form-group pull-left">
						<select id="roomId" class="form-control" style="width:120px;">
						</select>
					</div>
				</div>
				<button id="btn_query" class="btn btn-primary"><i class="fa fa-search fa-lg"></i> 查询</button>
				<button id="btn_add" class="btn btn-primary"> <i class="fa fa-plus-circle fa-lg"></i> 添加</button>
			</div>
		</div>
	</div>
</div>

<!-- 正文 -->

<div class="row">
	<div class="col-lg-12">
		<div class="main-box clearfix">
			<div class="main-box-body clearfix">
				<div class="table-responsive">
					<table class="table">
						<thead>
							<tr>
								<th class="text-left">镜像库代码</th>
								<th class="text-center">所属机房</th>
								<th class="text-center">是否快照镜像库</th>
								<th class="text-center">镜像库地址</th>
								<th class="text-center">操作</th>
							</tr>
						</thead>
						<tbody id="imageRepoTable">
							
						</tbody>
					</table>
				</div>
				<div class="row-fluid">
					<div class="col-lg-6">
						<label>
							每页
								<select name="selPageSize"  class="pagination" id="grid_pageSize" >
									<option value="10">10</option>
									<option value="15">15</option>
									<option value="20" selected>20</option>
									<option value="25">25</option>
									<option value="30">30</option>
									<option value="40">40</option>
									<option value="50">50</option>
								</select>
							条记录
						</label>
					</div>
					<div class="col-lg-6">
						<div class="pagination pull-right" id="pagination_box">
							<ul id="ul_pagination" class="pagination-sm"></ul>
						</div>
					</div>
				</div>
				
			</div>
		</div>
	</div>
</div>



<script id="imageRepoTable-tmpl" type="text/x-jquery-tmpl">
	{{each(i,row) data}}
		<tr>
			<td class="text-left"><a href="<%=ContextPath%>/dispatch/mc/040101?id={{= row.id}}&pageNum={{= pageNum}}">{{= row.imgRespCode}}</a></td>
			<td class="text-center">{{= PU.getDropValue("DV_COMP_ROOM_CODE",row.roomId,false)}}</td>
			<td class="text-center">{{= PU.getDropValue("V_YES_NO",row.imgRespType,false)}}</td>
			<td class="text-center">{{= row.imgRespUrl}}</td>			
			<td class="text-center">
				<a id="a_remove_image_repo_{{= row.id}}" href="###" class="table-link danger" title="删除">
					<span class="fa-stack">
						<i class="fa fa-square fa-stack-2x"></i>
						<i class="fa fa-trash-o fa-stack-1x fa-inverse"></i>
					</span>
				</a>
			</td>
		</tr>
{{/each}}
</script>




<jsp:include page="/layout/jsp/footer.jsp"></jsp:include>
