package server.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import server.demo.models.ImageData;

public interface ImageDataRepository
        extends JpaRepository<ImageData, Long> {

    // TODO add proper handler to offset bigger than table
    @Query("SELECT i FROM ImageData i ORDER BY id DESC LIMIT 1 OFFSET :pos")
    ImageData getImageDataWithNBiggestId(@Param("pos") int position);
}