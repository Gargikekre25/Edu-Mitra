package com.chat.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chat.entity.Activity;
import com.chat.entity.User;

public interface ActivityRepository extends JpaRepository<Activity, Long> {

	
	List<Activity> findByUserOrderByTimestampDesc(User user);
	
	long countByUserAndDescriptionContaining(User user, String keyword);

	
}
