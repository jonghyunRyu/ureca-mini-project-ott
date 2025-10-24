package com.ureca.web.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.ureca.web.model.dto.Content;
import com.ureca.web.model.service.ContentService;

@RestController
public class ContentController {

    @Autowired
    ContentService contentService;

    // 전체 컨텐츠 목록 가져오기
    @GetMapping("/getContents")
    public List<Content> getContents() {
        return contentService.getContents();
    }
    
    // 선택된 컨텐츠만 가져오기
    @GetMapping("/contents/{id}")
    public Content getContentDetail(@PathVariable Long id) {
    	return contentService.getContentById(id);
    }
}