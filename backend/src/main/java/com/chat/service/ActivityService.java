package com.chat.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chat.entity.Activity;
import com.chat.entity.User;
import com.chat.repository.ActivityRepository;
import com.chat.repository.UserRepository;

@Service
public class ActivityService {
	
	@Autowired
	public ActivityRepository arep;
	
	@Autowired
	public UserRepository urep;

	public ActivityService() {
		// TODO Auto-generated constructor stub
	}

	public List<Activity> getRecentActivities(User user) {
		return arep.findByUserOrderByTimestampDesc(user);
	}

	public Activity addActivity(User user, String description) {
        Activity activity = new Activity(description, LocalDateTime.now(), user);
        return arep.save(activity);
    }

	

	public Activity logActivity(User user, String description) {
		 Activity activity = new Activity();
	        activity.setDescription(description);
	        activity.setTimestamp(LocalDateTime.now());
	        activity.setUser(user);
	        return arep.save(activity);
		
	}

	

}
