package com.ureca.web.model.dto;

import lombok.Data;

@Data
public class Content {
    private Long id;
    private String title;
    private String type;
    private Long genreId;
    private Integer productionYear;
    private String cast;
    private String description;
    private Double rating;
    private String img;
}