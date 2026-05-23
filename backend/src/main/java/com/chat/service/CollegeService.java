package com.chat.service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.chat.entity.College;
import com.chat.entity.User;
import com.chat.model.CollegeFilterModel;
import com.chat.model.CollegeModel;
import com.chat.repository.CollegeSavedRepository;


@Service
public class CollegeService {

	 @Autowired
	 private CollegeSavedRepository crep;

	    @Autowired
	    private ActivityService aserv;
	public CollegeService() {
		// TODO Auto-generated constructor stub
	}



/*	public College save(CollegeModel model, User user) {
		try {
			College tr = new College(model);
		
			User userob = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			tr.setUser(userob);
			
			return crep.save(tr);
		} catch (Exception e) {
			return null;
		}
	}*/



	public List<College> getRecommendedColleges(CollegeFilterModel filter) {
	    List<College> allColleges = crep.findAll();

	    return allColleges.stream()
	        // Filter by marks: only show colleges where user meets or exceeds cutoff
	        .filter(c -> filter.getMarks() == 0 || filter.getMarks() >= c.getMarks())

	        // Filter by location (case-insensitive partial match)
	        .filter(c -> filter.getLocation() == null || filter.getLocation().isEmpty() ||
	                     c.getLocation().toLowerCase().contains(filter.getLocation().toLowerCase()))

	        // Filter by stream (case-insensitive)
	        .filter(c -> filter.getStream() == null || filter.getStream().isEmpty() ||
	                     c.getStream().toLowerCase().contains(filter.getStream().toLowerCase()))

	        // Filter by course type
	        .filter(c -> filter.getCourseType() == null || filter.getCourseType().isEmpty() ||
	                     c.getCourseType().toLowerCase().contains(filter.getCourseType().toLowerCase()))

	        // Filter by budget
	        .filter(c -> filter.getBudget() == 0 || c.getBudget() <= filter.getBudget())

	        // Optional: filter by preferences (if you want to use it)
	        .filter(c -> filter.getPreferences() == null || filter.getPreferences().isEmpty() ||
	                     c.getPreferences().toLowerCase().contains(filter.getPreferences().toLowerCase()))

	        .collect(Collectors.toList());
	}




	public List<College> list(User userob) {
		// TODO Auto-generated method stub
		try {
			return crep.findAll();
		} catch (Exception e) {
			return null;
			
		}
	}



	/*public College get(int id) {
		try {
			return crep.findById(id).get();
			
		} catch (Exception e) {
			return null;
		}

	}*/



	public College update(College college) {
		
		return crep.save(college);
		
	}



	public College get(int id) {
		// TODO Auto-generated method stub
		return null;
	}


}
