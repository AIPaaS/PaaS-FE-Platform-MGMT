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
		<form class="form-horizontal" role="form" id="form_resCenter">
			<div class="form-group">
				<label for="dataCenterId" class="col-lg-2 control-label">所属数据中心<font color="red">*</font>:</label>
				<div class="col-lg-5">
					<select id="dataCenterId" name="dataCenterId" required class="form-control"></select>
				</div>
				<div class="col-lg-5">
					<span></span>
				</div>
			</div>
			<div class="form-group">
				<label for="resCode" class="col-lg-2 control-label">资源中心代码<font color="red">*</font>:</label>
				<div class="col-lg-5">
					<input type="text" name="resCode" class="form-control" id="resCode" required pattern="([0-9]|[a-zA-Z]|[_]|[-]){1,40}" placeholder="必填">
				</div>
				<div class="col-lg-5">
					<span>1-40位数字字母下划线或中线的组合</span>
				</div>
			</div>
			<div class="form-group">
				<label for="resName" class="col-lg-2 control-label">资源中心名称<font color="red">*</font>:</label>
				<div class="col-lg-5">
					<input type="text" name="resName" class="form-control" id="resName" required pattern=".{1,50}" placeholder="必填">
				</div>
				<div class="col-lg-5">
					<span>1-50位</span>
				</div>
			</div>
			<div class="form-group">
				<label for="resName" class="col-lg-2 control-label">环境类型<font color="red">*</font>:</label>
				<div class="col-lg-5">
					<select id="envType" name="envType" required class="form-control">
					</select>
				</div>
				<div class="col-lg-5">
					<span></span>
				</div>
			</div>
			<div class="form-group">
				<label for="imgRespId" class="col-lg-2 control-label">镜像库<font color="red">*</font>:</label>
				<div class="col-lg-5">
					<select id="imgRespId" name="imgRespId" required class="form-control"></select>
				</div>
				<div class="col-lg-5">
					<span></span>
				</div>
			</div>
			<div class="form-group">
				<label for="imagePath" class="col-lg-2 control-label">镜像地址:<font color="red">*</font>:</label>
				<div class="col-lg-5">
					<input type="text" name="imagePath" class="form-control" id="imagePath" required pattern=".{1,200}" placeholder="必填">
				</div>
				<div class="col-lg-5">
					<span></span>
				</div>
			</div>
			<div class="form-group">
				<label for="domain" class="col-lg-2 control-label">集群内部服务域名后缀:<font color="red">*</font>:</label>
				<div class="col-lg-5">
					<input type="text" name="domain" class="form-control" id="domain" required pattern=".{1,40}" placeholder="必填">
				</div>
				<div class="col-lg-5">
					<span>如：inner.com</span>
				</div>
			</div>
			<div class="form-group">
				<label for="externalDomain" class="col-lg-2 control-label">非mesos集群管理域名:<font color="red">*</font>:</label>
				<div class="col-lg-5">
					<input type="text" name="externalDomain" class="form-control" id="externalDomain" required pattern=".{1,40}" placeholder="必填">
				</div>
				<div class="col-lg-5">
					<span>如：out.com</span>
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
