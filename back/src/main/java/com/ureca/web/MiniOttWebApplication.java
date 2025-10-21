package com.ureca.web;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication
@PropertySource("classpath:config/secu.properties")
public class MiniOttWebApplication {

	public static void main(String[] args) {
		SpringApplication.run(MiniOttWebApplication.class, args);
	}

}
