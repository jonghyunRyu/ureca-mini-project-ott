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
public class MemberController {
	
	@Autowired
	MemberService memberService;
	
	@PostMapping("/signup")
	public Map<String, Object> signup (@RequestBody Member m) {
		
		System.out.println(m); // 서버에 데이터가 잘 들어오는 지 확인용
		
		Map<String, Object> response = new HashMap();
		
		try {
			memberService.registerMember(m);
			response.put("msg", "success");
		} catch (UplusException e) {
			e.printStackTrace();
			response.put("msg", e.getMessage());
		} catch (Exception e) {
			response.put("msg", "서버 오류 발생");
			e.printStackTrace();
		}
		
		return response;
	}
}