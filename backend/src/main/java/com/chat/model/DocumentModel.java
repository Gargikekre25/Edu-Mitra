package com.chat.model;

public class DocumentModel {

	private String name;        // Document name
    private String type;   
	public DocumentModel() {
		// TODO Auto-generated constructor stub
	}
	public DocumentModel(String name, String type) {
		super();
		this.name = name;
		this.type = type;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	
	

}
