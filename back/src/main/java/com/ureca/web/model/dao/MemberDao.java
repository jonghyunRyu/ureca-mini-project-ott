package com.ureca.web.model.dao;

import org.apache.ibatis.annotations.Mapper;

import com.ureca.web.model.dto.Member;

@Mapper
public interface MemberDao {
	
	public void registerMember(Member member);
	
	public Member login(Member member);
	
	public int countById(Member member);
	
	public int countByEmail(Member member);
}
