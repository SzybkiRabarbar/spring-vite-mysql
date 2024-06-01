package server.demo.models;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findByProductId(String productId);

    Page<Product> findByProductNameContainingOrProductIdContainingOrBrandContainingOrDescriptionContaining(
            String productName,
            String productId,
            String brand,
            String description,
            Pageable pageable);

}
