package com.fitflow.backend.controller;

import com.fitflow.backend.entity.Session;
import com.fitflow.backend.repository.SessionRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/sessions")
@CrossOrigin(origins = "http://localhost:5173")
public class SessionController {

    private final SessionRepository sessionRepository;

    public SessionController(SessionRepository sessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    // GET ALL SESSIONS
    @GetMapping
    public List<Session> getSessions() {
        return sessionRepository.findAll();
    }

    // GET SESSION BY ID
    @GetMapping("/{id}")
    public ResponseEntity<Session> getSession(@PathVariable Long id) {

        return sessionRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // SEARCH SESSIONS
    @GetMapping("/search")
    public List<Session> searchSessions(@RequestParam String q) {

        return sessionRepository
                .findBySessionTitleContainingIgnoreCaseOrMemberNameContainingIgnoreCase(
                        q,
                        q
                );
    }

    // GET SESSIONS BY DATE
    @GetMapping("/date/{date}")
    public List<Session> getSessionsByDate(
            @PathVariable String date
    ) {

        LocalDate sessionDate = LocalDate.parse(date);

        return sessionRepository.findBySessionDate(sessionDate);
    }

    // CREATE SESSION
    @PostMapping
    public Session createSession(
            @RequestBody Session session
    ) {

        return sessionRepository.save(session);
    }

    // UPDATE SESSION
    @PutMapping("/{id}")
    public ResponseEntity<Session> updateSession(
            @PathVariable Long id,
            @RequestBody Session updatedSession
    ) {

        return sessionRepository.findById(id)
                .map(session -> {

                    session.setSessionTitle(
                            updatedSession.getSessionTitle()
                    );

                    session.setMemberName(
                            updatedSession.getMemberName()
                    );

                    session.setTrainerName(
                            updatedSession.getTrainerName()
                    );

                    session.setSessionDate(
                            updatedSession.getSessionDate()
                    );

                    session.setSessionTime(
                            updatedSession.getSessionTime()
                    );

                    session.setSessionType(
                            updatedSession.getSessionType()
                    );

                    session.setLocation(
                            updatedSession.getLocation()
                    );

                    session.setStatus(
                            updatedSession.getStatus()
                    );

                    session.setNotes(
                            updatedSession.getNotes()
                    );

                    return ResponseEntity.ok(
                            sessionRepository.save(session)
                    );
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE SESSION
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSession(
            @PathVariable Long id
    ) {

        if (!sessionRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        sessionRepository.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}