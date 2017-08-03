import 'reflect-metadata';
import {
    Container,
} from '@t2ee/core';
import test from 'ava';
import Valid from './Valid';

test('@Valid', t => {
    class Message {}
    class T {
        @Valid a: Message
        b(@Valid a: Message) {}
    }
    const meta = Container.extractMeta(T);
    t.deepEqual(meta, {
        argument: {},
        parameter: {
            b: {
                0: [{
                    type: Symbol.for('t2ee:validation:valid'),
                    declaredType: Message,
                    data: undefined,
                }]
            }
        },
        property: {
            a: [{
                type: Symbol.for('t2ee:validation:valid'),
                declaredType: Message,
                data: undefined,
            }]
        }
    });
})
