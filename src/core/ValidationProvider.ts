import {
    AutoWired,
    Provider,
    AutoWireMeta,
    Component,
    Metadata,
    Container,
} from '@t2ee/core';

import Validator from './Validator';
import ValidationErrorHandler from './ValidationErrorHandler';

@Component
class ValidationProvider implements Provider {

    @AutoWired
    private validator: Validator;

    @AutoWired('validationErrorHandler')
    private validationErrorHandler: ValidationErrorHandler;

    public resolve<T>(value: T, meta: AutoWireMeta, args: any[]): T {
        try {
            let result = this.validator.validate(value, meta, args);
            return result;
        } catch (e) {
            if (this.validationErrorHandler) {
                return this.validationErrorHandler.handle(e);
            } else {
                throw e;
            }
        }
    }
}

export default ValidationProvider;
