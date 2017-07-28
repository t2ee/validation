import {
    AutoWired,
    Container,
    Component,
    AutoWireMeta,
} from '@t2ee/core';
import ValidationError from './ValidationError';
import Rule from './Rule';

function checkPrimitiveType(value: any, type: Function): boolean {
    if (value === null || value === undefined) {
        return true;
    }
    switch (type) {
        case String:
            return (typeof value === 'string');
        case Number:
            return (typeof value === 'number');
        case Boolean:
            return (typeof value === 'boolean');
        case Array:
            return Array.isArray(value);
        case Object:
            return (typeof value === 'object');
    }
    return false;
}

@Component
export default class Validator {
    validate(value: any, meta: AutoWireMeta, args: any[]): any {
        const target = meta.declaredType;
        const component = Container.extractMeta(meta.declaredType);

        const instance = Container.get(meta.declaredType) || new meta.declaredType();
        for (const key in component.property) {
            const property = component.property[key];
            const metas = property.filter(meta => meta.type === Symbol.for('t2ee:validation:rule'));

            if (metas.length) {
                if (!checkPrimitiveType(value[key], metas[0].declaredType)) {
                    throw new ValidationError('Valid', value, key, typeof value[key], `shuold be ${metas[0].declaredType.name}`);
                }
            }

            for (const meta of metas) {
                const data = meta.data;
                const rule: Rule = Container.get(Symbol.for(`t2ee:validation:rule:${data.name}`));
                if (rule && !rule.validate(value[key], data.parameter, meta, args)) {
                    throw new ValidationError(data.name, value, key, value[key], data.error);
                }
            }

            instance[key] = value[key];
        }

        return instance;
    }
}

