package tn.maisonnael.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "contact_message")
public class ContactMessage {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @Column(nullable = false, length = 100) private String name;
    @Column(nullable = false, length = 150) private String email;
    @Column(nullable = false, length = 2000) private String message;
    @Column(name = "created_at", nullable = false) private Instant createdAt = Instant.now();
    @Column(name = "is_read", nullable = false) private boolean read;

    public Long getId() { return id; }
    public String getName() { return name; }
    public void setName(String v) { this.name = v; }
    public String getEmail() { return email; }
    public void setEmail(String v) { this.email = v; }
    public String getMessage() { return message; }
    public void setMessage(String v) { this.message = v; }
    public Instant getCreatedAt() { return createdAt; }
    public boolean isRead() { return read; }
    public void setRead(boolean v) { this.read = v; }
}
