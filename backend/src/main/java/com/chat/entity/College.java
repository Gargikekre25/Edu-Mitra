package com.chat.entity;

import java.util.Collection;
import java.util.List;

import com.chat.model.CollegeModel;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class College {

	
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    private String collegeName; // Name of the college
	    private String location;
	    private String courseType; 
	    private double rating;
	    private String stream;

	    // Fees and placement details
	    private int budget;
	    private int marks;
	    private String preferences;

	    

	    
	   
	   
	    @ManyToOne
	    @JoinColumn(name = "user_id")
	    private User user;
	public College() {
		// TODO Auto-generated constructor stub
	}


	public College(Long id, String collegeName, String location, String courseType, double rating, String stream,
			int budget, int marks, String preferences, User user) {
		super();
		this.id = id;
		this.collegeName = collegeName;
		this.location = location;
		this.courseType = courseType;
		this.rating = rating;
		this.stream = stream;
		this.budget = budget;
		this.marks = marks;
		this.preferences = preferences;
		this.user = user;
	}



	public College(String collegeName, String location, String courseType, double rating, String stream, int budget,
			int marks, String preferences, User user) {
		super();
		this.collegeName = collegeName;
		this.location = location;
		this.courseType = courseType;
		this.rating = rating;
		this.stream = stream;
		this.budget = budget;
		this.marks = marks;
		this.preferences = preferences;
		this.user = user;
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getCollegeName() {
		return collegeName;
	}


	public void setCollegeName(String collegeName) {
		this.collegeName = collegeName;
	}


	public String getLocation() {
		return location;
	}


	public void setLocation(String location) {
		this.location = location;
	}


	public String getCourseType() {
		return courseType;
	}


	public void setCourseType(String courseType) {
		this.courseType = courseType;
	}


	public double getRating() {
		return rating;
	}


	public void setRating(double rating) {
		this.rating = rating;
	}


	public String getStream() {
		return stream;
	}


	public void setStream(String stream) {
		this.stream = stream;
	}


	public int getBudget() {
		return budget;
	}


	public void setBudget(int budget) {
		this.budget = budget;
	}


	public int getMarks() {
		return marks;
	}


	public void setMarks(int marks) {
		this.marks = marks;
	}


	public String getPreferences() {
		return preferences;
	}


	public void setPreferences(String preferences) {
		this.preferences = preferences;
	}


	public User getUser() {
		return user;
	}


	public void setUser(User user) {
		this.user = user;
	}


	
}
