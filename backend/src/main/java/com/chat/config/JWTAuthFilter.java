package com.chat.config;


import java.io.IOException;
import java.net.http.HttpResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.chat.util.APIResponse;
import com.google.gson.Gson;

import org.springframework.security.core.userdetails.UserDetails;



import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

//JWTAuthFilter will execute for each request to check the authorization
@Component
public class JWTAuthFilter extends OncePerRequestFilter
{
	@Autowired
	private JWTUtils jwtUtils;
	
	@Autowired
	private UserDetailsService userDetailsService;



	@Override
	protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
	    String uri = request.getRequestURI();

	    return uri.startsWith("/app/login") ||
	           uri.startsWith("/app/register") ||
	           uri.startsWith("/api/chat");
	}

	/*protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
		String uri = request.getRequestURI();
		return uri.startsWith("/app");
	}*/
	
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		Gson gson = new Gson();
		final String authHeader = request.getHeader("Authorization");
		String path = request.getRequestURI();
		
		
		// ALLOW DOCUMENT APIs WITHOUT JWT
	    if (path.startsWith("/api/documents/")
	            || path.startsWith("/uploads/")) {

	        filterChain.doFilter(request, response);
	        return;
	    }


		// ✅ Bypass token check for login/register even if something went wrong
		if (path.contains("/app/login") || path.contains("/app/register")) {
		    filterChain.doFilter(request, response);
		    return;
		}

		String jwt = null;
		System.out.println("Authorization header = " + authHeader);

		
		if(authHeader!=null && authHeader.startsWith("Bearer ")) 
		{
			jwt = authHeader.substring(7);
			try {
                // ✅ Extract email from token
                String email = jwtUtils.extractUsername(jwt);

                if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    // ✅ Load user details using email
                	UserDetails userDetails = userDetailsService.loadUserByUsername(email);


                    // ✅ Validate token
                    if (jwtUtils.validateToken(jwt)) {
                        var authToken = new org.springframework.security.authentication.UsernamePasswordAuthenticationToken(
                                userDetails, null, userDetails.getAuthorities());
                        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authToken);
                    }
                }
                // ✅ Proceed if everything is valid
                filterChain.doFilter(request, response);

            } catch (Exception e) {
                // Token invalid or expired
                APIResponse res = new APIResponse("Invalid or Expired Token", false, null);
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                response.getWriter().write(gson.toJson(res));
            }

        } else {
            APIResponse res = new APIResponse("Token Not Found", false, null);
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.getWriter().write(gson.toJson(res));
        }
    }
	
}
