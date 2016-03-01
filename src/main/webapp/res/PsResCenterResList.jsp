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
						&nbsp;&nbsp;&nbsp;资源区域:
					</div>
					<div class="form-group pull-left">
						<input type="text" name="forcenter" id="forcenter" class="form-control" style="width:200px;" readOnly >
					</div>
				</div>
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
								<th class="text-center">数据中心</th>
								<th class="text-center">资源中心</th>
								<th class="text-center">网络区域</th>
								<th class="text-center">总CPU个数</th>
								<th class="text-center">总内存大小</th>
								<th class="text-center">总存储大小</th>
								<th class="text-center">剩余CPU个数</th>
								<th class="text-center">剩余内存大小</th>
								<th class="text-center">剩余存储大小</th>
								<th class="text-center">变更记录</th>
							</tr>
						</thead>
						<tbody id="resCenterResTable">
							
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

<script id="resCenterResTable-tmpl" type="text/x-jquery-tmpl">
	{{each(i,row) data}}
		<tr>
			<td class="text-center">
				{{= PU.getDropValue("DV_DATA_CENTER_CODE",row.dataCenterId,false)}}
			</td>
			<td class="text-center">
				{{= PU.getDropValue("DV_RES_CENTER_CODE",row.resCenterId,false)}}
			</td>
			<td class="text-center">
				{{= PU.getDropValue("DV_NET_ZONE_CODE",row.netZoneId,false)}}
			</td>
			<td class="text-center">{{= row.totalCpuCount/100}}</td>
			<td class="text-center">{{= CU.toMegaByteUnit(row.totalMemSize)}}</td>
			<td class="text-center">{{= CU.toMegaByteUnit(row.totalDiskSize)}}</td>
			<td class="text-center">{{= row.cpuCount/100}}</td>
			<td class="text-center">{{= CU.toMegaByteUnit(row.memSize)}}</td>
			<td class="text-center">{{= CU.toMegaByteUnit(row.diskSize)}}</td>
			<td class="text-center">
				<a href="<%=ContextPath%>/dispatch/mc/020601?resId={{= row.id}}&dataCenterId={{= row.dataCenterId}}&resCenterId={{= row.resCenterId}}&netZoneId={{= row.netZoneId}}&pageNum={{= pageNum}}" class="table-link" title="变更记录">
					<span class="fa-stack">
						<i class="fa fa-square fa-stack-2x"></i>
						<i class="fa fa-search-plus fa-stack-1x fa-inverse"></i>
					</span>
				</a>
			</td>
		</tr>
{{/each}}
</script>




<jsp:include page="/layout/jsp/footer.jsp"></jsp:include>
