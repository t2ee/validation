import {
    AutoWireMeta,
} from '@t2ee/core';
import Rule from '../core/Rule';
import ValidationRule from '../core/ValidationRule';

@ValidationRule('Pattern')
class PatternRule implements Rule {
    validate(value: any, parameter: any, meta: AutoWireMeta, args: any[]): boolean {
        const type = meta.declaredType;
        if (type === String) {
            return (parameter.value as RegExp).test(value);
        }
        return true;
    }
}

export default PatternRule;
