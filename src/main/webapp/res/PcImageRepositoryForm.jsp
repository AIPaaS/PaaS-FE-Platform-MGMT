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
		<form class="form-horizontal" role="form" id="form_imageResp">
			<div class="form-group">
				<label for="imgRespCode" class="col-lg-2 control-label">镜像库代码<font color="red">*</font>:</label>
				<div class="col-lg-5">
					<input type="text" name="imgRespCode" class="form-control" id="imgRespCode" required pattern="([0-9]|[a-zA-Z]|[_]){1,40}" placeholder="必填">
				</div>
				<div class="col-lg-5">
					<span>1-40位数字、字母或下划线的组合</span>
				</div>
			</div>
			<div class="form-group">
				<label for="roomId" class="col-lg-2 control-label">所属机房<font color="red">*</font>:</label>
				<div class="col-lg-5">
					<select id="roomId" name="roomId" required class="form-control"></select>
				</div>
				<div class="col-lg-5">
					<span></span>
				</div>
			</div>
			<div class="form-group">
				<label for="imgRespType" class="col-lg-2 control-label">是否快照镜像库:</label>
				<div class="col-lg-1">
					<input type="checkbox" name="imgRespType" id="imgRespType">
				</div>
				<div class="col-lg-11">
					<span></span>
				</div>
			</div>
			<div class="form-group">
				<label for="imgRespUrl" class="col-lg-2 control-label">镜像库地址<font color="red">*</font>:</label>
				<div class="col-lg-5">
					<input type="text" name="imgRespUrl" class="form-control" id="imgRespUrl" required pattern=".{1,500}" placeholder="必填">
				</div>
				<div class="col-lg-5">
					<span>1-100位</span>
				</div>
			</div>
			<div class="form-group">
				<label for="imgRespUser" class="col-lg-2 control-label">镜像库账号<font color="red">*</font>:</label>
				<div class="col-lg-5">
					<input type="text" name="imgRespUser" class="form-control" id="imgRespUser" required pattern=".{1,100}" placeholder="必填">
				</div>
				<div class="col-lg-5">
					<span>1-100位</span>
				</div>
			</div>
			<div class="form-group">
				<label for="imgRespPwd" class="col-lg-2 control-label">镜像库密码<font color="red">*</font>:</label>
				<div class="col-lg-5">
					<input type="password" name="imgRespPwd" class="form-control" id="imgRespPwd" required pattern=".{1,100}" placeholder="必填">
				</div>
				<div class="col-lg-5">
					<span></span>
				</div>
			</div>
			<div class="form-group">
				<label for="remark" class="col-lg-2 control-label">备注:</label>
				<div class="col-lg-5">
					<textarea name="remark" rows="3" cols="3" class="form-control" id="remark" maxlength="250"></textarea>
				</div>
				<div class="col-lg-5">
					<span>1-250位</span>
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
