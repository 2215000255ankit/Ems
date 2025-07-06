package com.example.employee_management.controller;

import com.example.employee_management.model.User;
import com.example.employee_management.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    /* ---------- SIGN-UP ---------- */
    @PostMapping("/signup")
    public ResponseEntity<Map<String, String>> signup(@RequestBody User newUser) {
        if (userRepository.findByEmail(newUser.getEmail()).isPresent()) {
            return ResponseEntity.status(409).body(Map.of("message", "Email already exists"));
        }
        if (newUser.getRole() == null || newUser.getRole().isBlank())
            newUser.setRole("user");
        userRepository.save(newUser);
        return ResponseEntity.ok(Map.of("message", "User registered successfully"));
    }

    /* ---------- LOGIN ---------- */
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody User login) {

        Optional<User> userOpt = userRepository.findByEmail(login.getEmail());
        if (userOpt.isEmpty() || !userOpt.get().getPassword().equals(login.getPassword())) {
            return ResponseEntity.status(401).body(Map.of("message", "Invalid email or password"));
        }

        User user = userOpt.get();
        // In production, generate a JWT here
        return ResponseEntity.ok(
                Map.of("token", "dummy-token", "role", user.getRole())
        );
    }
}
