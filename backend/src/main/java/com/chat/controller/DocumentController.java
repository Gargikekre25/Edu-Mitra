package com.chat.controller;

import com.chat.entity.Document;
import com.chat.repository.DocumentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/documents")
@CrossOrigin(origins = "http://localhost:5173")
public class DocumentController {

    @Autowired
    private DocumentRepository documentRepository;

    private final String uploadDir =
            System.getProperty("user.dir") + "/uploads/";

    // ================= UPLOAD =================

    @PostMapping("/upload")
    public ResponseEntity<?> uploadDocument(
            @RequestParam("file") MultipartFile file,
            @RequestParam("userId") Long userId
    ) throws IOException {

        File dir = new File(uploadDir);

        if (!dir.exists()) {
            dir.mkdirs();
        }

        String uniqueFileName =
                UUID.randomUUID() + "_" + file.getOriginalFilename();

        String filePath = uploadDir + uniqueFileName;

        file.transferTo(new File(filePath));

        Document document = new Document();

        document.setFileName(file.getOriginalFilename());
        document.setFileType(file.getContentType());
        document.setFilePath(filePath);
        document.setUserId(userId);

        documentRepository.save(document);

        return ResponseEntity.ok("File uploaded successfully");
    }

    // ================= GET USER FILES =================

    @GetMapping("/all/{userId}")
    public ResponseEntity<?> getUserFiles(
            @PathVariable Long userId
    ) {

        List<Document> files = documentRepository.findByUserId(userId);

        System.out.println("FILES SENT TO FRONTEND:");
        
        for (Document d : files) {
            System.out.println(
                "ID: " + d.getId() +
                " NAME: " + d.getFileName()
            );
        }

        return ResponseEntity.ok(files);
    }

    // ================= DOWNLOAD FILE =================

    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> downloadFile(
            @PathVariable Long id
    ) throws IOException {

        Document document = documentRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("File not found"));

        Path path = Paths.get(document.getFilePath());

        Resource resource = new UrlResource(path.toUri());

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "inline; filename=\"" +
                                document.getFileName() + "\""
                )
                .body(resource);
    }
}