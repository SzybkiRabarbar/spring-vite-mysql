package server.demo.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column
    private String productName;

    @Column(unique = true)
    private String productId;

    @Column
    private Integer listingPrice;

    @Column
    private Integer salePrice;

    @Column
    private Integer discount;

    @Column
    private String brand;

    @Column(columnDefinition = "LONGTEXT")
    private String description;

    @Column
    private Double rating;

    @Column
    private Integer reviews;

    @Column(columnDefinition = "LONGTEXT")
    private String images;

    public Product() {
        // JpaSystem requires default constructor
    }

    public Product(String productName, String productId, Integer listingPrice,
            Integer salePrice, Integer discount, String brand,
            String description, Double rating, Integer reviews,
            String images) {
        this.productName = productName;
        this.productId = productId;
        this.listingPrice = listingPrice;
        this.salePrice = salePrice;
        this.discount = discount;
        this.brand = brand;
        this.description = description;
        this.rating = rating;
        this.reviews = reviews;
        this.images = images;
    }

    public Product(String[] data) {
        this.productName = data[0];
        this.productId = data[1];
        this.listingPrice = Integer.parseInt(data[2]);
        this.salePrice = Integer.parseInt(data[3]);
        this.discount = Integer.parseInt(data[4]);
        this.brand = data[5];
        this.description = data[6];
        this.rating = Double.parseDouble(data[7]);
        this.reviews = Integer.parseInt(data[8]);
        this.images = data[9];
    }

    // * GETTERS * SETTERS *
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public Integer getListingPrice() {
        return listingPrice;
    }

    public void setListingPrice(Integer listingPrice) {
        this.listingPrice = listingPrice;
    }

    public Integer getSalePrice() {
        return salePrice;
    }

    public void setSalePrice(Integer salePrice) {
        this.salePrice = salePrice;
    }

    public Integer getDiscount() {
        return discount;
    }

    public void setDiscount(Integer discount) {
        this.discount = discount;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public Integer getReviews() {
        return reviews;
    }

    public void setReviews(Integer reviews) {
        this.reviews = reviews;
    }

    public String getImages() {
        return images;
    }

    public void setImages(String images) {
        this.images = images;
    }
}
