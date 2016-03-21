package com.aic.paas.console.res.peer.impl;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import com.aic.paas.comm.util.PropertiesPool;
import com.aic.paas.console.res.bean.CPcResCenter;
import com.aic.paas.console.res.bean.PcResCenter;
import com.aic.paas.console.res.bean.PcResCenterInfo;
import com.aic.paas.console.res.peer.PcResCenterPeer;
import com.aic.paas.console.res.util.HttpClientUtil;
import com.aic.paas.console.res.vo.OpenResultParamVo;
import com.aic.paas.console.rest.PcResCenterSvc;
import com.alibaba.dubbo.common.json.JSON;
import com.alibaba.dubbo.common.json.JSONObject;
import com.binary.core.util.BinaryUtils;
import com.binary.framework.exception.ServiceException;
import com.binary.jdbc.Page;
import com.google.gson.Gson;

public class PcResCenterPeerImpl implements PcResCenterPeer{
	
	private static Logger logger = Logger.getLogger(PcResCenterPeerImpl.class);
	
	@Autowired
	PcResCenterSvc pcResCenterSvc;

	@Autowired
	PropertiesPool propertiesPool;
	
	public Page<PcResCenter> queryPage(Integer pageNum, Integer pageSize,CPcResCenter cdt, String orders) {
		return pcResCenterSvc.queryPage(pageNum, pageSize, cdt, orders);
	}

	public List<PcResCenter> queryList(CPcResCenter cdt, String orders) {
		return pcResCenterSvc.queryList(cdt, orders);
	}

	public PcResCenter queryById(Long id) {
		BinaryUtils.checkEmpty(id, "id");
		return pcResCenterSvc.queryById(id);
	}
	
	
	@Override
	public Page<PcResCenterInfo> queryInfoPage(Integer pageNum, Integer pageSize, CPcResCenter cdt, String orders) {
		return pcResCenterSvc.queryInfoPage(pageNum, pageSize, cdt, orders);
	}

	
	@Override
	public List<PcResCenterInfo> queryInfoList(CPcResCenter cdt, String orders) {
		return pcResCenterSvc.queryInfoList(cdt, orders);
	}

	
	
	@Override
	public PcResCenterInfo queryInfoById(Long id) {
		return pcResCenterSvc.queryInfoById(id);
	}
	

	
	public Long saveOrUpdate(PcResCenter record) {
		BinaryUtils.checkEmpty(record, "record");
		
		if(record.getId() == null) {
			BinaryUtils.checkEmpty(record.getDataCenterId(), "record.dataCenterId");
			BinaryUtils.checkEmpty(record.getResCode(), "record.resCode");
			BinaryUtils.checkEmpty(record.getResName(), "record.resName");
			BinaryUtils.checkEmpty(record.getEnvType(), "record.envType");
		}else {
			if(record.getDataCenterId()!=null) BinaryUtils.checkEmpty(record.getDataCenterId(), "record.dataCenterId");
			if(record.getResCode()!=null) BinaryUtils.checkEmpty(record.getResCode(), "record.resCode");
			if(record.getResName()!=null) BinaryUtils.checkEmpty(record.getResName(), "record.resName");
			if(record.getEnvType()!=null) BinaryUtils.checkEmpty(record.getEnvType(), "record.envType");
		}
		
		return pcResCenterSvc.saveOrUpdate(record);
	}

	public int removeById(Long id) {
		BinaryUtils.checkEmpty(id, "id");
		return pcResCenterSvc.removeById(id);
	}

	@Override
	public OpenResultParamVo initResCenter(Long id ,Boolean useAgent,Boolean loadOnly) {
		
		//获取初始化参数
		Map<String,Object> param = pcResCenterSvc.getInitParam(id, useAgent, loadOnly);
		
		Gson gson = new Gson();
		logger.info("init resCenter param----"+gson.toJson(param));

		String result = null;
		try {
			result = HttpClientUtil.sendPostRequest(propertiesPool.get("url.resCenter.init"),gson.toJson(param));
			logger.info("the result of initResCenter is : "+ result);
		} catch (IOException | URISyntaxException e) {
			logger.error(e.getMessage());
			throw new ServiceException(e.getMessage());
		} 
		OpenResultParamVo initResult = gson.fromJson(result, OpenResultParamVo.class);
		return initResult;
	}

	@Override
	public String getInitLog(Long id) {
		String logResult = null;
		try {
			logResult = HttpClientUtil.sendPostRequest(propertiesPool.get("url.resCenter.getLog"), id.intValue()+"");
		} catch (IOException | URISyntaxException e) {
			logger.error(e.getMessage());
		}
		return logResult;
	}

	@Override
	public OpenResultParamVo cancelResCenter(Long id, Boolean useAgent,
			Boolean loadOnly) {
		//获取注销参数
		Map<String,Object> param = pcResCenterSvc.getCancelParam(id, useAgent, loadOnly);
		
		Gson gson = new Gson();
		logger.info("cancel resCenter param----"+gson.toJson(param)); 
		String result = null;
		try {
			result = HttpClientUtil.sendPostRequest(propertiesPool.get("url.resCenter.cancelRes"), gson.toJson(param));
		} catch (IOException | URISyntaxException e) {
			logger.error(e.getMessage());
			throw new ServiceException(e.getMessage());
		}
		OpenResultParamVo initResult = gson.fromJson(result, OpenResultParamVo.class);
		return initResult;
	}
}
