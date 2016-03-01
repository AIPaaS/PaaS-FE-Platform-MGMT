package com.aic.paas.console.res.peer.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.aic.paas.console.res.bean.CPcNetZone;
import com.aic.paas.console.res.bean.PcNetZone;
import com.aic.paas.console.res.peer.PcNetZonePeer;
import com.aic.paas.console.rest.PcNetZoneSvc;
import com.binary.core.util.BinaryUtils;
import com.binary.jdbc.Page;

public class PcNetZonePeerImpl implements PcNetZonePeer{
	
	@Autowired
	PcNetZoneSvc pcNetZoneSvc;

	public Page<PcNetZone> queryPage(Integer pageNum, Integer pageSize,CPcNetZone cdt, String orders) {
		return pcNetZoneSvc.queryPage(pageNum, pageSize, cdt, orders);
	}

	public List<PcNetZone> queryList(CPcNetZone cdt, String orders) {
		return pcNetZoneSvc.queryList(cdt, orders);
	}

	public PcNetZone queryById(Long id) {
		BinaryUtils.checkEmpty(id, "id");
		return pcNetZoneSvc.queryById(id);
	}

	public Long saveOrUpdate(PcNetZone record) {
		return pcNetZoneSvc.saveOrUpdate(record);
	}

	public int removeById(Long id) {
		BinaryUtils.checkEmpty(id, "id");
		return pcNetZoneSvc.removeById(id);
	}

}
