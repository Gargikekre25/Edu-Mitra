package com.chat.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class ChatHistory {
	
	public ChatHistory() {
		// TODO Auto-generated constructor stub
	}
	
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    private String question;

	    @Column(length = 5000)
	    private String answer;

	    private LocalDateTime timestamp = LocalDateTime.now();

	    @ManyToOne
	    private User user;  // optional: link chat to a specific user

	    // Getters and Setters
	    public Long getId() { return id; }
	    public void setId(Long id) { this.id = id; }

	    public String getQuestion() { return question; }
	    public void setQuestion(String question) { this.question = question; }

	    public String getAnswer() { return answer; }
	    public void setAnswer(String answer) { this.answer = answer; }

	    public LocalDateTime getTimestamp() { return timestamp; }
	    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }

	    public User getUser() { return user; }
	    public void setUser(User user) { 
	        this.user = user; 
	    }
			
	}


	

	
	

