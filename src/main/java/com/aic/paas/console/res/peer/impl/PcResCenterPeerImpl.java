package com.aic.paas.console.res.peer.impl;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import com.aic.paas.comm.util.PropertiesPool;
import com.aic.paas.console.res.bean.CPcResCenter;
import com.aic.paas.console.res.bean.PcResCenter;
import com.aic.paas.console.res.bean.PcResCenterInfo;
import com.aic.paas.console.res.peer.PcResCenterPeer;
import com.aic.paas.console.res.util.HttpClientUtil;
import com.aic.paas.console.rest.PcResCenterSvc;
import com.alibaba.dubbo.common.json.JSON;
import com.alibaba.dubbo.common.json.JSONObject;
import com.binary.core.util.BinaryUtils;
import com.binary.jdbc.Page;
import com.google.gson.Gson;

public class PcResCenterPeerImpl implements PcResCenterPeer{
	
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
	public int initResCenter(Long id ,Boolean useAgent,Boolean loadOnly) {
		
		//获取初始化参数
		Map<String,Object> param = pcResCenterSvc.getInitParam(id, useAgent, loadOnly);
		
		Gson gson = new Gson();
		System.out.println("init resCenter param----"+gson.toJson(param));
//		try {
//			String result = HttpClientUtil.sendPostRequest(propertiesPool.get("url.resCenter.init"),gson.toJson(param));
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		} catch (URISyntaxException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
		
		return 0;
	}

	@Override
	public List<String> getInitLog(Long id) {
		List<String> list = new ArrayList<String>();
		list.add("---begin init resource center---");
		list.add("---install mesos master...... ");
		list.add("---finish install master");
		list.add("---begin install HaProxy...... ");
		return list;
	}

	

}
