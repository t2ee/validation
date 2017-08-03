import 'reflect-metadata';
import {
    Container,
    AutoWireMeta,
} from '@t2ee/core';
import test from 'ava';
import Valid from './Valid';
import ValidationProvider from './ValidationProvider';
import CustomValidator from './CustomValidator';

test('ValidationProvider', t => {
    class Message {}
    class T {
        @Valid a: Message
        b(@Valid a: Message) {}
    }
    const meta = Container.extractMeta(T);

    @CustomValidator
    class Validator {
        validate(value: any, meta: AutoWireMeta, args: any[]): any {
            return meta;
        }
    }
    const provider = Container.get(ValidationProvider);
    t.deepEqual(provider.resolve(null, meta.property['a'][0], []), {
        type: Symbol.for('t2ee:validation:valid'),
        declaredType: Message,
        data: undefined,
    });
    t.deepEqual(provider.resolve(null, meta.parameter['b'][0][0], []), {
        type: Symbol.for('t2ee:validation:valid'),
        declaredType: Message,
        data: undefined,
    });
});
