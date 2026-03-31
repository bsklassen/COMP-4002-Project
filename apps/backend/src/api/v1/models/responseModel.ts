export interface ApiResponse<T> {
    status: string; // "success" or "error"
    data?: T; // optional data returned in case of success
    message?: string; // information about result
    error?: string; // optional error message
<<<<<<< HEAD
    code?: string; // optional error code
}
 
// Helper functions to easily manufacture different response options
=======
    code?: string // optional error code
};

// helper functions to easily manufacture different response options
>>>>>>> origin/develop
export const successResponse = <T>(
    data?: T,
    message?: string
): ApiResponse<T> => ({
    status: "success",
    data,
    message
});
<<<<<<< HEAD
 
=======

>>>>>>> origin/develop
export const errorResponse = (
    message: string,
    code?: string
): ApiResponse<null> => ({
    status: "error",
    message,
    code
});