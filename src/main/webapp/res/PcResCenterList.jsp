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
						&nbsp;&nbsp;&nbsp;所属数据中心:
					</div>
					<div class="form-group pull-left">
						<select id="sel_dataCenter" class="form-control" style="width:120px;">
						</select>
					</div>
					<div class="form-group pull-left">
						&nbsp;&nbsp;&nbsp;资源中心代码:
					</div>
					<div class="form-group pull-left">
						<input type="text" name="resCode" id="resCode" class="form-control" style="width:120px;">
					</div>
					<div class="form-group pull-left">
						资源中心名称:
					</div>
					<div class="form-group pull-left">
						<input type="text" name="resName" id="resName" class="form-control" style="width:120px;">
					</div>
				</div>
				<a id="btn_add" href="###" class="btn btn-primary pull-right"> <i class="fa fa-plus-circle fa-lg"></i> 添加</a>
				<button class="btn btn-primary pull-right" id="btn_query"><i class="fa fa-search fa-lg"></i> 查询</button>
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
								<th class="text-center">资源中心代码</th>
								<th class="text-center">资源中心名称</th>
								<th class="text-center">所属数据中心</th>
								<th class="text-center">环境类型</th>
								<th class="text-left">镜像库</th>
								<th class="text-center">是否有效</th>
								<th class="text-left">描述</th>
							</tr>
						</thead>
						<tbody id="resCenterTable">
							
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



<script id="resCenterTable-tmpl" type="text/x-jquery-tmpl">
	{{each(i,row) data}}
		<tr>
			<td class="text-center"><a href="<%=ContextPath%>/dispatch/mc/020301?id={{= row.resCenter.id}}&pageNum={{= pageNum}}">{{= row.resCenter.resCode}}</a></td>
			<td class="text-center">{{= row.resCenter.resName}}</td>
			<td class="text-center">
				{{= PU.getDropValue("DV_DATA_CENTER_CODE",row.resCenter.dataCenterId,false)}}
			</td>
			<td class="text-center">
				{{= PU.getDropValue("V_RES_CENTER_ENV_TYPE",row.resCenter.envType,false)}}
			</td>
			<td class="text-left">
				{{if !CU.isEmpty(row.imageResp)}}
					{{= row.imageResp.imgRespUrl}}
				{{/if}}
			</td>
			<td class="text-center">
				{{if row.resCenter.status==1}}
					是
				{{else}}
					否
				{{/if}}
			</td>
			<td class="text-left">{{= row.resCenter.remark}}</td>
		</tr>
{{/each}}
</script>




<jsp:include page="/layout/jsp/footer.jsp"></jsp:include>
