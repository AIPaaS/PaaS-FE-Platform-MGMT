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
						&nbsp;&nbsp;&nbsp;机房编号:
					</div>
					<div class="form-group pull-left">
						<input type="text" name="roomCode" id="roomCode" class="form-control">
					</div>
					<div class="form-group pull-left">
						机房名称:
					</div>
					<div class="form-group pull-left">
						<input type="text" name="roomName" id="roomName" class="form-control">
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
								<th class="text-center">机房编号</th>
								<th class="text-center">机房名称</th>
								<th class="text-center">机房地址</th>
								<th class="text-center">机房联系人</th>
								<th class="text-center">机房联系电话</th>
								<th class="text-center">机房联系电话2</th>
								<th class="text-center">机房联系邮箱</th>
								<th class="text-center">是否有效</th>
								<th class="text-center">机房描述</th>
							</tr>
						</thead>
						<tbody id="computerRoomTable">
							
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



<script id="computerRoomTable-tmpl" type="text/x-jquery-tmpl">
	{{each(i,row) data}}
		<tr>
			<td class="text-center"><a href="<%=ContextPath%>/dispatch/mc/020101?id={{= row.id}}&pageNum={{= pageNum}}">{{= row.roomCode}}</a></td>
			<td class="text-center">
				{{if row.roomName.length>10}}
					{{= subStr(row.roomName)}}
				{{else}}
					{{= row.roomName}}
				{{/if}}
			</td>
			<td class="text-center">
				{{if row.roomAddr.length>10}}
					{{= subStr(row.roomAddr)}}
				{{else}}
					{{= row.roomAddr}}
				{{/if}}
			</td>
			<td class="text-center">
				{{if row.contactName.length>10}}
					{{= subStr(row.contactName)}}
				{{else}}
					{{= row.contactName}}
				{{/if}}
			</td>
			<td class="text-center">
				{{if row.contactPhone.length>10}}
					{{= subStr(row.contactPhone)}}
				{{else}}
					{{= row.contactPhone}}
				{{/if}}
			</td>
			<td class="text-center">
				{{if row.contactPhone2.length>10}}
					{{= subStr(row.contactPhone2)}}
				{{else}}
					{{= row.contactPhone2}}
				{{/if}}
			</td>
			<td class="text-center">
				{{if row.contactEmail.length>10}}
					{{= subStr(row.contactEmail)}}
				{{else}}
					{{= row.contactEmail}}
				{{/if}}
			</td>
			<td class="text-center">
				{{if row.status==1}}
					是
				{{else}}
					否
				{{/if}}
			</td>
			<td class="text-center">
				{{if row.remark.length>10}}
					{{= subStr(row.remark)}}
				{{else}}
					{{= row.remark}}
				{{/if}}
			</td>
		</tr>
{{/each}}
</script>




<jsp:include page="/layout/jsp/footer.jsp"></jsp:include>
