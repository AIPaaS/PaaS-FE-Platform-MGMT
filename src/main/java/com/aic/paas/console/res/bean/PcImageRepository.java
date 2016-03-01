package com.aic.paas.console.res.bean;




import com.binary.framework.bean.EntityBean;


/**
 * mapping-table: 镜像库表[PC_IMAGE_REPOSITORY]
 */
public class PcImageRepository implements EntityBean {
	private static final long serialVersionUID = 1L;


	/**
	 * mapping-field: ID[ID]
	 */
	private Long id;


	/**
	 * mapping-field: 镜像库代码[IMG_RESP_CODE]
	 */
	private String imgRespCode;


	/**
	 * mapping-field: 所属机房[ROOM_ID]
	 */
	private Long roomId;


	/**
	 * mapping-field: 镜像库类型[IMG_RESP_TYPE]
	 * 1=快照镜像库 2=非快照镜像库
	 */
	private Integer imgRespType;


	/**
	 * mapping-field: 镜像库地址[IMG_RESP_URL]
	 */
	private String imgRespUrl;


	/**
	 * mapping-field: 镜像库账号[IMG_RESP_USER]
	 */
	private String imgRespUser;


	/**
	 * mapping-field: 镜像库密码[IMG_RESP_PWD]
	 */
	private String imgRespPwd;


	/**
	 * mapping-field: 备注[REMARK]
	 */
	private String remark;


	/**
	 * mapping-field: 备用字段_1[CUSTOM_1]
	 */
	private Long custom1;


	/**
	 * mapping-field: 备用字段_2[CUSTOM_2]
	 */
	private Long custom2;


	/**
	 * mapping-field: 备用字段_3[CUSTOM_3]
	 */
	private Long custom3;


	/**
	 * mapping-field: 备用字段_4[CUSTOM_4]
	 */
	private String custom4;


	/**
	 * mapping-field: 备用字段_5[CUSTOM_5]
	 */
	private String custom5;


	/**
	 * mapping-field: 备用字段_6[CUSTOM_6]
	 */
	private String custom6;


	/**
	 * mapping-field: 数据状态[DATA_STATUS]
	 * 数据状态：1-正常 0-删除
	 */
	private Integer dataStatus;


	/**
	 * mapping-field: 创建时间[CREATE_TIME]
	 * yyyyMMddHHmmss
	 */
	private Long createTime;


	/**
	 * mapping-field: 修改时间[MODIFY_TIME]
	 * yyyyMMddHHmmss
	 */
	private Long modifyTime;




	public Long getId() {
		return this.id;
	}
	public void setId(Long id) {
		this.id = id;
	}


	public String getImgRespCode() {
		return this.imgRespCode;
	}
	public void setImgRespCode(String imgRespCode) {
		this.imgRespCode = imgRespCode;
	}


	public Long getRoomId() {
		return this.roomId;
	}
	public void setRoomId(Long roomId) {
		this.roomId = roomId;
	}


	public Integer getImgRespType() {
		return this.imgRespType;
	}
	public void setImgRespType(Integer imgRespType) {
		this.imgRespType = imgRespType;
	}


	public String getImgRespUrl() {
		return this.imgRespUrl;
	}
	public void setImgRespUrl(String imgRespUrl) {
		this.imgRespUrl = imgRespUrl;
	}


	public String getImgRespUser() {
		return this.imgRespUser;
	}
	public void setImgRespUser(String imgRespUser) {
		this.imgRespUser = imgRespUser;
	}


	public String getImgRespPwd() {
		return this.imgRespPwd;
	}
	public void setImgRespPwd(String imgRespPwd) {
		this.imgRespPwd = imgRespPwd;
	}


	public String getRemark() {
		return this.remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}


	public Long getCustom1() {
		return this.custom1;
	}
	public void setCustom1(Long custom1) {
		this.custom1 = custom1;
	}


	public Long getCustom2() {
		return this.custom2;
	}
	public void setCustom2(Long custom2) {
		this.custom2 = custom2;
	}


	public Long getCustom3() {
		return this.custom3;
	}
	public void setCustom3(Long custom3) {
		this.custom3 = custom3;
	}


	public String getCustom4() {
		return this.custom4;
	}
	public void setCustom4(String custom4) {
		this.custom4 = custom4;
	}


	public String getCustom5() {
		return this.custom5;
	}
	public void setCustom5(String custom5) {
		this.custom5 = custom5;
	}


	public String getCustom6() {
		return this.custom6;
	}
	public void setCustom6(String custom6) {
		this.custom6 = custom6;
	}


	public Integer getDataStatus() {
		return this.dataStatus;
	}
	public void setDataStatus(Integer dataStatus) {
		this.dataStatus = dataStatus;
	}


	public Long getCreateTime() {
		return this.createTime;
	}
	public void setCreateTime(Long createTime) {
		this.createTime = createTime;
	}


	public Long getModifyTime() {
		return this.modifyTime;
	}
	public void setModifyTime(Long modifyTime) {
		this.modifyTime = modifyTime;
	}


}


