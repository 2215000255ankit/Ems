package com.example.employee_management.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import com.fasterxml.jackson.annotation.JsonProperty;

@Document(collection = "employees")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employee {

    @Id
    @JsonProperty("_id") // ✅ This maps MongoDB's _id to id in Java, but still sends _id to frontend
    private String id;

    private String name;
    private String email;
    private String department;
    private double salary;
}
