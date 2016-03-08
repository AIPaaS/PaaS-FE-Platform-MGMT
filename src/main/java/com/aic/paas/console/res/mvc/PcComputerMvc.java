package com.aic.paas.console.res.mvc;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.aic.paas.console.res.bean.CPcCompRoom;
import com.aic.paas.console.res.bean.CPcComputer;
import com.aic.paas.console.res.bean.CPcDataCenter;
import com.aic.paas.console.res.bean.CPcNetZone;
import com.aic.paas.console.res.bean.CPcResCenter;
import com.aic.paas.console.res.bean.PcCompRoom;
import com.aic.paas.console.res.bean.PcComputer;
import com.aic.paas.console.res.bean.PcComputerTag;
import com.aic.paas.console.res.bean.PcDataCenter;
import com.aic.paas.console.res.bean.PcNetZone;
import com.aic.paas.console.res.bean.PcResCenter;
import com.aic.paas.console.res.bean.ResDetailInfo;
import com.aic.paas.console.res.peer.PcCompRoomPeer;
import com.aic.paas.console.res.peer.PcComputerPeer;
import com.aic.paas.console.res.peer.PcDataCenterPeer;
import com.aic.paas.console.res.peer.PcNetZonePeer;
import com.aic.paas.console.res.peer.PcResCenterPeer;
import com.aic.paas.frame.cross.bean.DropRecord;
import com.aic.paas.frame.cross.bean.NodeProMapping;
import com.aic.paas.frame.cross.bean.TreeNode;
import com.aic.paas.frame.util.ComponentUtil;
import com.binary.core.util.BinaryUtils;
import com.binary.framework.util.ControllerUtils;
import com.binary.jdbc.Page;
import com.binary.json.JSON;

@Controller
@RequestMapping("/res/computer")
public class PcComputerMvc {
	
	@Autowired
	PcCompRoomPeer pcCompRoomPeer;
	
	
	@Autowired
	PcDataCenterPeer pcDataCenterPeer;
	
	@Autowired
	PcResCenterPeer pcResCenterPeer;
	
	@Autowired
	PcNetZonePeer netZonePeer;
	
	@Autowired
	PcComputerPeer pcComputerPeer;
	
	
	
	/**
	 * @param opts room|dc|rc|nc
	 */
	@RequestMapping("/getComputerRegionDropListMap")
	public void getComputerRegionDropListMap(HttpServletRequest request, HttpServletResponse response, Boolean addEmpty, Boolean addAttr, String opts) {
		Map<String, List<DropRecord>> map = getComputerRegionDropListMap(addEmpty, addAttr, opts);
		ControllerUtils.returnJson(request, response, map);
	}
	
	
	
