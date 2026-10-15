package com.fitflow.backend.repository;

import com.fitflow.backend.entity.Session;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface SessionRepository extends JpaRepository<Session, Long> {

    List<Session> findBySessionTitleContainingIgnoreCaseOrMemberNameContainingIgnoreCase(
            String sessionTitle,
            String memberName
    );

    List<Session> findBySessionDate(LocalDate sessionDate);
}