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
						&nbsp;&nbsp;&nbsp;资源中心:
					</div>
					<div class="form-group pull-left">
						<input type="text" name="forcenter" id="forcenter" class="form-control" style="width:120px;" readOnly >
					</div>
					<div class="form-group pull-left">
						区域代码:
					</div>
					<div class="form-group pull-left">
						<input type="text" name="zoneCode" id="zoneCode" class="form-control" style="width:120px;">
					</div>
					<div class="form-group pull-left">
						区域名称:
					</div>
					<div class="form-group pull-left">
						<input type="text" name="zoneName" id="zoneName" class="form-control" style="width:120px;">
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
								<th class="text-center">区域代码</th>
								<th class="text-center">区域名称</th>
								<th class="text-center">所属数据中心</th>
								<th class="text-center">所属资源中心</th>
								<th class="text-center">网段表达式</th>
								<th class="text-left">网段描述</th>
							</tr>
						</thead>
						<tbody id="netZoneTable">
							
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

<div id="sel_forcenter" style="width:300px;position:absolute;display:none;"></div>

<script id="netZoneTable-tmpl" type="text/x-jquery-tmpl">
	{{each(i,row) data}}
		<tr>
			<td class="text-center"><a href="<%=ContextPath%>/dispatch/mc/020401?id={{= row.id}}&pageNum={{= pageNum}}">{{= row.zoneCode}}</a></td>
			<td class="text-center">{{= row.zoneName}}</td>
			<td class="text-center">
				{{= PU.getDropValue("DV_DATA_CENTER_CODE",row.dataCenterId,false)}}
			</td>
			<td class="text-center">
				{{= PU.getDropValue("DV_RES_CENTER_CODE",row.resCenterId,false)}}
			</td>
			<td class="text-center">{{= row.netSegExp}}</td>
			<td class="text-left">{{= row.netSegDesc}}</td>
		</tr>
{{/each}}
</script>




<jsp:include page="/layout/jsp/footer.jsp"></jsp:include>
