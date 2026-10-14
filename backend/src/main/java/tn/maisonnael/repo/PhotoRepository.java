package tn.maisonnael.repo;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import tn.maisonnael.model.Photo;

public interface PhotoRepository extends JpaRepository<Photo, Long> {
    List<Photo> findAllByOrderByPositionAsc();
}
