package tn.maisonnael.web;

import jakarta.validation.constraints.*;
import java.time.Instant;
import tn.maisonnael.model.*;

public final class Dtos {
    private Dtos() {}

    // Only local assets or https URLs: blocks javascript: and data: URLs.
    static final String IMG = "^(/assets/[A-Za-z0-9._/-]+|https://[A-Za-z0-9._~:/?#%=&+-]+)$";

    public record CreationDto(Long id, String title, String text, String img, String alt) {
        static CreationDto of(Creation c) { return new CreationDto(c.getId(), c.getTitle(), c.getDescription(), c.getImg(), c.getAlt()); }
    }
    public record PhotoDto(Long id, String src, String alt) {
        static PhotoDto of(Photo p) { return new PhotoDto(p.getId(), p.getSrc(), p.getAlt()); }
    }
    public record MessageDto(Long id, String name, String email, String message, Instant createdAt, boolean read) {
        static MessageDto of(ContactMessage m) { return new MessageDto(m.getId(), m.getName(), m.getEmail(), m.getMessage(), m.getCreatedAt(), m.isRead()); }
    }
    public record CreationRequest(
        @NotBlank @Size(max = 120) String title,
        @NotBlank @Size(max = 500) String text,
        @NotBlank @Size(max = 300) @Pattern(regexp = IMG) String img,
        @NotBlank @Size(max = 200) String alt,
        @PositiveOrZero int position) {}
    public record PhotoRequest(
        @NotBlank @Size(max = 300) @Pattern(regexp = IMG) String src,
        @NotBlank @Size(max = 200) String alt,
        @PositiveOrZero int position) {}
    public record ContactRequest(
        @NotBlank @Size(min = 2, max = 100) String name,
        @NotBlank @Email @Size(max = 150) String email,
        @NotBlank @Size(min = 10, max = 2000) String message,
        @Size(max = 200) String website) {}   // honeypot: real visitors leave it empty
}
