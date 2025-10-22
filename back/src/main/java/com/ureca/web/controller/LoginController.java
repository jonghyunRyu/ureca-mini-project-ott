package com.ureca.web.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ureca.web.model.UplusException;
import com.ureca.web.model.dto.Member;
import com.ureca.web.model.service.MemberService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@RestController
public class LoginController {
	
	@Autowired
	MemberService memberService;
	
	@PostMapping("/login")
	public Map<String, Object> login(@RequestBody Member m, HttpServletRequest request) {
		System.out.println(m);
		
		Map<String, Object> response = new HashMap();
		
		try {
			Member loginUser = memberService.login(m);
			System.out.println(loginUser);
			
			if (loginUser != null) {
				HttpSession session = request.getSession(true);
				session.setAttribute("user", loginUser);
				
				response.put("msg", "success");
                response.put("user", loginUser);
				
			} else {
				response.put("msg", "invalid");
			}
			
		} catch (UplusException e) {
			e.printStackTrace();
			response.put("msg", e.getMessage());
		} catch (Exception e) {
			response.put("msg", "서버 오류 발생");
			e.printStackTrace();
		}
		
		return response;
	}
	
	@PostMapping("/logout")
	public String upidLogout(HttpServletRequest request) {
		HttpSession session=request.getSession(false);
		
		if(session != null) {
			session.invalidate();
			return null;
			
		} else {
			//침해 대응 코드
			return "Get out~!";
		}
	}
}
