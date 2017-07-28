import CustomRule from './CustomRule';

export default function Max(value: number): (target: any, key: string) => any {
    return CustomRule('Max', `should be shorter than ${value}`, { value });
}

