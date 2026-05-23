package com.chat.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.chat.entity.Activity;
import com.chat.entity.User;

@Repository
public interface ScholarshipRepository extends JpaRepository<Activity, Long> {
    List<Activity> findByUser(User user);
}
