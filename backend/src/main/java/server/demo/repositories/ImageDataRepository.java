package server.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import server.demo.models.ImageData;

public interface ImageDataRepository
        extends JpaRepository<ImageData, Long> {

}