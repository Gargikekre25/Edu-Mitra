package com.chat.service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.chat.entity.Role;
import com.chat.entity.User;
import com.chat.model.LoginModel;
import com.chat.model.UserModel;
import com.chat.repository.UserRepository;






@Service
public class UserService implements UserDetailsService {
	
	 @Autowired
	   private UserRepository urep;
	 
	 @Autowired
	 private PasswordEncoder passwordEncoder;


	public UserService() {
		// TODO Auto-generated constructor stub
	}

	public User saveUser(UserModel model) {
	    try {
	        // Restrict admin registration
	        if (model.getRole() == Role.ADMIN) {
	            System.out.println(" Attempt to register as ADMIN blocked.");
	            return null;
	        }

	        // Proceed with normal registration
	        User ob = new User(model);
	        return urep.save(ob);
	    } catch (Exception e) {
	        e.printStackTrace();
	        return null;
	    }
	}


	
	

	 /* public User checkLogin(LoginModel model) {
		    User ob = urep.findByEmail(model.getEmail());

		    if (ob != null && passwordEncoder.matches(model.getPassword(), ob.getPassword())
		            && ob.getRole() == model.getRole()) {
		        return ob;
		    } else {
		        return null;
		    }
		}*/
	  
	  public User checkLogin(LoginModel model) {
		    if (model == null || model.getEmail() == null || model.getRole() == null || model.getPassword() == null) {
		        return null;
		    }

		    User ob = urep.findByEmail(model.getEmail());
		    if (ob == null) return null;

		    // Compare plain-text password (current DB)
		    boolean passwordMatches = model.getPassword().equals(ob.getPassword());

		    // Role comparison (enum -> enum)
		    boolean roleMatches = ob.getRole() != null && ob.getRole() == model.getRole();

		    if (passwordMatches && roleMatches) {
		        return ob;
		    }
		    return null;
		}




	   
	 public List<User> list()
	   {
		   return urep.findByRole("ROLE_STUDENT");
	   }

	 @Override
	 public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
	     User ob = urep.findByEmail(email);
	     if (ob != null)
	         return ob;
	     else
	         throw new UsernameNotFoundException("User not found with email: " + email);
	 }



	
}
	

