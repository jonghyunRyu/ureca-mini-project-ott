package com.ureca.web.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Member {
	
	private Long no;
	private String id;
	private String password;
	private String passwordConfirm;
	private String email;
	private String nickname;
}
