import 'source-map-support/register';
import 'reflect-metadata';

import ValidationProvider from './core/ValidationProvider';
import Validator from './core/Validator';
import CustomValidator from './core/CustomValidator';
import ValidationRule from './core/ValidationRule';
import Rule from './core/Rule';
import ValidationError from './core/ValidationError';
import Valid from './core/Valid';

import CustomRule from './rules/CustomRule';
import NotNull from './rules/NotNull';
import Min from './rules/Min';
import Max from './rules/Max';
import Length from './rules/Length';
import Pattern from './rules/Pattern';

import PatternRule from './validation-rules/PatternRule';
import MaxRule from './validation-rules/PatternRule';
import MinRule from './validation-rules/PatternRule';
import LengthRule from './validation-rules/PatternRule';
import NotNullRule from './validation-rules/PatternRule';

import {
    Container,
    Component,
    AutoWired,
} from '@t2ee/core';


const validationProvider = Container.get(ValidationProvider);
Container.inject(Symbol.for('t2ee:validation:valid'), validationProvider);
Container.inject(Symbol.for('t2ee:validation:rule'), validationProvider);

export {
    ValidationProvider,
    Validator,
    CustomValidator,
    ValidationRule,
    Rule,
    ValidationError,
    Valid,

    CustomRule,
    NotNull,
    Min,
    Max,
    Length,
    Pattern,

    LengthRule,
    MaxRule,
    MinRule,
    NotNullRule,
    PatternRule,
};
