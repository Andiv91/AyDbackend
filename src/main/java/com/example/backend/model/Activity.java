package com.example.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "activities")
public class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(length = 2000)
    private String description;

    @Column(nullable = false)
    private String difficulty;

    @Column(length = 2000)
    private String expectedOutput;

    @ManyToOne
    @JoinColumn(name = "teacher_id")
    private User teacher;

    // Constructors
    public Activity() {}

    public Activity(String title, String description, String difficulty, String expectedOutput, User teacher) {
        this.title = title;
        this.description = description;
        this.difficulty = difficulty;
        this.expectedOutput = expectedOutput;
        this.teacher = teacher;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }

    public String getExpectedOutput() { return expectedOutput; }
    public void setExpectedOutput(String expectedOutput) { this.expectedOutput = expectedOutput; }

    public User getTeacher() { return teacher; }
    public void setTeacher(User teacher) { this.teacher = teacher; }
}