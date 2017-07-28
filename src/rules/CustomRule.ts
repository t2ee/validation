import {
    AutoWired,
} from '@t2ee/core';

export default function CustomRule(name: string, error: string, parameter?: any): (target: any, key: string) => any {
    return AutoWired(Symbol.for('t2ee:validation:rule'), { name, parameter, error });
}

