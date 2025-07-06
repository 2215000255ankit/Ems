package com.example.employee_management.service;

import com.example.employee_management.model.Employee;
import com.example.employee_management.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Optional<Employee> getEmployeeById(String id) {
        return employeeRepository.findById(id);
    }

    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    public Employee updateEmployee(String id, Employee updatedEmployee) {
        System.out.println("🔄 Updating Employee with ID: " + id);
        System.out.println("📦 Updated Data: "
                + updatedEmployee.getName() + ", "
                + updatedEmployee.getEmail() + ", "
                + updatedEmployee.getDepartment() + ", "
                + updatedEmployee.getSalary());

        return employeeRepository.findById(id)
                .map(emp -> {
                    emp.setName(updatedEmployee.getName());
                    emp.setEmail(updatedEmployee.getEmail());
                    emp.setDepartment(updatedEmployee.getDepartment());
                    emp.setSalary(updatedEmployee.getSalary());
                    return employeeRepository.save(emp);
                }).orElse(null);
    }

    public void deleteEmployee(String id) {
        employeeRepository.deleteById(id);
    }
}
