import jwt from 'jsonwebtoken';

export const verifyToken = (token) => {
    const secret = process.env.JWT_SECRET;
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        return null;
    }
};

export default verifyToken;