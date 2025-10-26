package com.ureca.web.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
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
		System.out.println("===========로그인 시도할 때 사용자 데이터 확인========");
		System.out.println("클라이언트로부터 온 사용자 아이디/비밀번호: " + m);
		
		Map<String, Object> response = new HashMap();
		
		try {
			Member loginUser = memberService.login(m);
			System.out.println("DB로부터 가져온 사용자 데이터: " + loginUser); // DB로부터 가져온 사용자 데이터 (ID, 복호화된 PW)
			 
			if (loginUser != null) {
				HttpSession session = request.getSession(true);
				session.setAttribute("user", loginUser);
				System.out.println("========로그인 성공 시 세션 부여========");
				System.out.println("Session created: " + session.isNew());
				System.out.println("Session ID: " + session.getId());
				
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
		}
		
		return response;
	}
	
	@PostMapping("/logout")
	public Map<String, String> logout(HttpServletRequest request) {
	    HttpSession session = request.getSession(false);

	    if(session != null) {
	        session.invalidate();
	        System.out.println();
	        return Map.of("msg", "logout success");
	    } else {
	        return Map.of("msg", "no session");
	    }
	}
	
	@GetMapping("/check")
	public Map<String, Object> checkSession(HttpSession session) {
	    Map<String, Object> response = new HashMap<>();
	    Object user = session.getAttribute("user");
	    
	    System.out.println("=============로그인 성공 이후 페이지 로드할 때 콘솔============");
	    System.out.println("현재 세션 ID: " + session.getId());
	    System.out.println("세션에 저장된 user: " + user);
	    System.out.println("세션 최대 유효 시간(초): " + session.getMaxInactiveInterval());
	    System.out.println("세션 생성 시간: " + new Date(session.getCreationTime()));
	    System.out.println("세션 마지막 접근 시간: " + new Date(session.getLastAccessedTime()));
	    
	    if (user != null) {
	        response.put("isLogin", true);
	    } else {
	        response.put("isLogin", false);
	    }
	    return response;
	}
}
