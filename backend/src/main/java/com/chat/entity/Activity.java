package com.chat.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Activity {

	
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    private String description;   // e.g., "Saved a new college"
	    private LocalDateTime timestamp; // When the activity happened

	    @ManyToOne
	    @JoinColumn(name = "user_id")
	    private User user; 
	
	    
	    public Activity() {
		// TODO Auto-generated constructor stub
	}


		public Activity(Long id, String description, LocalDateTime timestamp, User user) {
			super();
			this.id = id;
			this.description = description;
			this.timestamp = timestamp;
			this.user = user;
		}


		public Activity(String description, LocalDateTime timestamp, User user) {
			super();
			this.description = description;
			this.timestamp = timestamp;
			this.user = user;
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


		public LocalDateTime getTimestamp() {
			return timestamp;
		}


		public void setTimestamp(LocalDateTime timestamp) {
			this.timestamp = timestamp;
		}


		public User getUser() {
			return user;
		}


		public void setUser(User user) {
			this.user = user;
		}
	    
		
	    

}
