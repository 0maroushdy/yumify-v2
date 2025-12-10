import jwt from 'jsonwebtoken';


export const generateToken = (res, user) => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "12h" });
  
  // Cookie settings for cross-origin requests (production)
  // In production (HTTPS), use sameSite: "none" and secure: true
  // In development (HTTP), use sameSite: "lax" or "strict"
  const cookieOptions = {
    httpOnly: true,
    maxAge: 12 * 60 * 60 * 1000, // 12 hours
    path: "/", // Ensure cookie is available for all paths
  };
  
  if (process.env.NODE_ENV === "production") {
    // Production: HTTPS required, allow cross-origin cookies
    cookieOptions.secure = true;
    cookieOptions.sameSite = "none";
  } else {
    // Development: HTTP, use strict sameSite
    cookieOptions.secure = false;
    cookieOptions.sameSite = "lax";
  }
  
  console.log('Setting cookie with options:', {
    httpOnly: cookieOptions.httpOnly,
    secure: cookieOptions.secure,
    sameSite: cookieOptions.sameSite,
    path: cookieOptions.path,
    maxAge: cookieOptions.maxAge,
    NODE_ENV: process.env.NODE_ENV
  });
  
  res.cookie("token", token, cookieOptions);
  
  console.log('Cookie set successfully for user:', user.email);

  return token;
};

export default generateToken;