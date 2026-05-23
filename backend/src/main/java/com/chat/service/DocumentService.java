package com.chat.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.chat.entity.Document;
import com.chat.entity.User;
import com.chat.model.DocumentModel;
import com.chat.repository.DocumentRepository;

@Service
public class DocumentService {

	@Autowired
	private DocumentRepository drep;
	public DocumentService() {
		// TODO Auto-generated constructor stub
	}



	/*public Document save(DocumentModel model, User user) {
		try {
			Document dr = new Document(model);
		
			User userob = (User)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			dr.setUser(userob);
			
			return drep.save(dr);
		} catch (Exception e) {
			return null;
		}
	}*/
		
	}


