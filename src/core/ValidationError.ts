export default class ValidationError extends Error {

    constructor(public name: string, public source: any, public key: string, public value: any, public error: string) {
        super(`ValidationError(@${name}): in ${source}, @key '${key}', is ${value}, it ${error}`);
    }
}
