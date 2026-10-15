package com.fitflow.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "sessions")
public class Session {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String sessionTitle;

    @Column(nullable = false)
    private String memberName;

    @Column(nullable = false)
    private String trainerName;

    @Column(nullable = false)
    private LocalDate sessionDate;

    @Column(nullable = false)
    private LocalTime sessionTime;

    private String sessionType;

    private String location;

    private String status;

    private String notes;

    public Session() {
    }

    public Session(
            String sessionTitle,
            String memberName,
            String trainerName,
            LocalDate sessionDate,
            LocalTime sessionTime,
            String sessionType,
            String location,
            String status,
            String notes
    ) {
        this.sessionTitle = sessionTitle;
        this.memberName = memberName;
        this.trainerName = trainerName;
        this.sessionDate = sessionDate;
        this.sessionTime = sessionTime;
        this.sessionType = sessionType;
        this.location = location;
        this.status = status;
        this.notes = notes;
    }

    public Long getId() {
        return id;
    }

    public String getSessionTitle() {
        return sessionTitle;
    }

    public void setSessionTitle(String sessionTitle) {
        this.sessionTitle = sessionTitle;
    }

    public String getMemberName() {
        return memberName;
    }

    public void setMemberName(String memberName) {
        this.memberName = memberName;
    }

    public String getTrainerName() {
        return trainerName;
    }

    public void setTrainerName(String trainerName) {
        this.trainerName = trainerName;
    }

    public LocalDate getSessionDate() {
        return sessionDate;
    }

    public void setSessionDate(LocalDate sessionDate) {
        this.sessionDate = sessionDate;
    }

    public LocalTime getSessionTime() {
        return sessionTime;
    }

    public void setSessionTime(LocalTime sessionTime) {
        this.sessionTime = sessionTime;
    }

    public String getSessionType() {
        return sessionType;
    }

    public void setSessionType(String sessionType) {
        this.sessionType = sessionType;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}