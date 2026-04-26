package com.Employee_Management.Employee_Management.service;

import com.Employee_Management.Employee_Management.entity.Employee;
import com.Employee_Management.Employee_Management.repository.EmployeeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository repo;

    public List<Employee> getAllEmployees() {
        return repo.findAll();
    }

    public Employee saveEmployee(Employee emp) {
        return repo.save(emp);
    }

    public void deleteEmployee(Long id) {
        repo.deleteById(id);
    }
}
