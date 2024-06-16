package server.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import server.demo.models.ProductRatingRepository;
import server.demo.models.ProductRepository;
import server.demo.models.User;
import server.demo.models.Product;
import server.demo.models.ProductRating;

/**
 * RateServices
 */
@Service
public class RateServices {

    @Autowired
    private ProductRatingRepository productRatingRepository;

    @Autowired
    private ProductRepository productRepository;

    public void addNewRate(User user, Product product, double rate) {
        boolean exists = productRatingRepository
                .existsByUserIdAndProductId(user.getId(), product.getId());

        ProductRating pRating;
        if (!exists) {
            pRating = this.createProductRating(user, product, rate);

            Double rating = product.getRating();
            Integer reviews = product.getReviews();

            Double points = rating * reviews;
            points += rate;
            reviews += 1;

            product.setRating(points / reviews);
            product.setReviews(reviews);
            System.out.println("Added new rate");
        } else {
            pRating = productRatingRepository
                    .findByUserIdAndProductId(user.getId(), product.getId());

            Double oldRating = pRating.getUserRating();
            Double rating = product.getRating();
            Integer reviews = product.getReviews();

            Double points = rating * reviews;
            points -= oldRating;
            points += rate;

            product.setRating(points / reviews);
            pRating.setUserRating(rate);
            System.out.println("Change existing rate");
        }
        productRepository.save(product);
        productRatingRepository.save(pRating);
    }

    private ProductRating createProductRating(User user, Product product,
            double rate) {
        ProductRating productRating = new ProductRating();

        productRating.setUser(user);
        productRating.setProduct(product);
        productRating.setUserRating(rate);

        return productRating;
    }

    public static class RateDTO {
        private String productId;
        private double rate;

        public RateDTO() {
        }

        public String getProductId() {
            return productId;
        }

        public void setProductId(String productId) {
            this.productId = productId;
        }

        public double getRate() {
            return rate;
        }

        public void setRate(double rate) {
            this.rate = rate;
        }
    }

}