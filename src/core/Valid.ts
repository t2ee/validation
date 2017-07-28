import {
    AutoWired,
} from '@t2ee/core';

export default function Valid(target: any, key: string, index?: number) {
    return AutoWired(Symbol.for('t2ee:validation:valid'))(target, key, index);
}

