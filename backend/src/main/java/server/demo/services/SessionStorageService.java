// package server.demo.services;

// import org.springframework.stereotype.Service;

// import server.demo.models.User;
// import server.demo.models.UserSessionData;

// import java.util.concurrent.ConcurrentHashMap;
// import java.util.Map;

// @Service
// public class SessionStorageService {

//     private Map<String, UserSessionData> sessionDataMap = new ConcurrentHashMap<>();

//     public void addSessionData(String sessionId) {
//         sessionDataMap.put(sessionId, new UserSessionData());
//     }

//     public UserSessionData getSessionData(String sessionId) {
//         return sessionDataMap.get(sessionId);
//     }

//     public void removeSessionData(String sessionId) {
//         sessionDataMap.remove(sessionId);
//     }

//     public void appendUserToSessionData(String sessionId, User user) {
//         UserSessionData userSessionData = sessionDataMap.get(sessionId);
//         if (userSessionData != null) {
//             userSessionData.setUser(user);
//         };
        
//     }
// }

