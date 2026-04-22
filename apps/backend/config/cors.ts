import type { CorsOptions } from "cors";

function normalizeOrigin(origin: string): string {
    return origin.trim().replace(/\/+$/, "");
}

const defaultAllowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173"
];

const configuredOrigins = (process.env.FRONTEND_URL ?? "")
    .split(",")
    .map((origin) => normalizeOrigin(origin))
    .filter(Boolean);

const allowedOrigins = [...new Set([...defaultAllowedOrigins, ...configuredOrigins])];

// configure the type of requests that CORS will allow to be made to the backend
const corsOptions: CorsOptions = {
    // throw an error if the request does not come from the list of allowed origins
    origin: function(origin, callback) {
        const normalizedOrigin = origin ? normalizeOrigin(origin) : undefined;
        // invoke callback (eg. next middleware) if  origin matches or no origin
        // some services (like postman) do not include an origin in their request
        if(!normalizedOrigin || allowedOrigins.includes(normalizedOrigin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS restriction"), false);
        }
    },
    // Allow specific headers, methods, and inclusion of credentials
    allowedHeaders: ["Content-Type", "Authorization", "x-user-id"],
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
    credentials: true
};
 
export default corsOptions;