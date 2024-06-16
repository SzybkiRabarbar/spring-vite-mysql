import jwt from 'jsonwebtoken';

// Your JWT token (replace with your actual token)
const token = 'your_jwt_token_here';

try {
    // Decode the token (no verification)
    const decodedToken = jwt.decode(token);
    if (decodedToken && typeof decodedToken === 'object') {
        const userName = decodedToken.username; // Assuming the field is named 'username'
        console.log('User name:', userName);
    } else {
        console.error('Invalid token format.');
    }
} catch (error) {
    console.error('Error decoding token:', error.message);
}
