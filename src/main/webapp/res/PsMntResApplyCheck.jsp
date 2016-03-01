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
						<input type="text" name="forcenter" id="forcenter" class="form-control" style="width:160px;" readOnly>
					</div>
					<div class="form-group pull-left">
						&nbsp;申请日期:
					</div>
					<div class="form-group pull-left">
						<input type="text" name="cdtApplyTime" id="cdtApplyTime" class="form-control" style="width:160px;" >
					</div>
					<div class="form-group pull-left">
						&nbsp;申请状态:
					</div>
					<div class="form-group pull-left">
						<select type="text" name="cdtStatus" id="cdtStatus" class="form-control" style="width:160px;"></select>
					</div>
				</div>
				<button class="btn btn-primary pull-left" id="btn_query"><i class="fa fa-search fa-lg"></i> 查询</button>
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
								<th class="text-center">申请单号</th>
								<th class="text-center">申请租户</th>
								<th class="text-center">数据中心</th>
								<th class="text-center">资源中心</th>
								<th class="text-center">网络区域</th>
								<th class="text-center">申请配额</th>
								<th class="text-center">申请时间</th>
								<th class="text-center">申请状态</th>
								<th class="text-center">申请备注</th>
								<th class="text-center">审批情况</th>
							</tr>
						</thead>
						<tbody id="applyTabList">
							
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


<script id="applyTabList-tmpl" type="text/x-jquery-tmpl">
	{{each(i,row) data}}
		<tr>
			<td class="text-center">{{= row.apply.code}}</td>
			<td class="text-center">[{{= row.merchent.mntCode}}] {{= row.merchent.mntName}}</td>
			<td class="text-center">{{= PU.getDropValue("DV_DATA_CENTER_CODE",row.apply.dataCenterId,false)}}</td>
			<td class="text-center">{{= PU.getDropValue("DV_RES_CENTER_CODE",row.apply.resCenterId,false)}}</td>
			<td class="text-center">{{= PU.getDropValue("DV_NET_ZONE_CODE",row.apply.netZoneId,false)}}</td>
			<td class="text-center">
					C: {{= row.apply.cpuCount/100}}，M: {{= CU.toMegaByteUnit(row.apply.memSize)}}，D: {{= CU.toMegaByteUnit(row.apply.diskSize)}}
			</td>
			<td class="text-center">{{= CU.toStringDateTime(row.apply.applyTime)}}</td>
			<td class="text-center">{{html PU.getDropValue("V_PS_RES_APPLY_CHECK_STATUS",row.apply.status,true)}}</td>
			<td class="text-center">{{= row.apply.remark}}</td>
			<td class="text-center">
				{{if row.apply.status==0}}
					<a id="btn_checking_{{= row.apply.id}}" href="###" class="table-link" title="审核">
						<span class="fa-stack">
							<i class="fa fa-square fa-stack-2x"></i>
							<i class="fa fa-gavel fa-stack-1x fa-inverse"></i>
						</span>
					</a>
				{{else row.apply.status==1 || row.apply.status==2}}
					<a id="btn_check_view_{{= row.apply.id}}" href="###" class="table-link" title="审批情况">
						<span class="fa-stack">
							<i class="fa fa-square fa-stack-2x"></i>
							<i class="fa fa-search-plus fa-stack-1x fa-inverse"></i>
						</span>
					</a>
				{{/if}}
			</td>
		</tr>
	{{/each}}
</script>






<!-- 弹出框（Modal） -->
<div class="modal fade" id="div_checkForm" tabindex="-1" role="dialog" aria-hidden="true">
   <div class="modal-dialog" style="width:600px;">
      <div class="modal-content">
         <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="div_checkFormTitle">
              	 
            </h4>
         </div>
         <div class="modal-body">
            <textarea id="winCheckDesc" name="winCheckDesc" rows="6" class="form-control" placeholder="审核意见"></textarea>
         </div>
         <div class="modal-footer" >
	         <button id="btn_check_pass" type="button" class="btn btn-lg btn-success ok" >审核通过</button>
			<button id="btn_check_back" type="button" class="btn btn-lg btn-danger cancel" >审核退回</button>
      	</div>
      </div>
	</div>
</div>



<!-- 弹出框（Modal） -->
<div class="modal fade" id="div_checkView" tabindex="-1" role="dialog" aria-hidden="true">
   <div class="modal-dialog" style="width:600px;">
      <div class="modal-content">
         <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h4 class="modal-title" id="div_checkViewTitle">
              	 
            </h4>
         </div>
         <div class="modal-body">
            <table class="table" id="tabCheckView">
				
			</table>
         </div>
      </div>
	</div>
</div>




<script id="tabCheckView-tmpl" type="text/x-jquery-tmpl">
			<tr>
				<td class="text-right" style="width:120px;">审核人：</td>
				<td class="text-left">{{= apply.checkerName}}</td>
			</tr>
			<tr>
				<td class="text-right">审核时间：</td>
				<td class="text-left">{{= CU.toStringDateTime(apply.checkTime)}}</td>
			</tr>
			<tr>
				<td class="text-right">审核意见：</td>
				<td class="text-left">{{html replaceDesc(apply.checkDesc)}}</td>
			</tr>
</script>


<jsp:include page="/layout/jsp/footer.jsp"></jsp:include>
