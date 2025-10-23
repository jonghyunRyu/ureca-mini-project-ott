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

    // 전체 콘텐츠 목록
    @GetMapping("/getContents")
    public List<Content> getContents() {
        return contentService.getContents();
    }

}

