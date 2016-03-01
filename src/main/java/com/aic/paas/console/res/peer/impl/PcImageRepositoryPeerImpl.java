package com.aic.paas.console.res.peer.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.aic.paas.console.res.bean.CPcImageRepository;
import com.aic.paas.console.res.bean.PcImageRepository;
import com.aic.paas.console.res.peer.PcImageRepositoryPeer;
import com.aic.paas.console.rest.PcImageRepositorySvc;
import com.binary.core.util.BinaryUtils;
import com.binary.jdbc.Page;

public class PcImageRepositoryPeerImpl implements PcImageRepositoryPeer {
	
	
	@Autowired
	PcImageRepositorySvc imageRespSvc;
	

	@Override
	public Page<PcImageRepository> queryPage(Integer pageNum, Integer pageSize, CPcImageRepository cdt, String orders) {
		return imageRespSvc.queryPage(pageNum, pageSize, cdt, orders);
	}
	
	

	@Override
	public List<PcImageRepository> queryList(CPcImageRepository cdt, String orders) {
		return imageRespSvc.queryList(cdt, orders);
	}
	
	

	@Override
	public PcImageRepository queryById(Long id) {
		return imageRespSvc.queryById(id);
	}
	
	

	@Override
	public Long saveOrUpdate(PcImageRepository record) {
		BinaryUtils.checkEmpty(record, "record");
		
		if(record.getId() == null) {
			BinaryUtils.checkEmpty(record.getImgRespCode(), "record.imgRespCode");
			BinaryUtils.checkEmpty(record.getRoomId(), "record.roomId");
			BinaryUtils.checkEmpty(record.getImgRespType(), "record.imgRespType");
			BinaryUtils.checkEmpty(record.getImgRespUrl(), "record.imgRespUrl");
			BinaryUtils.checkEmpty(record.getImgRespUser(), "record.imgRespUser");
			BinaryUtils.checkEmpty(record.getImgRespPwd(), "record.imgRespPwd");
		}else {
			if(record.getImgRespCode()!=null) BinaryUtils.checkEmpty(record.getImgRespCode(), "record.imgRespCode");
			if(record.getRoomId()!=null) BinaryUtils.checkEmpty(record.getRoomId(), "record.roomId");
			if(record.getImgRespType()!=null) BinaryUtils.checkEmpty(record.getImgRespType(), "record.imgRespType");
			if(record.getImgRespUrl()!=null) BinaryUtils.checkEmpty(record.getImgRespUrl(), "record.imgRespUrl");
			if(record.getImgRespUser()!=null) BinaryUtils.checkEmpty(record.getImgRespUser(), "record.imgRespUser");
			if(record.getImgRespPwd()!=null) BinaryUtils.checkEmpty(record.getImgRespPwd(), "record.imgRespPwd");
		}
		
		return imageRespSvc.saveOrUpdate(record);
	}
	
	

	@Override
	public int removeById(Long id) {
		return imageRespSvc.removeById(id);
	}

}
