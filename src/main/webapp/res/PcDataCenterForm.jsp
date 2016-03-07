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
		<form class="form-horizontal" role="form" id="form_dataCenter">
			<div class="form-group">
				<label for="code" class="col-lg-2 control-label">数据中心代码<font color="red">*</font>:</label>
				<div class="col-lg-5">
					<input type="text" name="code" class="form-control" id="code" required pattern="([0-9]|[a-zA-Z]|[_]|[-]){1,40}" placeholder="必填">
				</div>
				<div class="col-lg-5">
					<span>1-40位数字字母下划线或中线的组合</span>
				</div>
			</div>
			<div class="form-group">
				<label for="name" class="col-lg-2 control-label">数据中心名称<font color="red">*</font>:</label>
				<div class="col-lg-5">
					<input type="text" name="name" class="form-control" id="name" required pattern=".{1,50}" placeholder="必填">
				</div>
				<div class="col-lg-5">
					<span>1-50位</span>
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
				<label for="remark" class="col-lg-2 control-label">描述:</label>
				<div class="col-lg-5">
					<textarea name="remark" rows="3" cols="3" class="form-control" id="remark" maxlength="50" placeholder="备注"></textarea>
				</div>
				<div class="col-lg-5">
					<span>1-200位</span>
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
