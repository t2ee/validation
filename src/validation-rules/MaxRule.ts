import {
    AutoWireMeta,
} from '@t2ee/core';
import Rule from '../core/Rule';
import ValidationRule from '../core/ValidationRule';

@ValidationRule('Max')
class MaxRule implements Rule {
    validate(value: any, parameter: any, meta: AutoWireMeta, args: any[]): boolean {
        const type = meta.declaredType;
        if (parameter.value === null || parameter.value === undefined) {
            return true;
        }
        if (type === String || type === Array) {
            return value.length <= parameter.value;
        } else if (type === Number) {
            return value <= parameter.value;
        } else if (type === Object) {
            return Object.keys(value).length <= parameter.value;
        }
        return true;
    }
}

export default MaxRule;
