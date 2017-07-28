import {
    AutoWireMeta,
} from '@t2ee/core';

interface Rule {
    validate(value: any, parameter: any, meta: AutoWireMeta, args: any[]): boolean;
}

export default Rule;
