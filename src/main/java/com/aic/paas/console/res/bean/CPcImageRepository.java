package com.aic.paas.console.res.bean;




import com.binary.framework.bean.Condition;


/**
 * condition-table: 镜像库表[PC_IMAGE_REPOSITORY]
 */
public class CPcImageRepository implements Condition {
	private static final long serialVersionUID = 1L;


	/**
	 * condition-field: ID[ID] operate-Equal[=]
	 */
	private Long id;


	/**
	 * condition-field: ID[ID] operate-In[in]
	 */
	private Long[] ids;


	/**
	 * condition-field: ID[ID] operate-GTEqual[>=]
	 */
	private Long startId;

	/**
	 * condition-field: ID[ID] operate-LTEqual[<=]
	 */
	private Long endId;


	/**
	 * condition-field: 镜像库代码[IMG_RESP_CODE] operate-Like[like]
	 */
	private String imgRespCode;


	/**
	 * condition-field: 镜像库代码[IMG_RESP_CODE] operate-Equal[=]
	 */
	private String imgRespCodeEqual;


	/**
	 * condition-field: 镜像库代码[IMG_RESP_CODE] operate-In[in]
	 */
	private String[] imgRespCodes;


	/**
	 * condition-field: 所属机房[ROOM_ID] operate-Equal[=]
	 */
	private Long roomId;


	/**
	 * condition-field: 所属机房[ROOM_ID] operate-In[in]
	 */
	private Long[] roomIds;


	/**
	 * condition-field: 所属机房[ROOM_ID] operate-GTEqual[>=]
	 */
	private Long startRoomId;

	/**
	 * condition-field: 所属机房[ROOM_ID] operate-LTEqual[<=]
	 */
	private Long endRoomId;


	/**
	 * condition-field: 镜像库类型[IMG_RESP_TYPE] operate-Equal[=]
	 * 1=快照镜像库 2=非快照镜像库
	 */
	private Integer imgRespType;


	/**
	 * condition-field: 镜像库类型[IMG_RESP_TYPE] operate-In[in]
	 * 1=快照镜像库 2=非快照镜像库
	 */
	private Integer[] imgRespTypes;


	/**
	 * condition-field: 镜像库类型[IMG_RESP_TYPE] operate-GTEqual[>=]
	 * 1=快照镜像库 2=非快照镜像库
	 */
	private Integer startImgRespType;

	/**
	 * condition-field: 镜像库类型[IMG_RESP_TYPE] operate-LTEqual[<=]
	 * 1=快照镜像库 2=非快照镜像库
	 */
	private Integer endImgRespType;


	/**
	 * condition-field: 镜像库地址[IMG_RESP_URL] operate-Like[like]
	 */
	private String imgRespUrl;


	/**
	 * condition-field: 镜像库账号[IMG_RESP_USER] operate-Like[like]
	 */
	private String imgRespUser;


	/**
	 * condition-field: 镜像库密码[IMG_RESP_PWD] operate-Like[like]
	 */
	private String imgRespPwd;


	/**
	 * condition-field: 备注[REMARK] operate-Like[like]
	 */
	private String remark;


	/**
	 * condition-field: 备用字段_1[CUSTOM_1] operate-Equal[=]
	 */
	private Long custom1;


	/**
	 * condition-field: 备用字段_1[CUSTOM_1] operate-In[in]
	 */
	private Long[] custom1s;


	/**
	 * condition-field: 备用字段_1[CUSTOM_1] operate-GTEqual[>=]
	 */
	private Long startCustom1;

	/**
	 * condition-field: 备用字段_1[CUSTOM_1] operate-LTEqual[<=]
	 */
	private Long endCustom1;


	/**
	 * condition-field: 备用字段_2[CUSTOM_2] operate-Equal[=]
	 */
	private Long custom2;


	/**
	 * condition-field: 备用字段_2[CUSTOM_2] operate-In[in]
	 */
	private Long[] custom2s;


	/**
	 * condition-field: 备用字段_2[CUSTOM_2] operate-GTEqual[>=]
	 */
	private Long startCustom2;

	/**
	 * condition-field: 备用字段_2[CUSTOM_2] operate-LTEqual[<=]
	 */
	private Long endCustom2;


	/**
	 * condition-field: 备用字段_3[CUSTOM_3] operate-Equal[=]
	 */
	private Long custom3;


	/**
	 * condition-field: 备用字段_3[CUSTOM_3] operate-In[in]
	 */
	private Long[] custom3s;


