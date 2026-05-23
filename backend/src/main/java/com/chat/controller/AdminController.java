package com.chat.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chat.entity.College;
import com.chat.entity.User;
import com.chat.repository.CollegeSavedRepository;
import com.chat.repository.UserRepository;
import com.chat.service.CollegeService;
import com.chat.util.APIResponse;
import com.chat.util.SecurityUtil;

@RestController
@RequestMapping("/dashboard/admin")
public class AdminController {
	
	@Autowired
	private SecurityUtil su;
    
	 @Autowired
	    private CollegeSavedRepository crep;
	 @Autowired
	    private UserRepository urep;

	 @Autowired
	    private CollegeService cserv;


	public AdminController() {
		// TODO Auto-generated constructor stub
	}

	@GetMapping("/home")
	public String homepage() {
		return "Welcome to the Admin's dashboard";
	}
	
	 @PostMapping("/saveCollege")
		public ResponseEntity<APIResponse> saveCollege(@RequestBody College college){
	    	 
	    	    College savedCollege = crep.save(college);

	    	    return ResponseEntity.ok(new APIResponse("saved college", true, college));
	    	}
	 
	 @GetMapping("/getclglist")
	 public ResponseEntity<APIResponse> list(){
			User userob=(User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			List<College> list = crep.findAll();
			if(list!=null) {
				return ResponseEntity.ok(new APIResponse("List of Colleges",true,list));
			}
			else
				return ResponseEntity.ok(new APIResponse("No College found",false,null));
		}
	 
	 @GetMapping("/seeUserList")
	 public ResponseEntity<APIResponse> userList(){
			User userob=(User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			List<User> list = urep.findAll();
			if(list!=null) {
				return ResponseEntity.ok(new APIResponse("List of Users",true,list));
			}
			else
				return ResponseEntity.ok(new APIResponse("No user found",false,null));
		}
	 
	 @PostMapping("/addUser")
	 public ResponseEntity<APIResponse> addUser(@RequestBody User user){
    	 
 	    User newUser = urep.save(user);

 	    return ResponseEntity.ok(new APIResponse("saved college", true, user));
 	}

	 @PutMapping("/updateClg/{id}")
	 public ResponseEntity<APIResponse> get(@PathVariable("id") int id,@RequestBody College college){
			College cr = cserv.get(id);
			if(cr!=null) {
				cserv.update(college);
				cr=cserv.update(cr);
				return ResponseEntity.ok(new APIResponse("College updated..",true,cr));
			}
			else
				return ResponseEntity.ok(new APIResponse("College could not be updated..",false,null));
		}

	 
	 
	 
	
}

