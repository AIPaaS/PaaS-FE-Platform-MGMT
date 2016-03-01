package com.aic.paas.console.res.peer.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.aic.paas.console.res.bean.CPcCompRoom;
import com.aic.paas.console.res.bean.PcCompRoom;
import com.aic.paas.console.res.peer.PcCompRoomPeer;
import com.aic.paas.console.rest.PcCompRoomSvc;
import com.binary.core.util.BinaryUtils;
import com.binary.jdbc.Page;

public class PcCompRoomPeerImpl implements PcCompRoomPeer{
	
	@Autowired
	PcCompRoomSvc pcComputerSvc;

	public Page<PcCompRoom> queryPage(Integer pageNum, Integer pageSize,CPcCompRoom cdt, String orders) {
		return pcComputerSvc.queryPage(pageNum, pageSize, cdt, orders);
	}

	public List<PcCompRoom> queryList(CPcCompRoom cdt, String orders) {
		return pcComputerSvc.queryList(cdt, orders);
	}

	public PcCompRoom queryById(Long id) {
		BinaryUtils.checkEmpty(id, "id");
		return pcComputerSvc.queryById(id);
	}

	public Long saveOrUpdate(PcCompRoom record) {
		return pcComputerSvc.saveOrUpdate(record);
	}

	public int removeById(Long id) {
		BinaryUtils.checkEmpty(id, "id");
		return pcComputerSvc.removeById(id);
	}

}
