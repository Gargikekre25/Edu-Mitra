package com.chat.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.chat.entity.Activity;
import com.chat.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> 
{
	// Find user by email
	
    
    // Check if email already exists
    boolean existsByEmail(String email);

	Optional<User> findById(Long id);

	User findByEmailAndPassword(String email, String password);

	

	List<User> findByRole(String string);

	List<User> findAll();

	
	    User findByEmail(String email);
	


	
	

	


	
	
}
