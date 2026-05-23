package com.chat.config;

import org.hibernate.validator.internal.util.stereotypes.Lazy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfigurataion
{
	@Lazy
	@Autowired
	private JWTAuthFilter jwtAuthFilter;
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception 
	{
		http
			.csrf(t -> t.disable())      //cross site reference tokenary
			.cors(Customizer.withDefaults())
			.authorizeHttpRequests(auth-> 
					auth.requestMatchers("/api/documents/**").permitAll()
					
					.requestMatchers("/app/**").permitAll() //money controller has login and register pages which do not require authentication or authorisation
					.requestMatchers("/api/chat/**").permitAll() 
					.requestMatchers("/dashboard/admin/**").hasRole("ADMIN")
					.requestMatchers("/dashboard/parent/**").hasRole("PARENT")
					.requestMatchers("/dashboard/student/**").hasRole("STUDENT") // admin wali admin ko aur customer wali customer ko dikhe
					
					.anyRequest().authenticated())
			.exceptionHandling(cust->cust.accessDeniedPage("/app/wrongauth")) // jab bhi koi wrong authorisation karega to exception yha forward hoga 
			.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);	
		
		return http.build();
	}
	
	
	@Bean
	public PasswordEncoder getEncoder() 
	{
		return new BCryptPasswordEncoder();
	}
}