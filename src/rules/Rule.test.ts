import 'reflect-metadata';
import test from 'ava';
import {
    Container,
    Component,
    Configuration,
    Bean,
} from '@t2ee/core';
import {
    Valid ,
    Min,
    Max,
    NotNull,
    Pattern,
    Length,
    ValidationErrorHandler,
    ValidationError,
} from '../';

class Message {
    @Min(2)
    @Max(4)
    name: string;

    @Length(4)
    job: string;

    @Min(0)
    @Max(20)
    age: number;

    @NotNull
    nullable?: string;

    @Pattern(/(male)|(female)/)
    gender: string;

    @Min(1)
    @Max(3)
    array?: string[]
}

let currentError = null;

@Configuration
class Config {
    @Bean('validationErrorHandler')
    handler(): ValidationErrorHandler {
        return {
            handle(e: ValidationError): any {
                currentError = e;
                throw e;
            },
        };
    }
}

@Component
class Test {
    test(@Valid message: Message): Message {
        return message;
    }
}
const obj = Container.get(Test);

test('All Pass Test', t => {
    const m = new Message();
    m.name = 'abc';
    m.job = 'abcd';
    m.age = 10;
    m.gender = 'male';
    m.nullable = 'test';
    m.array = [''];
    t.deepEqual(obj.test(m), m);
});

test('Fail @Min for string', t => {
    const m = {
        name: 'a',
        job: 'abcd',
        age: 10,
        gender: 'male',
        nullable: 'test',
    }
    let error = null;
    try {
        obj.test(m);
    } catch (e) {
        error = e;
    }
    t.is(error.key, 'name');
    t.is(error.error, 'should be longer than 2');
    t.is(error.value, 'a');
});

test('Fail @Max for string', t => {
    const m = {
        name: 'abcd4',
        job: 'abcd',
        age: 10,
        gender: 'male',
        nullable: 'test',
    }
    let error = null;
    try {
        obj.test(m);
    } catch (e) {
        error = e;
    }
    t.is(error.key, 'name');
    t.is(error.error, 'should be shorter than 4');
    t.is(error.value, 'abcd4');
});

test('Fail @Min for number', t => {
    const m = {
        name: 'abcd',
        job: 'abcd',
        age: -10,
        gender: 'male',
        nullable: 'test',
    }
    let error = null;
    try {
        obj.test(m);
    } catch (e) {
        error = e;
    }
    t.is(error.key, 'age');
    t.is(error.error, 'should be longer than 0');
    t.is(error.value, -10);
});

test('Fail @Min for number', t => {
    const m = {
        name: 'abcd',
        job: 'abcd',
        age: -10,
        gender: 'male',
        nullable: 'test',
    }
    let error = null;
    try {
        obj.test(m);
    } catch (e) {
        error = e;
    }
    t.is(error.key, 'age');
    t.is(error.error, 'should be longer than 0');
    t.is(error.value, -10);
});

test('Fail @Min for array', t => {
    const m = {
        name: 'abcd',
        job: 'abcd',
        age: 10,
        gender: 'male',
        nullable: 'test',
        array: [],
    }
    let error = null;
    try {
        obj.test(m);
    } catch (e) {
        error = e;
    }
    t.is(error.key, 'array');
    t.is(error.error, 'should be longer than 1');
    t.deepEqual(error.value, []);
});

test('Fail @Max for array', t => {
    const m = {
        name: 'abcd',
        job: 'abcd',
        age: 10,
        gender: 'male',
        nullable: 'test',
        array: ['1', '2', '3', '4'],
    }
    let error = null;
    try {
        obj.test(m);
    } catch (e) {
        error = e;
    }
    t.is(error.key, 'array');
    t.is(error.error, 'should be shorter than 3');
    t.deepEqual(error.value, ['1', '2', '3', '4']);
});

test('Fail @NotNull', t => {
    const m = {
        name: 'abcd',
        job: 'abcd',
        gender: 'male',
        age: 20,
    }
    let error = null;
    try {
        obj.test(m);
    } catch (e) {
        error = e;
    }
    t.is(error.key, 'nullable');
    t.is(error.error, 'should not be null');
    t.is(error.value, undefined);
});

test('Fail @Pattern', t => {
    const m = {
        name: 'abcd',
        job: 'abcd',
        age: 10,
        gender: 'aaale',
        nullable: 'test',
    }
    let error = null;
    try {
        obj.test(m);
    } catch (e) {
        error = e;
    }
    t.is(error.key, 'gender');
    t.is(error.error, 'should has a pattern of /(male)|(female)/');
    t.is(error.value, 'aaale');
});

test('Fail @Length', t => {
    const m = {
        name: 'abcd',
        job: 'abcda',
        age: 10,
        gender: 'male',
        nullable: 'test',
    }
    let error = null;
    try {
        obj.test(m);
    } catch (e) {
        error = e;
    }
    t.is(error.key, 'job');
    t.is(error.error, 'should has a length of 4');
    t.is(error.value, 'abcda');
});

test('Custom Error Handler', t => {
const m = {
        name: 'abcd',
        job: 'abcda',
        age: 10,
        gender: 'male',
        nullable: 'test',
    }
    try {
        obj.test(m);
    } catch (e) {
    }
    let error = currentError;
    t.is(error.key, 'job');
    t.is(error.error, 'should has a length of 4');
    t.is(error.value, 'abcda');
});
