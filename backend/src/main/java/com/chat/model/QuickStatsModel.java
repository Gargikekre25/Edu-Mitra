package com.chat.model;

public class QuickStatsModel {

	public QuickStatsModel() {
		// TODO Auto-generated constructor stub
	}
	
	 private long chatSessions;
	    private long collegesSaved;
	    private long documentsAdded;
	    private long scholarships;

	    public QuickStatsModel(long chatSessions, long collegesSaved, long documentsAdded, long scholarships) {
	        this.chatSessions = chatSessions;
	        this.collegesSaved = collegesSaved;
	        this.documentsAdded = documentsAdded;
	        this.scholarships = scholarships;
	    }

	    // Getters & Setters
	    public long getChatSessions() { return chatSessions; }
	    public void setChatSessions(long chatSessions) { this.chatSessions = chatSessions; }

	    public long getCollegesSaved() { return collegesSaved; }
	    public void setCollegesSaved(long collegesSaved) { this.collegesSaved = collegesSaved; }

	    public long getDocumentsAdded() { return documentsAdded; }
	    public void setDocumentsAdded(long documentsAdded) { this.documentsAdded = documentsAdded; }

	    public long getScholarships() { return scholarships; }
	    public void setScholarships(long scholarships) { this.scholarships = scholarships; }

}
