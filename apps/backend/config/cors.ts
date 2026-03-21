import { CorsOptions } from "cors";
 
// Configure the type of requests that CORS will allow to be made to the backend
const corsOptions: CorsOptions = {
    // Throw an error if the request does not come from the list of allowed origins
    origin: function (origin, callback) {
        const allowedOrigins = [process.env.FRONTEND_URL];
        // Invoke callback if origin matches or no origin
        // Some services (like Postman) do not include an origin in their request
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS restriction"), false);
        }
    },
    // Allow specific headers, methods, and inclusion of credentials
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
    credentials: true
};
 
export default corsOptions;