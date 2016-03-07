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
		<form class="form-horizontal" role="form" id="form_computer">
			<div class="form-group">
				<label for="code" class="col-lg-2 control-label">服务器编号<font color="red">*</font>:</label>
				<div class="col-lg-5">
					<input type="text" id="code" name="code" class="form-control" required pattern="([0-9]|[a-zA-Z]|[_]|[-]){1,40}" placeholder="必填">
				</div>
				<div class="col-lg-5">
					<span>1-40位数字字母下划线或中线的组合</span>
				</div>
			</div>
			<div class="form-group">
				<label for="ip" class="col-lg-2 control-label">服务器IP<font color="red">*</font>:</label>
				<div class="col-lg-5">
					<input type="text" id="ip" name="ip" class="form-control" required pattern="(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])" placeholder="必填">
				</div>
				<div class="col-lg-5">
					<span>示例:10.1.1.1</span>
				</div>
			</div>
			<div class="form-group">
				<label for="sel_compRoom" class="col-lg-2 control-label">所属机房<font color="red">*</font>:</label>
				<div class="col-lg-5">
					<select id="roomId" name="roomId" required class="form-control">
					</select>
				</div>
				<div class="col-lg-5">
					<span></span>
				</div>
			</div>
			<div class="form-group">
				<label for="sel_dataCenter" class="col-lg-2 control-label">所属数据中心<font color="red">*</font>:</label>
				<div class="col-lg-5">
					<select id="dataCenterId" name="dataCenterId" required class="form-control">
					</select>
				</div>
				<div class="col-lg-5">
					<span></span>
				</div>
			</div>
			<div class="form-group">
				<label for="sel_resCenter" class="col-lg-2 control-label">所属资源中心<font color="red">*</font>:</label>
				<div class="col-lg-5">
					<select id="resCenterId" name="resCenterId" required class="form-control">
					</select>
				</div>
				<div class="col-lg-5">
					<span></span>
				</div>
			</div>
			<div class="form-group">
				<label for="sel_netZone" class="col-lg-2 control-label">所属网络区域<font color="red">*</font>:</label>
				<div class="col-lg-5">
					<select id="netZoneId" name="netZoneId" required class="form-control">
					</select>
				</div>
				<div class="col-lg-5">
					<span></span>
				</div>
			</div>
			<div class="form-group">
				<label for="cpuCount" class="col-lg-2 control-label">CPU个数<font color="red">*</font>:</label>
				<div class="col-lg-5">
					<input type="text" name="cpuCount" required class="form-control" pattern="^\d{1,8}$" maxlength="8" id="cpuCount" placeholder="必填">
				</div>
				<div class="col-lg-5">
					<span></span>
				</div>
			</div>
			<div class="form-group">
				<label for="cpuFrequency" class="col-lg-2 control-label">CPU主频:</label>
				<div class="col-lg-5">
					<input type="text" name="cpuFrequency" class="form-control" maxlength="16" id="cpuFrequency">
				</div>
				<div class="col-lg-5">
					<span>1-16位</span>
				</div>
			</div>
			<div class="form-group">
				<label for="cpuModel" class="col-lg-2 control-label">CPU型号:</label>
				<div class="col-lg-5">
					<input type="text" name="cpuModel" class="form-control" id="cpuModel">
				</div>
				<div class="col-lg-5">
					<span>1-100位</span>
				</div>
			</div>
			<div class="form-group">
				<label for="memSize" class="col-lg-2 control-label">内存大小<font color="red">*</font>:</label>
				<div class="col-lg-5">
					<input type="text" name="memSize" pattern="\d{1,16}" maxlength="16" required class="form-control" id="memSize" placeholder="必填">
				</div>
				<div class="col-lg-5">
					<span>单位:G</span>
				</div>
			</div>
			<div class="form-group">
				<label for="number" class="col-lg-2 control-label">硬盘大小<font color="red">*</font>:</label>
				<div class="col-lg-5">
					<input type="text" name="diskSize" pattern="\d{1,16}" maxlength="16" required class="form-control" id="diskSize" placeholder="必填">
				</div>
				<div class="col-lg-5">
					<span>单位:G</span>
				</div>
			</div>
			<div class="form-group">
				<label for="number" class="col-lg-2 control-label">带宽:</label>
				<div class="col-lg-5">
					<input type="text" name="bandWidth" pattern="\d{1,16}" maxlength="16" class="form-control" id="bandWidth">
				</div>
				<div class="col-lg-5">
					<span>单位:K</span>
				</div>
			</div>
			<div class="form-group">
				<label for="location" class="col-lg-2 control-label">所在机架:</label>
				<div class="col-lg-5">
					<input type="text" name="location" class="form-control" id="location" pattern=".{1,50}">
				</div>
				<div class="col-lg-5">
					<span>1-50位</span>
				</div>
			</div>
			<div class="form-group">
				<label for="osName" class="col-lg-2 control-label">操作系统:</label>
				<div class="col-lg-5">
					<input type="text" name="osName" class="form-control" maxlength="50" id="osName">
				</div>
				<div class="col-lg-5">
					<span></span>
				</div>
			</div>
			<div class="form-group">
				<label for="loginName" class="col-lg-2 control-label">登录账号:</label>
				<div class="col-lg-5">
					<input type="text" name="loginName" class="form-control" maxlength="20" id="loginName">
				</div>
				<div class="col-lg-5">
					<span></span>
				</div>
			</div>
			<div class="form-group">
				<label for="loginPwd" class="col-lg-2 control-label">登录密码:</label>
				<div class="col-lg-5">
					<input type="password" name="loginPwd" class="form-control" maxlength="20" id="loginPwd">
				</div>
				<div class="col-lg-5">
					<span></span>
				</div>
			</div>
			<div class="form-group">
				<label for="exSwitch" class="col-lg-2 control-label">交换机:</label>
				<div class="col-lg-5">
					<input type="text" name="exSwitch" class="form-control" maxlength="50" id="exSwitch">
				</div>
				<div class="col-lg-5">
					<span></span>
				</div>
			</div>
			<div class="form-group">
				<label for="subNet" class="col-lg-2 control-label">所在子网:</label>
				<div class="col-lg-5">
					<input type="text" name="subNet" class="form-control" maxlength="50" id="subNet">
				</div>
				<div class="col-lg-5">
					<span></span>
				</div>
			</div>
			<div class="form-group">
				<label for="modem" class="col-lg-2 control-label">机型:</label>
				<div class="col-lg-5">
					<input type="text" name="modem" class="form-control" maxlength="50" id="modem">
				</div>
				<div class="col-lg-5">
					<span></span>
				</div>
			</div>
			<div class="form-group">
				<label for="physicalComputer" class="col-lg-2 control-label">物理机:</label>
				<div class="col-lg-5">
					<input type="text" name="physicalComputer" class="form-control" maxlength="50" id="physicalComputer">
				</div>
				<div class="col-lg-5">
					<span></span>
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
					<textarea name="remark" rows="3" cols="3" class="form-control" id="remark" maxlength="100"></textarea>
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
