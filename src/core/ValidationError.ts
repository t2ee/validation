export default class ValidationError extends Error {

    constructor(name: string, source:any, key: string, value: any, error: string) {
        super(`ValidationError(@${name}): in ${source}, @key '${key}', is ${value}, it ${error}`);
    }
}
