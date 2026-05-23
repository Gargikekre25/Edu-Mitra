package com.chat.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chat.service.UserService;
import com.chat.util.APIResponse;
import com.chat.config.JWTUtils;
import com.chat.model.LoginResponseModel;
import com.chat.entity.Role;
import com.chat.entity.User;
import com.chat.model.LoginModel;
import com.chat.model.UserModel;

@RestController
@RequestMapping("/app")
public class AuthController {
	
	public static APIResponse resp;
	
	@Autowired
	public UserService userv;
	
	@Autowired
	private JWTUtils jwtUtils;
	
	@PostMapping("/register")
	public ResponseEntity<APIResponse> register(@RequestBody UserModel model) {
	    if (model.getRole() == Role.ADMIN) {
	        resp = new APIResponse("Admin registration not allowed", false, null);
	        return ResponseEntity.ok(resp);
	    }

	    User saved = userv.saveUser(model);
	    if (saved != null) {
	        resp = new APIResponse("User registered successfully", true, saved);
	    } else {
	        resp = new APIResponse("Registration failed", false, null);
	    }
	    return ResponseEntity.ok(resp);
	}
 
	@PostMapping("/login")
	public ResponseEntity<APIResponse> login(@RequestBody LoginModel model) {
	    User ob = userv.checkLogin(model);
	    System.out.println("Frontend role value: " + model.getRole());
	    System.out.println("User email: " + model.getEmail());
	    System.out.println("User password: " + model.getPassword());

	    if (ob != null) {
	        String token = jwtUtils.generateToken(ob.getEmail());
	        LoginResponseModel logmodel = new LoginResponseModel(
	        	    ob.getId(),
	        	    ob.getFirstName(),
	        	    ob.getRole(),
	        	    token
	        	);
	        resp = new APIResponse("Welcome to the app", true, logmodel);
	        return ResponseEntity.ok(resp);
	    } else {
	        resp = new APIResponse("Invalid credentials or role mismatch", false, null);
	        return ResponseEntity.ok(resp);
	    }
	}

	
	@GetMapping("/wrongauth")
	public ResponseEntity<APIResponse> wrongAuth()
	{
		resp = new APIResponse("Unauthorised user",true,null);
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(resp);
	}
}
