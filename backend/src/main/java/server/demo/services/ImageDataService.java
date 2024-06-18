package server.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import server.demo.models.ImageData;
import server.demo.models.User;
import server.demo.repositories.ImageDataRepository;

@Service
public class ImageDataService {

    @Autowired
    private ImageDataRepository imageDataRepository;

    public void createImageData(User user, String fileName) {
        ImageData newImageData = new ImageData();
        newImageData.setFileName(fileName);
        newImageData.setUser(user);
        imageDataRepository.save(newImageData);
    }

}