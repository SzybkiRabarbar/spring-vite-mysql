// package server.demo.endpoints;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.messaging.handler.annotation.MessageMapping;
// import org.springframework.messaging.handler.annotation.Payload;
// import org.springframework.messaging.handler.annotation.SendTo;
// import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
// import org.springframework.stereotype.Controller;

// import server.demo.models.ImageData;
// import server.demo.models.UserSessionData;
// import server.demo.services.ImageDataService;
// import server.demo.services.SessionStorageService;

// @Controller
// public class WebSocketController {

//     @Autowired
//     private SimpMessageHeaderAccessor simpMessageHeaderAccessor;

//     @Autowired
//     private SessionStorageService wsSessionStorageService;

//     @Autowired
//     private ImageDataService imageDataService;

//     @MessageMapping("/fetch")
//     @SendTo("/recieve")
//     public String processMessageFromClient(@Payload String msg)
//             throws Exception {
//         String sessionId = simpMessageHeaderAccessor.getSessionId();
//         UserSessionData userSessionData = wsSessionStorageService
//                 .getSessionData(sessionId);

//         ImageData imageData = imageDataService.getImageDataWithNBiggestId(userSessionData.incrementAndGet());

//         return imageData.getFileName();
//     }
// }