	/**
	 * @param level 1=数据中心   2=数据中心+资源中心  3=数据中心+资源中心+网络区域
	 */
	@RequestMapping("/getComputerRegionTree")
	public void getComputerRegionTree(HttpServletRequest request, HttpServletResponse response, Boolean addAttr, Integer level) {
		String opts = "dc|rc|nc";
		if(level != null) {
			switch (level.intValue()) {
				case 1: opts = "dc"; break;
				case 2: opts = "dc|rc"; break;
				default: opts = "dc|rc|nc"; break;
			}
		}
		
		Map<String, List<DropRecord>> map = getComputerRegionDropListMap(false, addAttr, opts);
		
		List<DropRecord> dclist = map.get("dc");
		List<DropRecord> rclist = map.get("rc");
		List<DropRecord> nclist = map.get("nc");
		if(rclist != null) dclist.addAll(rclist);
		if(nclist != null) dclist.addAll(nclist);
		
		List<TreeNode> nodes = null;
		if(dclist.size() > 0) {
			nodes = ComponentUtil.toTreeNodeList(dclist, true, false, new NodeProMapping[] {
					new NodeProMapping("id", "code", null),
					new NodeProMapping("text", "name", null),
					new NodeProMapping("parentid", "parentCode", null)
			});
		}else {
			nodes = new ArrayList<TreeNode>();
		}
		
		ControllerUtils.returnSimpleJson(request, response, nodes);
	}
	
	
	private Map<String, List<DropRecord>> getComputerRegionDropListMap(Boolean addEmpty, Boolean addAttr, String opts)  {
		Map<String, List<DropRecord>> map = new HashMap<String, List<DropRecord>>();
		boolean adda = addAttr==null || addAttr.booleanValue();
		
		int fori = Boolean.TRUE.equals(addEmpty) ? 1 : 0;
		
		if(BinaryUtils.isEmpty(opts)) opts = null;
		if(opts==null || opts.indexOf("room")>-1) {
			CPcCompRoom roomcdt = new CPcCompRoom();
			roomcdt.setStatus(1);
			List<PcCompRoom> roomList = pcCompRoomPeer.queryList(roomcdt, "ROOM_CODE, ID");
			List<DropRecord> roomDropList = ComponentUtil.toDropList(roomList, "ID", "roomName", addAttr, addEmpty);
			map.put("room", roomDropList);
		}
		
		if(opts==null || opts.indexOf("dc")>-1) {
			CPcDataCenter dccdt = new CPcDataCenter();
			dccdt.setStatus(1);
			List<PcDataCenter> dclist = pcDataCenterPeer.queryList(dccdt, "CODE, ID");
			List<DropRecord> dcDropList = ComponentUtil.toDropList(dclist, "ID", "name", addAttr, addEmpty);
			for(int i=fori; i<dcDropList.size(); i++) {
				DropRecord r = dcDropList.get(i);
				r.setParam1("1");
				r.setParentCode("0");
			}
			map.put("dc", dcDropList);
		}

		if(opts==null || opts.indexOf("rc")>-1) {
			CPcResCenter rccdt = new CPcResCenter();
			rccdt.setStatus(1);
			List<PcResCenter> rclist = pcResCenterPeer.queryList(rccdt, "RES_CODE, ID");
			List<DropRecord> rcDropList = ComponentUtil.toDropList(rclist, "ID", "resName", true, addEmpty);
			for(int i=fori; i<rcDropList.size(); i++) {
				DropRecord r = rcDropList.get(i);
				r.setParam1("2");
				PcResCenter att = (PcResCenter)r.getAttributes();
				r.setParentCode(String.valueOf(att.getDataCenterId()));
				if(!adda) r.setAttributes(null);
			}
			map.put("rc", rcDropList);
		}
		
		if(opts==null || opts.indexOf("nc")>-1) {
			CPcNetZone nccdt = new CPcNetZone();
			nccdt.setStatus(1);
			List<PcNetZone> nclist = netZonePeer.queryList(nccdt, "ZONE_CODE, ID");
			List<DropRecord> ncDropList = ComponentUtil.toDropList(nclist, "ID", "zoneName", addAttr, addEmpty);
			for(int i=fori; i<ncDropList.size(); i++) {
				DropRecord r = ncDropList.get(i);
				r.setParam1("3");
				PcNetZone att = (PcNetZone)r.getAttributes();
				r.setParentCode(String.valueOf(att.getResCenterId()));
				if(!adda) r.setAttributes(null);
			}
			map.put("nc", ncDropList);
		}
		
		return map;
	}
	
	
	
	
	
	

	@RequestMapping("/queryPage")
	public void queryPage(HttpServletRequest request, HttpServletResponse response,Integer pageNum, Integer pageSize, CPcComputer cdt, String orders) {
		Page<PcComputer> page = pcComputerPeer.queryPage(pageNum, pageSize, cdt, orders);
		ControllerUtils.returnJson(request, response, page);
	}
	
	@RequestMapping("/queryById")
	public void queryById(HttpServletRequest request, HttpServletResponse response,Long id) {
		PcComputer p = pcComputerPeer.queryById(id);
		ControllerUtils.returnJson(request, response, p);
	}
	
	@RequestMapping("/saveOrUpdate")
	public void saveOrUpdate(HttpServletRequest request, HttpServletResponse response,PcComputer record) {
		Long c = pcComputerPeer.saveOrUpdate(record);
		ControllerUtils.returnJson(request, response, c);
	}
	
	@RequestMapping("/removeById")
	public void removeById(HttpServletRequest request, HttpServletResponse response,Long id) {
		int c = pcComputerPeer.removeById(id);
		ControllerUtils.returnJson(request, response, c);
	}

	
	@RequestMapping("/queryComputerTagList")
	public void queryComputerTagList(HttpServletRequest request, HttpServletResponse response,Long computerId, String orders) {
		List<PcComputerTag> list = pcComputerPeer.queryComputerTagList(computerId, orders);
		ControllerUtils.returnJson(request, response, list);
	}
	
	@RequestMapping("/saveComputerTags")
	public void saveComputerTags(HttpServletRequest request, HttpServletResponse response,Long computerId, String strTags) {
		List<PcComputerTag> tags = JSON.toList(strTags, PcComputerTag.class);
		pcComputerPeer.saveComputerTags(computerId, tags);
		ControllerUtils.returnJson(request, response, true);
	}
	
	@RequestMapping("/removeComputerTags")
	public void removeComputerTags(HttpServletRequest request, HttpServletResponse response,Long computerId) {
		pcComputerPeer.removeComputerTags(computerId);
		ControllerUtils.returnJson(request, response, null);
	}
}
