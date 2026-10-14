package tn.maisonnael.model;

import jakarta.persistence.*;

@Entity
@Table(name = "photo")
public class Photo {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @Column(nullable = false, length = 300) private String src;
    @Column(nullable = false, length = 200) private String alt;
    @Column(nullable = false) private int position;

    public Long getId() { return id; }
    public String getSrc() { return src; }
    public void setSrc(String v) { this.src = v; }
    public String getAlt() { return alt; }
    public void setAlt(String v) { this.alt = v; }
    public int getPosition() { return position; }
    public void setPosition(int v) { this.position = v; }
}
