package com.Employee_Management.Employee_Management.controller;

import com.Employee_Management.Employee_Management.entity.Employee;
import com.Employee_Management.Employee_Management.service.EmployeeService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:3000")
public class EmployeeController {

    private final EmployeeService service;

    // ✅ Constructor Injection
    public EmployeeController(EmployeeService service) {
        this.service = service;
    }

    // ✅ GET ALL
    @GetMapping
    public ResponseEntity<List<Employee>> getAll() {
        return ResponseEntity.ok(service.getAllEmployees());
    }

    // ✅ CREATE
    @PostMapping
    public ResponseEntity<Employee> save(@RequestBody Employee emp) {
        return ResponseEntity.ok(service.saveEmployee(emp));
    }

    // ✅ DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        service.deleteEmployee(id);
        return ResponseEntity.ok("Employee deleted successfully");
    }

    // ✅ UPDATE (VERY IMPORTANT 🔥)
    @PutMapping("/{id}")
    public ResponseEntity<Employee> update(@PathVariable Long id, @RequestBody Employee emp) {
        emp.setId(id);
        return ResponseEntity.ok(service.saveEmployee(emp));
    }
}
