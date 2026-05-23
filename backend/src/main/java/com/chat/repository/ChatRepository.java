package com.chat.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.chat.entity.ChatHistory;

@Repository
public interface ChatRepository extends JpaRepository<ChatHistory, Long> {

	List<ChatHistory> findByUserId(Long userId);
	
	

}
