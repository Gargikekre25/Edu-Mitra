package com.chat.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chat.entity.ChatHistory;
import com.chat.repository.ChatRepository;

@Service
public class ChatService {

	public ChatService() {
		// TODO Auto-generated constructor stub
	}
	@Autowired
    private ChatRepository chatRepository;

	public List<ChatHistory> getChatsByUser(Long userId) {
		return chatRepository.findByUserId(userId);
		
	}

	public ChatHistory saveChat(ChatHistory chat) {
		return chatRepository.save(chat);
		
	}

}
