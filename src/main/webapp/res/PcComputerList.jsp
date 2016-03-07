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
						&nbsp;&nbsp;编号:
					</div>
					<div class="form-group pull-left">
						<input type="text" name="code" id="code" class="form-control" style="width:110px;">
					</div>
					<div class="form-group pull-left">
						IP:
					</div>
					<div class="form-group pull-left">
						<input type="text" name="ip" id="ip" class="form-control" style="width:110px;">
					</div>
					<div class="form-group pull-left">
						所属机房:
					</div>
					<div class="form-group pull-left">
						<select id="sel_compRoom" class="form-control" style="width:110px;">
						</select>
					</div>
					<div class="form-group pull-left">
						所属区域:
					</div>
					<div class="form-group pull-left">
						<input type="text" name="forcenter" id="forcenter" class="form-control" style="width:110px;" readOnly >
					</div>
				</div>
				<button class="btn btn-primary pull-left" id="btn_query"><i class="fa fa-search fa-lg"></i> 查询</button>
				<button id="btn_add" href="###" class="btn btn-primary pull-left"> <i class="fa fa-plus-circle fa-lg"></i> 添加</button>
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
								<th class="text-center">是否有效</th>
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
				</div>
				
			</div>
		</div>
	</div>
</div>


<div id="sel_forcenter" style="width:300px;position:absolute;display:none;"></div>


<!-- 弹出框（Modal） -->
<div class="modal fade" id="div_compTags" tabindex="-1" role="dialog" aria-hidden="true">
   <div class="modal-dialog">
      <div class="modal-content">
         <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="div_compTagsTitle"></h4>
         </div>
         <div class="modal-body">
            <table class="table">
				<thead>
					<tr>
						<th class="text-center">标签名</th>
						<th class="text-center">标签值</th>
						<th class="text-center">描述</th>
						<th class="text-center">
							<a id="a_add_tag" href="###" class="table-link" title="添加标签">
								<span class="fa-stack">
									<i class="fa fa-square fa-stack-2x"></i>
									<i class="fa fa-plus fa-stack-1x fa-inverse"></i>
								</span>
							</a>
						</th>
					</tr>
				</thead>
				<tbody id="compTagsTable">
					
				</tbody>
				
			</table>
			<div class="modal-footer" >
	        <button id="btn_Ok" type="button" class="btn btn-success ok" data-toggle="tooltip-hide" data-placement="left"><i class="fa fa-save fa-lg"></i> 保存</button>
      	</div>
         </div>
      </div>
	</div>
</div>

<script id="pcComputerTable-tmpl" type="text/x-jquery-tmpl">
	{{each(i,row) data}}
		<tr>
			<td class="text-center"><a href="<%=ContextPath%>/dispatch/mc/020501?id={{= row.id}}&pageNum={{= pageNum}}">{{= row.code}}</a></td>
			<td class="text-center">{{= row.ip}}</td>
			<td class="text-center">
				{{= PU.getDropValue("DV_COMP_ROOM_CODE",row.roomId,false)}}
			</td>
			<td class="text-center">
				{{= PU.getDropValue("DV_DATA_CENTER_CODE",row.dataCenterId,false)}}
			</td>
			<td class="text-center">
				{{= PU.getDropValue("DV_RES_CENTER_CODE",row.resCenterId,false)}}
			</td>
			<td class="text-center">
				{{= PU.getDropValue("DV_NET_ZONE_CODE",row.netZoneId,false)}}
			</td>
			
			<td class="text-center">
				{{if !CU.isEmpty(row.cpuCount)}}
					{{= row.cpuCount/100}}
				{{/if}}
			</td>
			<td class="text-center">{{= CU.toMegaByteUnit(row.memSize)}}</td>
			<td class="text-center">{{= CU.toMegaByteUnit(row.diskSize)}}</td>
			<td class="text-center">{{= row.osName}}</td>
			<td class="text-center">
				{{if row.status==1}}
					是
				{{else}}
					否
				{{/if}}
			</td>
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
