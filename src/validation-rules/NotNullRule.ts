import {
    AutoWireMeta,
} from '@t2ee/core';
import Rule from '../core/Rule';
import ValidationRule from '../core/ValidationRule';

@ValidationRule('NotNull')
class NotNullRule implements Rule {
    validate(value: any, parameter: any, meta: AutoWireMeta, args: any[]): boolean {
        return value !== null && value !== undefined;
    }
}

export default NotNullRule;
