package com.chat.model;



import com.chat.entity.Role;

public class LoginResponseModel {

    private Long id;
    private String firstName;
    private Role role;
    private String token;

    public LoginResponseModel() {
    }

    public LoginResponseModel(Long id, String firstName, Role role, String token) {
        this.id = id;
        this.firstName = firstName;
        this.role = role;
        this.token = token;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}