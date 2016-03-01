package com.aic.paas.console.res.peer.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.aic.paas.console.res.bean.CPsResCenterRes;
import com.aic.paas.console.res.bean.CPsResFlow;
import com.aic.paas.console.res.bean.PsResCenterRes;
import com.aic.paas.console.res.bean.PsResFlow;
import com.aic.paas.console.res.peer.PsResCenterResPeer;
import com.aic.paas.console.rest.PsResCenterResSvc;
import com.binary.core.util.BinaryUtils;
import com.binary.jdbc.Page;

public class PsResCenterResPeerImpl implements PsResCenterResPeer{
	
	@Autowired
	PsResCenterResSvc psResCenterResSvc;

	public Page<PsResCenterRes> queryResPage(Integer pageNum, Integer pageSize,CPsResCenterRes cdt, String orders) {
		return psResCenterResSvc.queryResPage(pageNum, pageSize, cdt, orders);
	}

	public List<PsResCenterRes> queryResList(CPsResCenterRes cdt, String orders) {
		return psResCenterResSvc.queryResList(cdt, orders);
	}

	public PsResCenterRes queryResById(Long id) {
		BinaryUtils.checkEmpty(id, "id");
		return psResCenterResSvc.queryResById(id);
	}

	public Page<PsResFlow> queryFlowPage(Integer pageNum, Integer pageSize,CPsResFlow cdt, String orders) {
		return psResCenterResSvc.queryFlowPage(pageNum, pageSize, cdt, orders);
	}

	public List<PsResFlow> queryFlowList(CPsResFlow cdt, String orders) {
		return psResCenterResSvc.queryFlowList(cdt, orders);
	}

	public PsResFlow queryFlowById(Long id) {
		BinaryUtils.checkEmpty(id, "id");
		return psResCenterResSvc.queryFlowById(id);
	}

}
