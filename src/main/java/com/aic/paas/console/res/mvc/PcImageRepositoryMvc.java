package com.aic.paas.console.res.mvc;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.aic.paas.console.res.bean.CPcImageRepository;
import com.aic.paas.console.res.bean.PcImageRepository;
import com.aic.paas.console.res.peer.PcImageRepositoryPeer;
import com.aic.paas.frame.cross.bean.DropRecord;
import com.aic.paas.frame.util.ComponentUtil;
import com.binary.core.util.BinaryUtils;
import com.binary.framework.util.ControllerUtils;
import com.binary.jdbc.Page;

@Controller
@RequestMapping("/res/imgresp")
public class PcImageRepositoryMvc {
	
	@Autowired
	PcImageRepositoryPeer imageRepositoryPeer;
	
	
	@RequestMapping("/getImageRespDropList")
    public void getImageRespDropList(HttpServletRequest request, HttpServletResponse response, Boolean addEmpty, Boolean addAttr, CPcImageRepository cdt, String orders) {
		if(BinaryUtils.isEmpty(orders)) orders = "IMG_RESP_CODE";
		List<PcImageRepository> list = imageRepositoryPeer.queryList(cdt, orders);
      
		List<DropRecord> dropList = ComponentUtil.toDropList(list, "ID", "imgRespCode", addAttr, addEmpty);
		ControllerUtils.returnJson(request, response, dropList);
    }
	
	
	
	@RequestMapping("/verifyRoomHasSnapshoot")
	public void verifyRoomHasSnapshoot(HttpServletRequest request, HttpServletResponse response, Long roomId, Long imgRespId) {
		BinaryUtils.checkEmpty(roomId, "roomId");
		CPcImageRepository cdt = new CPcImageRepository();
		cdt.setRoomId(roomId);
		cdt.setImgRespType(1); 	//1=快照镜像库 	0=非快照镜像库
		List<PcImageRepository> ls = imageRepositoryPeer.queryList(cdt, null);
		boolean error = ls.size()>0 && (imgRespId==null || ls.size()>1 || ls.get(0).getId().longValue()!=imgRespId.longValue());
		ControllerUtils.returnJson(request, response, !error);
	}
	
	
	
	@RequestMapping("/queryPage")
	public void queryPage(HttpServletRequest request,HttpServletResponse response, Integer pageNum, Integer pageSize, CPcImageRepository cdt, String orders){
		Page<PcImageRepository> page = imageRepositoryPeer.queryPage(pageNum, pageSize, cdt, orders);
		ControllerUtils.returnJson(request, response, page);
	}
	
	@RequestMapping("/queryList")
	public void queryList(HttpServletRequest request,HttpServletResponse response, CPcImageRepository cdt, String orders){
		List<PcImageRepository> list = imageRepositoryPeer.queryList(cdt, orders);
		ControllerUtils.returnJson(request, response, list);
	}
	
	@RequestMapping("/queryById")
	public void queryById(HttpServletRequest request,HttpServletResponse response, Long id){
		PcImageRepository p = imageRepositoryPeer.queryById(id);
		ControllerUtils.returnJson(request, response, p);
	} 
	

	@RequestMapping("/saveOrUpdate")
	public void saveOrUpdate(HttpServletRequest request,HttpServletResponse response, PcImageRepository record){
		Long id = imageRepositoryPeer.saveOrUpdate(record);
		ControllerUtils.returnJson(request, response, id);
	}
	

	@RequestMapping("/removeById")
	public void removeById(HttpServletRequest request,HttpServletResponse response, Long id){
		int c = imageRepositoryPeer.removeById(id);
		ControllerUtils.returnJson(request, response, c);
	}
}
