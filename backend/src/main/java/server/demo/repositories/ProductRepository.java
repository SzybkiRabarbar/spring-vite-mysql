package server.demo.repositories;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import server.demo.models.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findByProductId(String productId);

    Page<Product> findByProductNameContainingOrProductIdContainingOrBrandContainingOrDescriptionContaining(
            String productName,
            String productId,
            String brand,
            String description,
            Pageable pageable);

}
