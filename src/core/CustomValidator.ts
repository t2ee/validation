import {
    Container,
    Component,
} from '@t2ee/core';
import Validator from './Validator';

export default function CustomValidator(target: any) {
    Component(target);
    Container.provide(Validator, target);
}

