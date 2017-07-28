import {
    AutoWired,
    Provider,
    AutoWireMeta,
    Component,
    Metadata,
    Container,
} from '@t2ee/core';

import Validator from './Validator';



@Component
class ValidationProvider implements Provider {

    @AutoWired
    private validator: Validator;

    public resolve<T>(value: T, meta: AutoWireMeta, args: any[]): T {
        return this.validator.validate(value, meta, args);
    }
}

export default ValidationProvider;
