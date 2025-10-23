package com.ureca.web.model.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ureca.web.model.dao.ContentDao;
import com.ureca.web.model.dto.Content;

@Service
public class ContentService {

    @Autowired
    ContentDao contentDao;

    public List<Content> getContents() {
        return contentDao.getContents();
    }
}