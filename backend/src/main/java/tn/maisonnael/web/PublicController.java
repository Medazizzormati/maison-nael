package tn.maisonnael.web;

import java.util.List;
import org.springframework.web.bind.annotation.*;
import tn.maisonnael.repo.*;
import tn.maisonnael.web.Dtos.*;

@RestController
@RequestMapping("/api")
public class PublicController {
    private final CreationRepository creations;
    private final PhotoRepository photos;

    public PublicController(CreationRepository creations, PhotoRepository photos) {
        this.creations = creations;
        this.photos = photos;
    }

    @GetMapping("/creations")
    public List<CreationDto> creations() {
        return creations.findAllByOrderByPositionAsc().stream().map(CreationDto::of).toList();
    }

    @GetMapping("/photos")
    public List<PhotoDto> photos() {
        return photos.findAllByOrderByPositionAsc().stream().map(PhotoDto::of).toList();
    }
}
