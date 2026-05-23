package com.chat.model;


public class CollegeFilterModel {
    private int marks;
    private String location;
    private String stream;
    private int budget;
    private String courseType;
    private String preferences;

    public int getMarks() { return marks; }
    public void setMarks(int marks) { this.marks = marks; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getStream() { return stream; }
    public void setStream(String stream) { this.stream = stream; }

    public int getBudget() { return budget; }
    public void setBudget(int budget) { this.budget = budget; }

    public String getCourseType() { return courseType; }
    public void setCourseType(String courseType) { this.courseType = courseType; }

    public String getPreferences() { return preferences; }
    public void setPreferences(String preferences) { this.preferences = preferences; }
}
