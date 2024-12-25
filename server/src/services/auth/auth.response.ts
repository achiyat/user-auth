// server/src/services/auth/auth.response.ts
interface IApiResponse<T = any> {
  status: {
    code: number;
    message: string;
  };
  message: string;
  data: T | null;
}

class AuthResponse {
  // Method to build the response
  async response<T = any>(
    code: number,
    message: string,
    data: T | null
  ): Promise<IApiResponse<T>> {
    // Set the status message based on the status code
    const statusMessage = code < 300 ? "Succeeded" : "Failed";
    code < 300 ? console.log(message) : console.error(message);

    const response: IApiResponse<T> = {
      status: {
        code,
        message: statusMessage,
      },
      message,
      data,
    };

    // If there's an error object passed as data, we handle it accordingly
    if (data instanceof Error) {
      response.status.message = "Failed";
      response.data = null;
      response.message = data.message;
    }

    return response;
  }
}

export default new AuthResponse();
