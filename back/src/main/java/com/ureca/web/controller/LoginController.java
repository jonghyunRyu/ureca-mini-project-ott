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

@RestController
public class LoginController {
	
	@Autowired
	MemberService memberService;
	
	@PostMapping("/login")
	public Map<String, Object> login(@RequestBody Member m) {
		System.out.println(m);
		
		Map<String, Object> response = new HashMap();
		
		try {
			Member loginUser = memberService.login(m);
			System.out.println(loginUser);
			
			if (loginUser != null) {
				response.put("msg", "success");
                response.put("user", loginUser);
				
			} else {
				response.put("msg", "invalid");
			}
			
		} catch (UplusException e) {
			e.printStackTrace();
			response.put("msg", e.getMessage());
		}
		
		return response;
	}
}
