package com.fitflow.backend.controller;

import com.fitflow.backend.entity.Member;
import com.fitflow.backend.repository.MemberRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/members")
@CrossOrigin(origins = "http://localhost:5173")
public class MemberController {

    private final MemberRepository memberRepository;

    public MemberController(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @GetMapping
    public List<Member> getMembers() {
        return memberRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Member> getMember(@PathVariable Long id) {

        return memberRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public List<Member> searchMembers(@RequestParam String q) {

        return memberRepository
                .findByFullNameContainingIgnoreCaseOrEmailContainingIgnoreCase(q, q);
    }

    @PostMapping
    public Member createMember(@RequestBody Member member) {

        return memberRepository.save(member);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Member> updateMember(
            @PathVariable Long id,
            @RequestBody Member updatedMember
    ) {

        return memberRepository.findById(id)
                .map(member -> {

                    member.setFullName(updatedMember.getFullName());
                    member.setEmail(updatedMember.getEmail());
                    member.setPhone(updatedMember.getPhone());
                    member.setMembershipPlan(updatedMember.getMembershipPlan());
                    member.setTrainer(updatedMember.getTrainer());
                    member.setStatus(updatedMember.getStatus());
                    member.setJoinDate(updatedMember.getJoinDate());
                    member.setRenewalDate(updatedMember.getRenewalDate());
                    member.setGoal(updatedMember.getGoal());

                    return ResponseEntity.ok(memberRepository.save(member));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMember(@PathVariable Long id) {

        if (!memberRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        memberRepository.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}