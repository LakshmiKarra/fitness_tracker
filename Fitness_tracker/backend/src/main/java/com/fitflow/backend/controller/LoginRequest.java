package com.fitflow.backend.controller;

public record LoginRequest(
        String email,
        String password
) {
}