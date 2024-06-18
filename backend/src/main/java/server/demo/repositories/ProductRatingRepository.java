package server.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import server.demo.models.ProductRating;

public interface ProductRatingRepository
        extends JpaRepository<ProductRating, Long> {

    boolean existsByUserIdAndProductId(Long userId, Long productId);
    ProductRating findByUserIdAndProductId(Long userId, Long productId);
}
