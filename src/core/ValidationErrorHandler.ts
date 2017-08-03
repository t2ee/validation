import ValidationError from './ValidationError';

interface ValidationErrorHandler {
    handle(error: ValidationError): any;
}

export default ValidationErrorHandler;
