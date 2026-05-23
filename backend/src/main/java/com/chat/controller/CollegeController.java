package com.chat.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chat.entity.College;
import com.chat.entity.Document;
import com.chat.entity.User;
import com.chat.model.CollegeFilterModel;
import com.chat.model.CollegeModel;
import com.chat.model.DocumentModel;
import com.chat.repository.UserRepository;
import com.chat.service.ActivityService;
import com.chat.service.CollegeService;
import com.chat.util.APIResponse;
import com.chat.util.SecurityUtil;



@RestController
@RequestMapping("/colleges")
public class CollegeController {
	@Autowired
	private SecurityUtil su;
    
	 @Autowired
	    private CollegeService cserv;
	   
	    @Autowired
	    private UserRepository urep;
	    

		@Autowired
		private ActivityService aserv;
		
		
	   
		/* @PostMapping("/saveCollege")
			public ResponseEntity<APIResponse> save(@RequestBody CollegeModel model){
		    	 User user = su.getCurrentUser();

		    	    College college = cserv.save(model,user);

		    	    // add activity
		    	    aserv.logActivity(user, "Added a new college: " + college.getCollegeName());

		    	    return ResponseEntity.ok(new APIResponse("College Added", true, college));
		    	}
	    */
	    @PostMapping("/recommend")
	    public List<College> recommendColleges(@RequestBody CollegeFilterModel filter, Principal principal) {
	        // principal.getName() gives logged-in email
	        return cserv.getRecommendedColleges(filter);
	    }
	    
	    @GetMapping("/collegeList")
	    public ResponseEntity<APIResponse> list(){
			User userob=(User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			List<College> list = cserv.list(userob);
			if(list!=null) {
				return ResponseEntity.ok(new APIResponse("List of Colleges",true,list));
			}
			else
				return ResponseEntity.ok(new APIResponse("No College found",false,null));
		}
		
	  
	
}
