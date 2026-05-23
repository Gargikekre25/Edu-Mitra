package com.chat.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.chat.entity.Activity;
import com.chat.entity.User;
import com.chat.model.ActivityModel;
import com.chat.model.QuickStatsModel;
import com.chat.repository.UserRepository;
import com.chat.service.ActivityService;
import com.chat.service.DashboardService;
import com.chat.util.SecurityUtil;

@RestController
@RequestMapping("/dashboard/student")
public class DashboardController {
	
	@Autowired
	public ActivityService aserv;
	@Autowired
	public UserRepository urep;
	
	@Autowired
	 public SecurityUtil securityUtil;

	
	@Autowired
	private DashboardService dashboardService;


	
	
	@GetMapping("/home")
	public String homepage() {
		return "Welcome to the dashboard";
	}
	
	
	@GetMapping("/activity")
	public List<Activity> getRecentActivities() {
        User user = securityUtil.getCurrentUser();
        return aserv.getRecentActivities(user);
    }
	
	
	@GetMapping("/stats")
	public QuickStatsModel getQuickStats() {
	    User user = securityUtil.getCurrentUser();
	    return dashboardService.getStats(user);
	}
	    
	    
}
