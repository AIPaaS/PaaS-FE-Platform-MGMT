package com.aic.paas.console.res.util;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 
 * 请求响应到客户端
 * @author Fenggw
 *
 */
public class HttpResponseUtil {
	
	private static transient final Logger LOGGER = LoggerFactory
			.getLogger(HttpResponseUtil.class);
	
    public static void sendResponse(String result,HttpServletResponse response) throws IOException{
    	
    	PrintWriter printWriter = null;
 		try {
 			response.setContentType("text/html;charset=utf-8");
 			printWriter = response.getWriter();
 			printWriter.write(result);
 			printWriter.flush();
 		} catch (Exception e) {
 			LOGGER.error("重大异常，responseSuccess报错！", e);
 		} finally {
 			printWriter.close();
 		}
    }
}
