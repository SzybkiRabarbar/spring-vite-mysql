package server.demo.endpoints;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import server.demo.models.Product;
import server.demo.models.ProductRepository;

@CrossOrigin
@RestController
public class ProductController {

    private final ProductRepository repository;

    ProductController(ProductRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/")
    List<Product> readAll() {
        return repository.findAll();
    }

    @PostMapping("/products")
    List<Product> readProducts(@RequestBody ReadProductsSettings settings) {
        System.out.println("/products");
        Sort.Direction direction = (settings.desc ? Sort.Direction.DESC : Sort.Direction.ASC);
        Sort sort = Sort.by(direction, settings.sortBy);
        PageRequest pageRequest = PageRequest.of(
            settings.from, settings.to - settings.from, sort
        );
        Page<Product> productPage = repository.findAll(pageRequest);
        return productPage.getContent();
    }

    static class ReadProductsSettings {
        private int from;
        private int to;
        private String sortBy;
        private Boolean desc;

        public int getFrom() {
            return from;
        }
        public void setFrom(int from) {
            this.from = from;
        }
        public int getTo() {
            return to;
        }
        public void setTo(int to) {
            this.to = to;
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
