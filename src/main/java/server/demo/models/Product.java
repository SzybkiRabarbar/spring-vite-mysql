package server.demo.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Long id;

    @Column
    private String productName;

    @Column
    private String productId;

    @Column
    private Integer listingPrice;

    @Column
    private Integer salePrice;

    @Column
    private Integer discount;

    @Column
    private String brand;

    @Column
    private String description;

    @Column
    private Double rating;

    @Column
    private Integer reviews;

    @Column
    private String images;

    // getters and setters
}