	/**
	 * condition-field: 备用字段_3[CUSTOM_3] operate-GTEqual[>=]
	 */
	private Long startCustom3;

	/**
	 * condition-field: 备用字段_3[CUSTOM_3] operate-LTEqual[<=]
	 */
	private Long endCustom3;


	/**
	 * condition-field: 备用字段_4[CUSTOM_4] operate-Like[like]
	 */
	private String custom4;


	/**
	 * condition-field: 备用字段_5[CUSTOM_5] operate-Like[like]
	 */
	private String custom5;


	/**
	 * condition-field: 备用字段_6[CUSTOM_6] operate-Like[like]
	 */
	private String custom6;


	/**
	 * condition-field: 数据状态[DATA_STATUS] operate-Equal[=]
	 * 数据状态：1-正常 0-删除
	 */
	private Integer dataStatus;


	/**
	 * condition-field: 数据状态[DATA_STATUS] operate-In[in]
	 * 数据状态：1-正常 0-删除
	 */
	private Integer[] dataStatuss;


	/**
	 * condition-field: 数据状态[DATA_STATUS] operate-GTEqual[>=]
	 * 数据状态：1-正常 0-删除
	 */
	private Integer startDataStatus;

	/**
	 * condition-field: 数据状态[DATA_STATUS] operate-LTEqual[<=]
	 * 数据状态：1-正常 0-删除
	 */
	private Integer endDataStatus;


	/**
	 * condition-field: 创建时间[CREATE_TIME] operate-Equal[=]
	 * yyyyMMddHHmmss
	 */
	private Long createTime;


	/**
	 * condition-field: 创建时间[CREATE_TIME] operate-In[in]
	 * yyyyMMddHHmmss
	 */
	private Long[] createTimes;


	/**
	 * condition-field: 创建时间[CREATE_TIME] operate-GTEqual[>=]
	 * yyyyMMddHHmmss
	 */
	private Long startCreateTime;

	/**
	 * condition-field: 创建时间[CREATE_TIME] operate-LTEqual[<=]
	 * yyyyMMddHHmmss
	 */
	private Long endCreateTime;


	/**
	 * condition-field: 修改时间[MODIFY_TIME] operate-Equal[=]
	 * yyyyMMddHHmmss
	 */
	private Long modifyTime;


	/**
	 * condition-field: 修改时间[MODIFY_TIME] operate-In[in]
	 * yyyyMMddHHmmss
	 */
	private Long[] modifyTimes;


	/**
	 * condition-field: 修改时间[MODIFY_TIME] operate-GTEqual[>=]
	 * yyyyMMddHHmmss
	 */
	private Long startModifyTime;

	/**
	 * condition-field: 修改时间[MODIFY_TIME] operate-LTEqual[<=]
	 * yyyyMMddHHmmss
	 */
	private Long endModifyTime;




	public Long getId() {
		return this.id;
	}
	public void setId(Long id) {
		this.id = id;
	}


	public Long[] getIds() {
		return this.ids;
	}
	public void setIds(Long[] ids) {
		this.ids = ids;
	}


	public Long getStartId() {
		return this.startId;
	}
	public void setStartId(Long startId) {
		this.startId = startId;
	}


	public Long getEndId() {
		return this.endId;
	}
	public void setEndId(Long endId) {
		this.endId = endId;
	}


	public String getImgRespCode() {
		return this.imgRespCode;
	}
	public void setImgRespCode(String imgRespCode) {
		this.imgRespCode = imgRespCode;
	}


	public String getImgRespCodeEqual() {
		return this.imgRespCodeEqual;
	}
	public void setImgRespCodeEqual(String imgRespCodeEqual) {
		this.imgRespCodeEqual = imgRespCodeEqual;
	}


	public String[] getImgRespCodes() {
		return this.imgRespCodes;
	}
	public void setImgRespCodes(String[] imgRespCodes) {
		this.imgRespCodes = imgRespCodes;
	}


	public Long getRoomId() {
		return this.roomId;
	}
	public void setRoomId(Long roomId) {
		this.roomId = roomId;
	}


	public Long[] getRoomIds() {
		return this.roomIds;
	}
	public void setRoomIds(Long[] roomIds) {
		this.roomIds = roomIds;
	}


	public Long getStartRoomId() {
		return this.startRoomId;
	}
	public void setStartRoomId(Long startRoomId) {
		this.startRoomId = startRoomId;
	}


	public Long getEndRoomId() {
		return this.endRoomId;
	}
	public void setEndRoomId(Long endRoomId) {
		this.endRoomId = endRoomId;
	}


