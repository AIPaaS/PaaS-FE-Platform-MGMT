package com.aic.paas.console.integration;

import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.binary.framework.exception.ServiceException;




@Controller
@RequestMapping("/dispatch")
public class DispatchMvc {
	
	private final Pattern NUM_REGX = Pattern.compile("[0-9]+");
		
	
	
	@RequestMapping("/mi/**")
	public String openModuById(HttpServletRequest request, HttpServletResponse response) {
		String url = request.getRequestURI();
		int idx = url.indexOf("/mi/");
		if(idx < 0) throw new ServiceException(" is wrong url '"+url+"'! ");
		String id = url.substring(idx+4).trim();
		
		if(!NUM_REGX.matcher(id).matches()) {
			throw new ServiceException(" is wrong url '"+url+"'! ");
		}
		
		return "forward:/sys/frame/cross/modu/openModuleById?moduleId="+id;
	}
	
	
	
	
	@RequestMapping("/mc/**")
	public String openModuByCode(HttpServletRequest request, HttpServletResponse response) {
		String url = request.getRequestURI();
		int idx = url.indexOf("/mc/");
		if(idx < 0) throw new ServiceException(" is wrong url '"+url+"'! ");
		String code = url.substring(idx+4).trim();
		return "forward:/sys/frame/cross/modu/openModuleByCode?moduleCode="+code;
	}
	

}
