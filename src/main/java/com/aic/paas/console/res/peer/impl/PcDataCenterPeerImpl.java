package com.aic.paas.console.res.peer.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.aic.paas.console.res.bean.CPcDataCenter;
import com.aic.paas.console.res.bean.PcDataCenter;
import com.aic.paas.console.res.peer.PcDataCenterPeer;
import com.aic.paas.console.rest.PcDataCenterSvc;
import com.binary.core.util.BinaryUtils;
import com.binary.jdbc.Page;

public class PcDataCenterPeerImpl implements PcDataCenterPeer{
	
	@Autowired
	PcDataCenterSvc pcDataCenterSvc;

	public Page<PcDataCenter> queryPage(Integer pageNum, Integer pageSize,CPcDataCenter cdt, String orders) {
		return pcDataCenterSvc.queryPage(pageNum, pageSize, cdt, orders);
	}

	public List<PcDataCenter> queryList(CPcDataCenter cdt, String orders) {
		return pcDataCenterSvc.queryList(cdt, orders);
	}

	public PcDataCenter queryById(Long id) {
		BinaryUtils.checkEmpty(id, "id");
		return pcDataCenterSvc.queryById(id);
	}

	public Long saveOrUpdate(PcDataCenter record) {
		return pcDataCenterSvc.saveOrUpdate(record);
	}

	public int removeById(Long id) {
		BinaryUtils.checkEmpty(id, "id");
		return pcDataCenterSvc.removeById(id);
	}

}
