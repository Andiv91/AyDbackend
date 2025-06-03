package com.example.backend.controller;
import com.example.backend.repository.UserRepository;
import com.example.backend.repository.ActivityRepository;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import java.util.stream.Collectors;
import com.example.backend.model.User;

@RestController
@RequestMapping("/api/profesores")
public class ProfesorController {
    private final UserRepository userRepository;
    private final ActivityRepository activityRepository;

    public ProfesorController(UserRepository userRepository, ActivityRepository activityRepository) {
        this.userRepository = userRepository;
        this.activityRepository = activityRepository;
    }

    @GetMapping
    public List<Map<String, Object>> getProfesores() {
        List<Map<String, Object>> profesores = userRepository.findAll().stream()
                .filter(u -> u.getRole() == User.Role.TEACHER)
                .map(u -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("id", u.getId());
                    map.put("name", u.getName());
                    map.put("avatarUrl", "");
                    map.put("ejerciciosCount", activityRepository.findByTeacher(u).size());
                    return map;
                })
                .collect(Collectors.toList());

        profesores.sort(Comparator.comparing(m -> m.get("name").toString()));
        return profesores;
    }
}