package tn.maisonnael.model;

import jakarta.persistence.*;

@Entity
@Table(name = "creation")
public class Creation {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @Column(nullable = false, length = 120) private String title;
    @Column(name = "description", nullable = false, length = 500) private String description;
    @Column(nullable = false, length = 300) private String img;
    @Column(nullable = false, length = 200) private String alt;
    @Column(nullable = false) private int position;

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public void setTitle(String v) { this.title = v; }
    public String getDescription() { return description; }
    public void setDescription(String v) { this.description = v; }
    public String getImg() { return img; }
    public void setImg(String v) { this.img = v; }
    public String getAlt() { return alt; }
    public void setAlt(String v) { this.alt = v; }
    public int getPosition() { return position; }
    public void setPosition(int v) { this.position = v; }
}
