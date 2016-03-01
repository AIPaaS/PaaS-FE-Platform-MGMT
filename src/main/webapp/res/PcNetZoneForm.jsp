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
		<form class="form-horizontal" role="form" id="form_netZone">
			<div class="form-group">
				<label for="sel_dataCenter" class="col-lg-2 control-label">所属数据中心<font color="red">*</font>:</label>
				<div class="col-lg-5">
					<select id="sel_dataCenter" required="required" class="form-control">
					</select>
				</div>
				<div class="col-lg-5">
					<span></span>
				</div>
			</div>
			<div class="form-group">
				<label for="sel_resCenter" class="col-lg-2 control-label">所属资源中心<font color="red">*</font>:</label>
				<div class="col-lg-5">
					<select id="sel_resCenter" required="required" class="form-control">
					</select>
				</div>
				<div class="col-lg-5">
					<span></span>
				</div>
			</div>
			<div class="form-group">
				<label for="zoneCode" class="col-lg-2 control-label">区域代码<font color="red">*</font>:</label>
				<div class="col-lg-5">
					<input type="text" name="zoneCode" class="form-control" id="zoneCode" required pattern="([0-9]|[a-zA-Z]|[_]|[-]){1,40}" placeholder="必填">
				</div>
				<div class="col-lg-5">
					<span>1-40位数字字母下划线的组合</span>
				</div>
			</div>
			<div class="form-group">
				<label for="zoneName" class="col-lg-2 control-label">区域名称<font color="red">*</font>:</label>
				<div class="col-lg-5">
					<input type="text" name="zoneName" class="form-control" id="zoneName" required pattern=".{1,50}" placeholder="必填">
				</div>
				<div class="col-lg-5">
					<span>1-50位</span>
				</div>
			</div>
			<div class="form-group">
				<label for="netSegExp" class="col-lg-2 control-label">网段表达式<font color="red">*</font>:</label>
				<div class="col-lg-5">
					<input type="text" name="netSegExp" class="form-control" id="netSegExp" required pattern=".{1,100}" placeholder="必填">
				</div>
				<div class="col-lg-5">
					<span>1-100位</span>
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
				<label for="netSegDesc" class="col-lg-2 control-label">网段描述:</label>
				<div class="col-lg-5">
					<textarea name="netSegDesc" rows="3" cols="3" class="form-control" id="netSegDesc" maxlength="50" placeholder="机房描述"></textarea>
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
