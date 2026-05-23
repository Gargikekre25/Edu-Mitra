package com.chat.model;

import com.chat.entity.User;

public class CollegeModel {

	
	   
	  
	private String collegeName; // Name of the college
    private String location;
    private String type; // Government/Private
    private double rating;
    private int established;
    private int minFees;
    private int maxFees;
    private int avgPackage;
    private int highestPackage;
    private int placementPercentage;

	   
	public CollegeModel() {
		// TODO Auto-generated constructor stub
	}


	public CollegeModel(String collegeName, String location, String type, double rating, int established, int minFees,
			int maxFees, int avgPackage, int highestPackage, int placementPercentage) {
		super();
		this.collegeName = collegeName;
		this.location = location;
		this.type = type;
		this.rating = rating;
		this.established = established;
		this.minFees = minFees;
		this.maxFees = maxFees;
		this.avgPackage = avgPackage;
		this.highestPackage = highestPackage;
		this.placementPercentage = placementPercentage;
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


	public String getType() {
		return type;
	}


	public void setType(String type) {
		this.type = type;
	}


	public double getRating() {
		return rating;
	}


	public void setRating(double rating) {
		this.rating = rating;
	}


	public int getEstablished() {
		return established;
	}


	public void setEstablished(int established) {
		this.established = established;
	}


	public int getMinFees() {
		return minFees;
	}


	public void setMinFees(int minFees) {
		this.minFees = minFees;
	}


	public int getMaxFees() {
		return maxFees;
	}


	public void setMaxFees(int maxFees) {
		this.maxFees = maxFees;
	}


	public int getAvgPackage() {
		return avgPackage;
	}


	public void setAvgPackage(int avgPackage) {
		this.avgPackage = avgPackage;
	}


	public int getHighestPackage() {
		return highestPackage;
	}


	public void setHighestPackage(int highestPackage) {
		this.highestPackage = highestPackage;
	}


	public int getPlacementPercentage() {
		return placementPercentage;
	}


	public void setPlacementPercentage(int placementPercentage) {
		this.placementPercentage = placementPercentage;
	}
	
	
}