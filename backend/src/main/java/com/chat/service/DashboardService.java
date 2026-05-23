package com.chat.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chat.entity.User;
import com.chat.model.QuickStatsModel;
import com.chat.repository.ActivityRepository;
import com.chat.repository.CollegeSavedRepository;
import com.chat.repository.DocumentRepository;
import com.chat.repository.ScholarshipRepository;

import java.util.HashMap;
import java.util.Map;

@Service
public class DashboardService {

    @Autowired
    private ActivityRepository activityRepo;

    @Autowired
    private CollegeSavedRepository collegeRepo;

    @Autowired
    private DocumentRepository documentRepo;

    @Autowired
    private ScholarshipRepository scholarshipRepo;
    
    

    public DashboardService(ActivityRepository activityRepo, CollegeSavedRepository collegeRepo,
			DocumentRepository documentRepo, ScholarshipRepository scholarshipRepo) {
		super();
		this.activityRepo = activityRepo;
		this.collegeRepo = collegeRepo;
		this.documentRepo = documentRepo;
		this.scholarshipRepo = scholarshipRepo;
	}



	public QuickStatsModel getStats(User user) {
		// TODO Auto-generated method stub
		return null;
	}



    /*public QuickStatsModel getStats(User user) {
        long chatSessions = activityRepo.countByUserAndDescriptionContaining(user, "chat"); // assuming chat activities have "chat" in description
        long collegesSaved = collegeRepo.countByUser(user);
       
        long scholarships = 0; // If you have scholarship entity, use repository.countByUser(user)

        return new QuickStatsModel(chatSessions, collegesSaved, scholarships);
    }*/
}
