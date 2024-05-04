package server.demo.endpoints;

import java.util.Collections;
import java.util.List;

import javax.management.relation.RelationNotFoundException;

import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;

import server.demo.models.Product;
import server.demo.models.ProductRepository;

@CrossOrigin
@RestController
@RequestMapping("/api/v1")
public class ProductController {

    private final ProductRepository repository;

    ProductController(ProductRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/")
    List<Product> readAll() {
        return repository.findAll();
    }

    @GetMapping("/page-max-num")
    long readPageMaxSize() {
        return repository.count();
    }

    @GetMapping("/product/{productId}")
    ResponseEntity<Product> readProduct(
            @PathVariable(value = "productId") String productId)
            throws RelationNotFoundException {
        Product product = repository.findByProductId(productId)
                .orElseThrow(
                        () -> new RelationNotFoundException(
                                "Not found" + productId));
        return ResponseEntity.ok().body(product);
    }

    @PostMapping("/products")
    List<Product> readProducts(@RequestBody ReadProductsSettings settings) {
        System.out.println("---");
        System.out.println(settings.pageNum);
        System.out.println(settings.pageSize);
        System.out.println(settings.sortBy);
        System.out.println(settings.desc);
        System.out.println("-");
        if ("random".equals(settings.sortBy)) {
            List<Product> allProducts = repository.findAll();
            Collections.shuffle(allProducts);
            int start = settings.pageNum * settings.pageSize;
            return allProducts.subList(start,
                    Math.min(start + settings.pageSize, allProducts.size()));
        } else {
            Sort.Direction direction = (settings.desc ? Sort.Direction.DESC
                    : Sort.Direction.ASC);
            Sort sort = Sort.by(direction, settings.sortBy);
            PageRequest pageRequest = PageRequest.of(
                    settings.pageNum, settings.pageSize, sort);
            Page<Product> productPage = repository.findAll(pageRequest);
            return productPage.getContent();
        }
    }

    static class ReadProductsSettings {
        private int pageNum;
        private int pageSize;
        private String sortBy;
        private Boolean desc;

        public int getPageNum() {
            return pageNum;
        }

        public void setPageNum(int pageNum) {
            this.pageNum = pageNum;
        }

        public int getPageSize() {
            return pageSize;
        }

        public void setPageSize(int pageSize) {
            this.pageSize = pageSize;
        }

        public String getSortBy() {
            return sortBy;
        }

        public void setSortBy(String sortBy) {
            this.sortBy = sortBy;
        }

        public Boolean getDesc() {
            return desc;
        }

        public void setDesc(Boolean desc) {
            this.desc = desc;
        }
    }

}
