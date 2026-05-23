package com.chat;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import jakarta.annotation.PreDestroy;

@SpringBootApplication
public class StudentChatbotApplication {

	 @Autowired
	    private DataSource dataSource;
	 
	public static void main(String[] args) {
		SpringApplication.run(StudentChatbotApplication.class, args);
		
	}
		@PreDestroy
	    public void closeDataSource() throws Exception {
	        if (dataSource instanceof com.zaxxer.hikari.HikariDataSource) {
	            ((com.zaxxer.hikari.HikariDataSource) dataSource).close();
	            System.out.println("✅ HikariCP connection pool closed properly!");
	        }
	}

}
