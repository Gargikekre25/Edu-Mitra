package com.chat.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Scholarship {

	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    private String name;        // Scholarship name
	    private boolean applied;    // If user applied
	    private LocalDateTime dateApplied;

	    @ManyToOne
	    @JoinColumn(name = "user_id")
	    private User user;
	public Scholarship() {
		// TODO Auto-generated constructor stub
	}
	public Scholarship(Long id, String name, boolean applied, LocalDateTime dateApplied, User user) {
		super();
		this.id = id;
		this.name = name;
		this.applied = applied;
		this.dateApplied = dateApplied;
		this.user = user;
	}
	public Scholarship(String name, boolean applied, LocalDateTime dateApplied, User user) {
		super();
		this.name = name;
		this.applied = applied;
		this.dateApplied = dateApplied;
		this.user = user;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public boolean isApplied() {
		return applied;
	}
	public void setApplied(boolean applied) {
		this.applied = applied;
	}
	public LocalDateTime getDateApplied() {
		return dateApplied;
	}
	public void setDateApplied(LocalDateTime dateApplied) {
		this.dateApplied = dateApplied;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	
	

}
