package com.ureca.web.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ureca.web.model.UplusException;
import com.ureca.web.model.dao.MemberDao;
import com.ureca.web.model.dto.Member;

@Service
public class MemberService {
	
	@Autowired
	MemberDao memberDao;
	
	// 회원가입
	public void registerMember(Member m) throws UplusException {
		memberDao.registerMember(m);
	}
	
	// 로그인
	public Member login(Member m) throws UplusException {
		Member found = memberDao.login(m);
		if (found != null) {
			return found;
		}
		
		return null;
	}
}
