package com.chat.controller;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;


import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestBody;

import com.chat.config.JWTUtils;
import com.chat.entity.ChatHistory;
import com.chat.entity.User;
import com.chat.repository.CollegeSavedRepository;
import com.chat.entity.College;
import com.chat.repository.UserRepository;
import com.chat.service.ChatService;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Value;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private CollegeSavedRepository collegeRepository;

    @Autowired
    private JWTUtils jwtUtils;

    @Value("${gemini.api.key}")
    private String GEMINI_API_KEY;
    
    @Value("${gemini.api.url}")
    private String GEMINI_URL;

    @PostMapping
    public Map<String, String> chatWithBot(
            @RequestBody Map<String, String> payload,
            @RequestHeader(value = "Authorization", required = false) String authHeader
    ) throws IOException {

        String question = payload.get("message");
        if (question == null || question.trim().isEmpty()) {
            throw new RuntimeException("Message cannot be empty");
        }

        // Call Gemini API
        OkHttpClient client = new OkHttpClient();
        String fullUrl = GEMINI_URL + "?key=" + GEMINI_API_KEY;

        String lowerQuestion = question.toLowerCase();

        List<College> matchedColleges = collegeRepository.findAll();


        // ================= CITY DETECTION =================
        String detectedCity = null;

        List<String> allCities = collegeRepository.findDistinctLocations();

        for(String city : allCities) {

            if(city != null &&
               lowerQuestion.contains(city.toLowerCase())) {

                detectedCity = city;
                break;
            }
        }


        // ================= STREAM DETECTION =================

        String detectedStream = null;

        
        List<String> allStreams = collegeRepository.findDistinctStreams();

        for(String stream : allStreams) {

            if(stream != null &&
               lowerQuestion.contains(stream.toLowerCase())) {

                detectedStream = stream;
                break;
            }
        }

        // ================= COURSE TYPE DETECTION =================

        String detectedCourseType = null;

        if (lowerQuestion.contains("btech") ||
                lowerQuestion.contains("b.tech")) {

            detectedCourseType = "btech";
        }

        else if (lowerQuestion.contains("polytechnic") ||
                lowerQuestion.contains("diploma")) {

            detectedCourseType = "polytechnic";
        }


        // ================= BUDGET DETECTION =================

        Integer maxBudget = null;

        if (lowerQuestion.contains("low fees") ||
                lowerQuestion.contains("cheap") ||
                lowerQuestion.contains("affordable")) {

            maxBudget = 100000;
        }


        // ================= RATING DETECTION =================

        Double minRating = null;

        if (lowerQuestion.contains("best college") ||
                lowerQuestion.contains("top college")) {

            minRating = 4.0;
        }


        // ================= APPLY FILTERS =================

        // CITY FILTER
        if (detectedCity != null) {

            String finalDetectedCity = detectedCity;

            matchedColleges = matchedColleges.stream()
                    .filter(c -> c.getLocation() != null &&
                            c.getLocation().toLowerCase()
                                    .contains(finalDetectedCity))
                    .toList();
        }


        // STREAM FILTER
        if (detectedStream != null) {

            String finalDetectedStream = detectedStream;

            matchedColleges = matchedColleges.stream()
                    .filter(c -> c.getStream() != null &&
                            c.getStream().toLowerCase()
                            .contains(finalDetectedStream.toLowerCase()))
                    .toList();
        }
        
        String detectedPreference = null;

        if(lowerQuestion.contains("placement")) {
            detectedPreference = "placement";
        }

        else if(lowerQuestion.contains("government")) {
            detectedPreference = "government";
        }

        else if(lowerQuestion.contains("private")) {
            detectedPreference = "private";
        }

        else if(lowerQuestion.contains("affordable")) {
            detectedPreference = "affordable";
        }

        else if(lowerQuestion.contains("research")) {
            detectedPreference = "research";
        }

        else if(lowerQuestion.contains("diploma")) {
            detectedPreference = "diploma";
        }

        else if(lowerQuestion.contains("girls")) {
            detectedPreference = "girls";
        }

        if(detectedPreference != null) {

            String finalPreference = detectedPreference;

            matchedColleges = matchedColleges.stream()
                    .filter(c -> c.getPreferences() != null &&
                            c.getPreferences().toLowerCase()
                                    .contains(finalPreference))
                    .toList();
        }


        // COURSE TYPE FILTER
        if (detectedCourseType != null) {

            String finalDetectedCourseType = detectedCourseType;

            matchedColleges = matchedColleges.stream()
                    .filter(c -> c.getCourseType() != null &&
                            c.getCourseType().toLowerCase()
                                    .contains(finalDetectedCourseType))
                    .toList();
        }


        // BUDGET FILTER
        if (maxBudget != null) {

            Integer finalMaxBudget = maxBudget;

            matchedColleges = matchedColleges.stream()
                    .filter(c -> c.getBudget() <= finalMaxBudget)
                    .toList();
        }

        // RATING FILTER
        if (minRating != null) {

            Double finalMinRating = minRating;

            matchedColleges = matchedColleges.stream()
                    .filter(c -> c.getRating() >= finalMinRating)
                    .toList();
        }


        // Create DB Context
        StringBuilder collegeData = new StringBuilder();

        if(matchedColleges.isEmpty()) {

            collegeData.append("No college data found.");

        } else {

            for(College c : matchedColleges) {

                collegeData.append(
                        "College Name: ").append(c.getCollegeName())
                        .append(", Location: ").append(c.getLocation())
                        .append(", Course Type: ").append(c.getCourseType())
                        .append(", Stream: ").append(c.getStream())
                        .append(", Budget: ").append(c.getBudget())
                        .append(", Required Marks: ").append(c.getMarks())
                        .append(", Rating: ").append(c.getRating())
                        .append(", Preferences: ").append(c.getPreferences())
                        .append("\n");
            }
        }


        // Gemini Prompt
        String prompt = """
        		You are a DTE Rajasthan AI counselling assistant.

        		STRICT RULES:
        		1. Answer ONLY from the provided college database.
        		2. Never generate fake colleges or fake fees.
        		3. If matching colleges are unavailable, say:
        		   "Relevant data is not available in the DTE Rajasthan database currently."
        		4. Keep answers concise, natural and student-friendly.
        		5. Format college recommendations clearly in bullet points.
        		6. Do not answer unrelated general knowledge questions.

        		College Database:
        		""" + collegeData.toString() +

        		"\nUser Question:\n" + question;



        JSONObject jsonBody = new JSONObject();

        jsonBody.put("contents", new org.json.JSONArray()
                .put(new JSONObject()
                        .put("parts", new org.json.JSONArray()
                                .put(new JSONObject().put("text", prompt)))));

        JSONObject generationConfig = new JSONObject();

        generationConfig.put("temperature", 0.1);
        generationConfig.put("topP", 0.7);
        generationConfig.put("topK", 20);

        jsonBody.put("generationConfig", generationConfig);

        okhttp3.RequestBody body = okhttp3.RequestBody.create(
                jsonBody.toString(),
                MediaType.get("application/json")
        );

        Request geminiRequest = new Request.Builder()
                .url(fullUrl)
                .addHeader("Content-Type", "application/json")
               
                .post(body)
                .build();

        Response response = client.newCall(geminiRequest).execute();
        /*if (!response.isSuccessful()) {
            throw new IOException("Unexpected code " + response + " | " + response.body().string());
        }*/
        
        if (!response.isSuccessful()) {
            String errorBody = response.body().string();
            System.out.println("API KEY = " + GEMINI_API_KEY);
            System.out.println("Gemini API ERROR: " + errorBody); // ADD THIS
            throw new IOException("Unexpected code " + response + " | " + errorBody);
        }

        String responseBody = response.body().string();

        System.out.println("RAW GEMINI RESPONSE = " + responseBody);

        JSONObject jsonResponse = new JSONObject(responseBody);

        String answer = "Sorry, no response generated.";

        if (jsonResponse.has("candidates")) {

            var candidates = jsonResponse.getJSONArray("candidates");

            if (candidates.length() > 0) {

                JSONObject firstCandidate = candidates.getJSONObject(0);

                if (firstCandidate.has("content")) {

                    JSONObject content = firstCandidate.getJSONObject("content");

                    if (content.has("parts")) {

                        var parts = content.getJSONArray("parts");

                        if (parts.length() > 0) {

                            JSONObject firstPart = parts.getJSONObject(0);

                            if (firstPart.has("text")) {

                                answer = firstPart.getString("text");
                            }
                        }
                    }
                }
            }
        }

        // Save chat only if user is logged in
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String jwt = authHeader.substring(7);
            String email = jwtUtils.extractUsername(jwt);
            User user = userRepository.findByEmail(email);
            if (user != null) {
                ChatHistory chat = new ChatHistory();
                chat.setQuestion(question);
                chat.setAnswer(answer);
                chat.setUser(user);
                chatService.saveChat(chat);
            }
        }

        // Return chat for both guest & user
        Map<String, String> res = new HashMap<>();
        res.put("reply", answer);
        return res;
    }


    @GetMapping("/history/{userId}")
    public List<ChatHistory> getChatHistory(@PathVariable Long userId) {
        return chatService.getChatsByUser(userId);
    }
}

