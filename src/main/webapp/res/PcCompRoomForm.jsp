<%@ page contentType="text/html; charset=utf-8"%>
<%@page import="com.binary.core.util.BinaryUtils"%>

<%
String ContextPath = request.getContextPath();
%>

<jsp:include page="/layout/jsp/head.jsp"></jsp:include>


<!-- 正文 -->
<div class="main-box">
	<header class="main-box-header clearfix"> </header>
	<div class="main-box-body clearfix">
		<form class="form-horizontal" role="form" id="form_computerRoom">
			<div class="form-group">
				<label for="roomCode" class="col-lg-2 control-label">机房编号<font color="red">*</font>:</label>
				<div class="col-lg-5">
					<input type="text" name="roomCode" class="form-control" id="roomCode" required pattern="([0-9]|[a-zA-Z]|[_]|[-]){1,40}" placeholder="必填">
				</div>
				<div class="col-lg-5">
					<span>1-40位数字字母下划线或中线的组合</span>
				</div>
			</div>
			<div class="form-group">
				<label for="roomName" class="col-lg-2 control-label">机房名称<font color="red">*</font>:</label>
				<div class="col-lg-5">
					<input type="text" name="roomName" class="form-control" id="roomName" required pattern=".{1,50}" placeholder="必填">
				</div>
				<div class="col-lg-5">
					<span>1-50位</span>
				</div>
			</div>
			<div class="form-group">
				<label for="roomAddr" class="col-lg-2 control-label">机房地址:</label>
				<div class="col-lg-5">
					<input type="text" name="roomAddr" class="form-control" id="roomAddr" pattern=".{1,100}" placeholder="机房地址">
				</div>
				<div class="col-lg-5">
					<span>1-100位</span>
				</div>
			</div>
			<div class="form-group">
				<label for="contactName" class="col-lg-2 control-label">机房联系人:</label>
				<div class="col-lg-5">
					<input type="text" name="contactName" class="form-control" id="contactName" pattern=".{1,20}"  placeholder="机房联系人">
				</div>
				<div class="col-lg-5">
					<span>1-20位</span>
				</div>
			</div>
			<div class="form-group">
				<label for="contactPhone" class="col-lg-2 control-label">机房联系电话:</label>
				<div class="col-lg-5">
					<input type="text" name="contactPhone" class="form-control" id="contactPhone" pattern=".{1,20}" placeholder="机房联系电话">
				</div>
				<div class="col-lg-5">
					<span></span>
				</div>
			</div>
			<div class="form-group">
				<label for="contactPhone2" class="col-lg-2 control-label">机房联系电话2:</label>
				<div class="col-lg-5">
					<input type="text" name="contactPhone2" class="form-control" id="contactPhone2" pattern=".{1,20}" placeholder="机房联系电话2">
				</div>
				<div class="col-lg-5">
					<span></span>
				</div>
			</div>
			<div class="form-group">
				<label for="contactEmail" class="col-lg-2 control-label">机房联系邮箱<font color="red">*</font>:</label>
				<div class="col-lg-5">
					<input type="email" name="contactEmail" class="form-control" id="contactEmail" required placeholder="必填">
				</div>
				<div class="col-lg-5">
					<span>示例:example@email.com</span>
				</div>
			</div>
			<div class="form-group">
				<label for="contactEmail" class="col-lg-2 control-label">是否有效:</label>
				<div class="col-lg-1">
					<input type="checkbox" name="status" id="status" checked="checked">
				</div>
				<div class="col-lg-11">
					<span></span>
				</div>
			</div>
			<div class="form-group">
				<label for="remark" class="col-lg-2 control-label">机房描述:</label>
				<div class="col-lg-5">
					<textarea name="remark" rows="3" cols="3" class="form-control" id="remark" maxlength="100" placeholder="机房描述"></textarea>
				</div>
				<div class="col-lg-5">
					<span>1-100位</span>
				</div>
			</div>
			<div class="form-group">
				<div class="col-lg-offset-2 col-lg-10">
					<button type="submit" id="btn_submit" class="btn btn-success">提交</button>
				</div>
			</div>
		</form>
	</div>
</div>

<jsp:include page="/layout/jsp/footer.jsp"></jsp:include>
