package server.demo.models;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRatingRepository
        extends JpaRepository<ProductRating, Long> {

    boolean existsByUserIdAndProductId(Long userId, Long productId);
    ProductRating findByUserIdAndProductId(Long userId, Long productId);
}
