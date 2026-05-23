package com.chat.model;

public class ActivityModel {

	
	 private Long id;
	 private String description; 
	 
	public ActivityModel() {
		// TODO Auto-generated constructor stub
	}

	public ActivityModel(Long id, String description) {
		super();
		this.id = id;
		this.description = description;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	

}