	public Integer getImgRespType() {
		return this.imgRespType;
	}
	public void setImgRespType(Integer imgRespType) {
		this.imgRespType = imgRespType;
	}


	public Integer[] getImgRespTypes() {
		return this.imgRespTypes;
	}
	public void setImgRespTypes(Integer[] imgRespTypes) {
		this.imgRespTypes = imgRespTypes;
	}


	public Integer getStartImgRespType() {
		return this.startImgRespType;
	}
	public void setStartImgRespType(Integer startImgRespType) {
		this.startImgRespType = startImgRespType;
	}


	public Integer getEndImgRespType() {
		return this.endImgRespType;
	}
	public void setEndImgRespType(Integer endImgRespType) {
		this.endImgRespType = endImgRespType;
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


	public Long[] getCustom1s() {
		return this.custom1s;
	}
	public void setCustom1s(Long[] custom1s) {
		this.custom1s = custom1s;
	}


	public Long getStartCustom1() {
		return this.startCustom1;
	}
	public void setStartCustom1(Long startCustom1) {
		this.startCustom1 = startCustom1;
	}


	public Long getEndCustom1() {
		return this.endCustom1;
	}
	public void setEndCustom1(Long endCustom1) {
		this.endCustom1 = endCustom1;
	}


	public Long getCustom2() {
		return this.custom2;
	}
	public void setCustom2(Long custom2) {
		this.custom2 = custom2;
	}


	public Long[] getCustom2s() {
		return this.custom2s;
	}
	public void setCustom2s(Long[] custom2s) {
		this.custom2s = custom2s;
	}


	public Long getStartCustom2() {
		return this.startCustom2;
	}
	public void setStartCustom2(Long startCustom2) {
		this.startCustom2 = startCustom2;
	}


	public Long getEndCustom2() {
		return this.endCustom2;
	}
	public void setEndCustom2(Long endCustom2) {
		this.endCustom2 = endCustom2;
	}


	public Long getCustom3() {
		return this.custom3;
	}
	public void setCustom3(Long custom3) {
		this.custom3 = custom3;
	}


	public Long[] getCustom3s() {
		return this.custom3s;
	}
	public void setCustom3s(Long[] custom3s) {
		this.custom3s = custom3s;
	}


	public Long getStartCustom3() {
		return this.startCustom3;
	}
	public void setStartCustom3(Long startCustom3) {
		this.startCustom3 = startCustom3;
	}


	public Long getEndCustom3() {
		return this.endCustom3;
	}
	public void setEndCustom3(Long endCustom3) {
		this.endCustom3 = endCustom3;
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


	public Integer[] getDataStatuss() {
		return this.dataStatuss;
	}
	public void setDataStatuss(Integer[] dataStatuss) {
		this.dataStatuss = dataStatuss;
	}


	public Integer getStartDataStatus() {
		return this.startDataStatus;
	}
	public void setStartDataStatus(Integer startDataStatus) {
		this.startDataStatus = startDataStatus;
	}


	public Integer getEndDataStatus() {
		return this.endDataStatus;
	}
	public void setEndDataStatus(Integer endDataStatus) {
		this.endDataStatus = endDataStatus;
	}


	public Long getCreateTime() {
		return this.createTime;
	}
	public void setCreateTime(Long createTime) {
		this.createTime = createTime;
	}


	public Long[] getCreateTimes() {
		return this.createTimes;
	}
	public void setCreateTimes(Long[] createTimes) {
		this.createTimes = createTimes;
	}


	public Long getStartCreateTime() {
		return this.startCreateTime;
	}
	public void setStartCreateTime(Long startCreateTime) {
		this.startCreateTime = startCreateTime;
	}


	public Long getEndCreateTime() {
		return this.endCreateTime;
	}
	public void setEndCreateTime(Long endCreateTime) {
		this.endCreateTime = endCreateTime;
	}


	public Long getModifyTime() {
		return this.modifyTime;
	}
	public void setModifyTime(Long modifyTime) {
		this.modifyTime = modifyTime;
	}


	public Long[] getModifyTimes() {
		return this.modifyTimes;
	}
	public void setModifyTimes(Long[] modifyTimes) {
		this.modifyTimes = modifyTimes;
	}


	public Long getStartModifyTime() {
		return this.startModifyTime;
	}
	public void setStartModifyTime(Long startModifyTime) {
		this.startModifyTime = startModifyTime;
	}


	public Long getEndModifyTime() {
		return this.endModifyTime;
	}
	public void setEndModifyTime(Long endModifyTime) {
		this.endModifyTime = endModifyTime;
	}


}


