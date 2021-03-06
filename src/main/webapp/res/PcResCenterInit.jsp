<%@ page contentType="text/html; charset=utf-8"%>

<%
String ContextPath = request.getContextPath();
%>

<jsp:include page="/layout/jsp/head.jsp"></jsp:include>


<div class="row">
	<div class="col-lg-12">
		<div class="main-box clearfix">
			<div class="filter-block pull-left">
				<div class="pull-left">
					<div class="form-group pull-left">
						&nbsp;&nbsp;&nbsp;&nbsp;服务器编号:
					</div>
					<div class="form-group pull-left">
						<select id="sel_resCenter" class="form-control" style="width:160px;">
							<option value="99">BIUaa资源中心</option>
						</select>
					</div>

					<div class="form-group  pull-left"">
						<label for="contactEmail" class="col-lg-2 control-label">是否通过代理构建:</label>
						<div class="col-lg-1">
							<input type="checkbox" name="status" id="status"
								checked="checked">
						</div>
						<div class="col-lg-11">
							<span></span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>



<!-- 正文 -->
<div class="row">
	<div class="col-lg-12">
		<div class="main-box clearfix">
			<div class="main-box-body clearfix">
			<div>核心区</div>
				<div class="table-responsive">
					<table class="table">
						<thead>
							<tr>
								<th class="text-center">服务器编号</th>
								<th class="text-center">服务器IP</th>
								<th class="text-center">所属机房</th>
								<th class="text-center">数据中心</th>
								<th class="text-center">资源中心</th>
								<th class="text-center">网络区域</th>
								<th class="text-center">CPU个数</th>
								<th class="text-center">内存大小</th>
								<th class="text-center">硬盘大小</th>
								<th class="text-center">操作系统</th>
								<th class="text-center">标签</th>
							</tr>
						</thead>
						<tbody id="pcComputerTable">
							
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
				<button class="btn btn-primary pull-left" id="btn_init">
					<i class="fa fa-lg"></i> 初始化
				</button>
			</div>
		</div>
	</div>
</div>

<!-- <div class="row" > -->
<!-- 	<div class="col-lg-12"> -->
<!-- 		<div class="main-box clearfix"> -->
<!-- 			<div class="main-box-body clearfix"> -->
<!-- 				<button class="btn btn-primary pull-left" id="btn_init"> -->
<!-- 					<i class="fa fa-lg"></i> 初始化 -->
<!-- 				</button> -->
<!-- 			</div> -->
<!-- 		</div> -->
<!-- 	</div> -->
<!-- </div> -->

	<div id="sel_forcenter"
		style="width: 300px; position: absolute; display: none;"></div>

	<div class="row" id="div-log" style="display: none">
		<div class="col-lg-12">
			<div class="main-box clearfix">
				<div>日志</div>
				 <div class="filter-block pull-left">
					<div class="form-group pull-left">
						<div>
							<textarea id="logWindow" cols="100%" rows="15%" value=""
								style="	background-color: black;border-style: solid;color: white; font-size: 15px;"></textarea>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<script id="pcComputerTable-tmpl" type="text/x-jquery-tmpl">
	{{each(i,row) slavePartList}}
		<tr>
			<td class="text-center">{{= row.code}}</td>
			<td class="text-center">{{= row.ip}}</td>
			<td class="text-center">
				{{= row.roomId}}
			</td>
			<td class="text-center">{{= row.dataCenterId}}
			</td>
			<td class="text-center">{{= row.resCenterId}}
			</td>
			<td class="text-center">{{= row.netZoneId}}
			</td>
			
			<td class="text-center">
				{{if !CU.isEmpty(row.cpuCount)}}
					{{= row.cpuCount/100}}
				{{/if}}
			</td>
			<td class="text-center">{{= row.memSize}}</td>
			<td class="text-center">{{= row.diskSize}}</td>
			<td class="text-center">{{= row.osName}}</td>
			<td class="text-center">
				<a id="a_comp_tags_{{= row.id}}" href="###" class="table-link" title="标签详情">
					<span class="fa-stack">
						<i class="fa fa-square fa-stack-2x"></i>
						<i class="fa fa-tags fa-stack-1x fa-inverse"></i>
					</span>
				</a>
			</td>
	</tr>
			
{{/each}}
</script>

	<jsp:include page="/layout/jsp/footer.jsp"></jsp:include>