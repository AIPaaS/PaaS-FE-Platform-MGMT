package com.aic.paas.console.res.mvc;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.aic.paas.console.res.bean.CPcCompRoom;
import com.aic.paas.console.res.bean.PcCompRoom;
import com.aic.paas.console.res.peer.PcCompRoomPeer;
import com.aic.paas.frame.cross.bean.DropRecord;
import com.aic.paas.frame.util.ComponentUtil;
import com.binary.framework.util.ControllerUtils;
import com.binary.jdbc.Page;

@Controller
@RequestMapping("/res/comproom")
public class PcCompRoomMvc {
	
	@Autowired
	PcCompRoomPeer pcCompRoomPeer;
	

	@RequestMapping("/getCompRoomDropList")
    public void getCompRoomDropList(HttpServletRequest request, HttpServletResponse response, Boolean addEmpty, Boolean addAttr) {
		CPcCompRoom cdt = new CPcCompRoom();
        cdt.setStatus(1);
       List<PcCompRoom> list = pcCompRoomPeer.queryList(cdt, "ROOM_CODE, ID");
      
       List<DropRecord> dropList = ComponentUtil.toDropList(list, "ID", "roomName", addAttr, addEmpty);
       ControllerUtils.returnJson(request, response, dropList);
    }
	
	@RequestMapping("/queryPage")
	public void queryPage(HttpServletRequest request, HttpServletResponse response,Integer pageNum, Integer pageSize, CPcCompRoom cdt, String orders) {
		Page<PcCompRoom> page = pcCompRoomPeer.queryPage(pageNum, pageSize, cdt, orders);
		ControllerUtils.returnJson(request, response, page);
	}
	
	@RequestMapping("/queryById")
	public void queryById(HttpServletRequest request, HttpServletResponse response,Long id) {
		PcCompRoom p = pcCompRoomPeer.queryById(id);
		ControllerUtils.returnJson(request, response, p);
	}
	
	@RequestMapping("/saveOrUpdate")
	public void saveOrUpdate(HttpServletRequest request, HttpServletResponse response,PcCompRoom record) {
		Long c = pcCompRoomPeer.saveOrUpdate(record);
		ControllerUtils.returnJson(request, response, c);
	}
	
	@RequestMapping("/removeById")
	public void removeById(HttpServletRequest request, HttpServletResponse response,Long id) {
		int c = pcCompRoomPeer.removeById(id);
		ControllerUtils.returnJson(request, response, c);
	}

}
