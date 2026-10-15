package com.fitflow.backend.controller;

import com.fitflow.backend.entity.Trainer;
import com.fitflow.backend.repository.TrainerRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trainers")
@CrossOrigin(origins = "http://localhost:5173")
public class TrainerController {

    private final TrainerRepository trainerRepository;

    public TrainerController(TrainerRepository trainerRepository) {
        this.trainerRepository = trainerRepository;
    }

    @GetMapping
    public List<Trainer> getTrainers() {
        return trainerRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Trainer> getTrainer(@PathVariable Long id) {

        return trainerRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public List<Trainer> searchTrainers(@RequestParam String q) {

        return trainerRepository
                .findByFullNameContainingIgnoreCaseOrEmailContainingIgnoreCase(q, q);
    }

    @PostMapping
    public Trainer createTrainer(@RequestBody Trainer trainer) {

        return trainerRepository.save(trainer);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Trainer> updateTrainer(
            @PathVariable Long id,
            @RequestBody Trainer updatedTrainer
    ) {

        return trainerRepository.findById(id)
                .map(trainer -> {

                    trainer.setFullName(updatedTrainer.getFullName());
                    trainer.setEmail(updatedTrainer.getEmail());
                    trainer.setPhone(updatedTrainer.getPhone());
                    trainer.setSpecialization(updatedTrainer.getSpecialization());
                    trainer.setExperience(updatedTrainer.getExperience());
                    trainer.setStatus(updatedTrainer.getStatus());
                    trainer.setJoiningDate(updatedTrainer.getJoiningDate());
                    trainer.setCertification(updatedTrainer.getCertification());

                    return ResponseEntity.ok(
                            trainerRepository.save(trainer)
                    );
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrainer(@PathVariable Long id) {

        if (!trainerRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        trainerRepository.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}