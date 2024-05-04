package server.demo.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import server.demo.models.Product;
import server.demo.models.ProductRepository;
import java.nio.file.Paths;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVRecord;

import java.io.Reader;
import java.io.FileReader;
import java.io.IOException;

@Component
public class LoadProductTableData implements CommandLineRunner {

    private final ProductRepository repository;

    @Autowired
    public LoadProductTableData(ProductRepository repository) {
        this.repository = repository;
    }

    @Override // Run then table is empty
    public void run(String... strings) throws Exception {
        if (repository.count() != 0) {
            return;
        }

        String csvFile = Paths.get(
                "backend",
                "src",
                "main",
                "resources",
                "static",
                "nike_shoes_sales.csv").toString();

        try (Reader in = new FileReader(csvFile)) {
            Iterable<CSVRecord> records = CSVFormat.DEFAULT
                    .withFirstRecordAsHeader().parse(in);
            for (CSVRecord record : records) {
                String[] data = new String[record.size()];
                for (int i = 0; i < record.size(); i++) {
                    data[i] = record.get(i);
                    System.err.println(data[i]);
                }

                Product product = new Product(data);

                repository.save(product);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
