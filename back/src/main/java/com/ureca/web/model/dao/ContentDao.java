package com.ureca.web.model.dao;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.ureca.web.model.dto.Content;

@Mapper
public interface ContentDao {
	
    public List<Content> getContents();
}