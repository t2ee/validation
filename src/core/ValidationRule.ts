import {
    Container,
    Component,
    SingletonScope,
} from '@t2ee/core';

export default function ValidationRule(name: string): (target: any) => any {
    return (target: any): any => {
        Container.provide(Symbol.for(`t2ee:validation:rule:${name}`), target);
        Component({scope: new SingletonScope()})(target);
    };
}

