<%@ page contentType="text/html; charset=utf-8"%>

<%
String ContextPath = request.getContextPath();
%>

<jsp:include page="/layout/jsp/head.jsp"></jsp:include>



<!-- 正文 -->

<div class="row">
	<div class="col-lg-12">
		<div class="main-box clearfix">
			<header class="main-box-header clearfix">
				<h2 class="pull-left"><font color="blue"><span id="span_title"></span></font> 资源变更记录
				&nbsp;&nbsp;&nbsp;<a id="a_backToResList" href="###"><i class="fa fa-rotate-left"></i> 返回</a>
				</h2>
			</header>
			<div class="main-box-body clearfix">
				<div class="table-responsive">
					<table class="table">
						<thead>
							<tr>
								<th class="text-center">变更时间</th>
								<th class="text-center">变更类型</th>
								<th class="text-center">变更前资源状况</th>
								<th class="text-center">变更后资源状况</th>
								<th class="text-left">描述</th>
							</tr>
						</thead>
						<tbody id="resChangeLogTable">
							
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

<script id="resChangeLogTable-tmpl" type="text/x-jquery-tmpl">
	{{each(i,row) data}}
		<tr>
			<td class="text-center">
				{{= CU.toStringDateTime(row.upTime)}}
			</td>
			<td class="text-center">
				{{html PU.getDropValue("V_RES_CENTER_RES_UP_TYPE", row.upType, true)}}
			</td>
			<td class="text-center">
				C: {{= row.beforeCpuCount/100}}个，M: {{= CU.toMegaByteUnit(row.beforeMemSize)}}，D: {{= CU.toMegaByteUnit(row.beforeDiskSize)}}
			</td>
			<td class="text-center">
				{{if row.afterCpuCount>row.beforeCpuCount}}
					<font color="#008800">C: {{= row.afterCpuCount/100}}个</font>
				{{else row.afterCpuCount<row.beforeCpuCount}}
					<font color="#FF0000">C: {{= row.afterCpuCount/100}}个</font>
				{{else}}
					C: {{= row.afterCpuCount/100}}个
				{{/if}}
				，
				{{if row.afterMemSize>row.beforeMemSize}}
					<font color="#008800">M: {{= CU.toMegaByteUnit(row.afterMemSize)}}</font>
				{{else row.afterMemSize<row.beforeMemSize}}
					<font color="#FF0000">M: {{= CU.toMegaByteUnit(row.afterMemSize)}}</font>
				{{else}}
					M: {{= CU.toMegaByteUnit(row.afterMemSize)}}
				{{/if}}				
				，
				{{if row.afterDiskSize>row.beforeDiskSize}}
					<font color="#008800">D: {{= CU.toMegaByteUnit(row.afterDiskSize)}}</font>
				{{else row.afterDiskSize<row.beforeDiskSize}}
					<font color="#FF0000">D: {{= CU.toMegaByteUnit(row.afterDiskSize)}}</font>
				{{else}}
					D: {{= CU.toMegaByteUnit(row.afterDiskSize)}}
				{{/if}}
			</td>
			<td class="text-left">{{= row.upDesc}}</td>
		</tr>
{{/each}}
</script>




<jsp:include page="/layout/jsp/footer.jsp"></jsp:include>
