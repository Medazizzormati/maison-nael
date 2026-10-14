package tn.maisonnael.web;

import jakarta.validation.Valid;
import java.util.List;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import tn.maisonnael.model.*;
import tn.maisonnael.repo.*;
import tn.maisonnael.web.Dtos.*;

/** Admin API, HTTP Basic + role ADMIN. All mutating endpoints require a JSON body (CORS preflight protects them from cross-site requests). */
@RestController
@RequestMapping("/api/admin")
public class AdminController {
    private final ContactMessageRepository messages;
    private final CreationRepository creations;
    private final PhotoRepository photos;

    public AdminController(ContactMessageRepository m, CreationRepository c, PhotoRepository p) {
        this.messages = m; this.creations = c; this.photos = p;
    }

    private static ResponseStatusException notFound() { return new ResponseStatusException(HttpStatus.NOT_FOUND); }

    // ---- messages ----
    @GetMapping("/messages")
    public List<MessageDto> listMessages(@RequestParam(defaultValue = "0") int page) {
        return messages.findAllByOrderByCreatedAtDesc(PageRequest.of(Math.max(page, 0), 50)).stream().map(MessageDto::of).toList();
    }

    @PatchMapping("/messages/{id}/read")
    public MessageDto markRead(@PathVariable Long id) {
        ContactMessage m = messages.findById(id).orElseThrow(AdminController::notFound);
        m.setRead(true);
        return MessageDto.of(messages.save(m));
    }

    @DeleteMapping("/messages/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteMessage(@PathVariable Long id) {
        if (!messages.existsById(id)) throw notFound();
        messages.deleteById(id);
    }

    // ---- creations ----
    @PostMapping(value = "/creations", consumes = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public CreationDto createCreation(@Valid @RequestBody CreationRequest r) {
        return CreationDto.of(creations.save(apply(new Creation(), r)));
    }

    @PutMapping(value = "/creations/{id}", consumes = "application/json")
    public CreationDto updateCreation(@PathVariable Long id, @Valid @RequestBody CreationRequest r) {
        Creation c = creations.findById(id).orElseThrow(AdminController::notFound);
        return CreationDto.of(creations.save(apply(c, r)));
    }

    @DeleteMapping("/creations/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCreation(@PathVariable Long id) {
        if (!creations.existsById(id)) throw notFound();
        creations.deleteById(id);
    }

    private static Creation apply(Creation c, CreationRequest r) {
        c.setTitle(r.title().trim()); c.setDescription(r.text().trim());
        c.setImg(r.img()); c.setAlt(r.alt().trim()); c.setPosition(r.position());
        return c;
    }

    // ---- photos ----
    @PostMapping(value = "/photos", consumes = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public PhotoDto createPhoto(@Valid @RequestBody PhotoRequest r) {
        return PhotoDto.of(photos.save(apply(new Photo(), r)));
    }

    @PutMapping(value = "/photos/{id}", consumes = "application/json")
    public PhotoDto updatePhoto(@PathVariable Long id, @Valid @RequestBody PhotoRequest r) {
        Photo p = photos.findById(id).orElseThrow(AdminController::notFound);
        return PhotoDto.of(photos.save(apply(p, r)));
    }

    @DeleteMapping("/photos/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePhoto(@PathVariable Long id) {
        if (!photos.existsById(id)) throw notFound();
        photos.deleteById(id);
    }

    private static Photo apply(Photo p, PhotoRequest r) {
        p.setSrc(r.src()); p.setAlt(r.alt().trim()); p.setPosition(r.position());
        return p;
    }
}
