package com.chat.repository;

import com.chat.entity.Activity;
import com.chat.entity.College;
import com.chat.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

	public interface CollegeSavedRepository extends JpaRepository<College, Long> {
		
		List<Activity> findByUser(User user);

		College save(College college);

		long countByUser(User user);
		
		@Query("SELECT DISTINCT c.location FROM College c")
		List<String> findDistinctLocations();

		@Query("SELECT DISTINCT c.stream FROM College c")
		List<String> findDistinctStreams();
		

	    // =========================
	    // SINGLE FILTERS
	    // =========================

	    // Filter by location
	    List<College> findByLocationContainingIgnoreCase(String location);

	    // Filter by stream
	    List<College> findByStreamContainingIgnoreCase(String stream);

	    // Filter by course type
	    List<College> findByCourseTypeContainingIgnoreCase(String courseType);

	    // Filter by budget
	    List<College> findByBudgetLessThanEqual(int budget);

	    // Filter by marks
	    List<College> findByMarksGreaterThanEqual(int marks);

	    // Filter by rating
	    List<College> findByRatingGreaterThanEqual(double rating);



	    // =========================
	    // DOUBLE FILTERS
	    // =========================

	    // Location + Stream
	    List<College>
	    findByLocationContainingIgnoreCaseAndStreamContainingIgnoreCase(
	            String location,
	            String stream
	    );

	    // Location + Course Type
	    List<College>
	    findByLocationContainingIgnoreCaseAndCourseTypeContainingIgnoreCase(
	            String location,
	            String courseType
	    );

	    // Stream + Budget
	    List<College>
	    findByStreamContainingIgnoreCaseAndBudgetLessThanEqual(
	            String stream,
	            int budget
	    );

	    // Stream + Marks
	    List<College>
	    findByStreamContainingIgnoreCaseAndMarksGreaterThanEqual(
	            String stream,
	            int marks
	    );



	    // =========================
	    // TRIPLE FILTERS
	    // =========================

	    // Location + Stream + Budget
	    List<College>
	    findByLocationContainingIgnoreCaseAndStreamContainingIgnoreCaseAndBudgetLessThanEqual(
	            String location,
	            String stream,
	            int budget
	    );

	    // Location + Stream + Marks
	    List<College>
	    findByLocationContainingIgnoreCaseAndStreamContainingIgnoreCaseAndMarksGreaterThanEqual(
	            String location,
	            String stream,
	            int marks
	    );

	    // Stream + Budget + Marks
	    List<College>
	    findByStreamContainingIgnoreCaseAndBudgetLessThanEqualAndMarksGreaterThanEqual(
	            String stream,
	            int budget,
	            int marks
	    );
	}