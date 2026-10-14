package tn.maisonnael.repo;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import tn.maisonnael.model.Creation;

public interface CreationRepository extends JpaRepository<Creation, Long> {
    List<Creation> findAllByOrderByPositionAsc();
}
