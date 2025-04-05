import rateLimit from "express-rate-limit";

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 mins
    max: 50, // limit each IP to 100 requests
    message: "Too many requests from this IP, please try again later",
});
  
export default apiLimiter
