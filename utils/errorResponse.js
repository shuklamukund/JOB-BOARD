class ErrorResponse extends Error {
    constructor(message, codeStatus) {
      super(message);
  
      this.codeStatus = codeStatus;
  
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
export default ErrorResponse;