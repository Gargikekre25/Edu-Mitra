package com.chat.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/dashboard/parent")
public class ParentController {

	public ParentController() {
		// TODO Auto-generated constructor stub
	}
	
	@GetMapping("/home")
	public String homepage() {
		try {
			return "Welcome to the Parent's dashboard";
		}
		catch(Exception e) {
			e.printStackTrace();
			return null;
		}
		
	}

}
