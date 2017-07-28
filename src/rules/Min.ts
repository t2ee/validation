import CustomRule from './CustomRule';

export default function Min(value: number): (target: any, key: string) => any {
    return CustomRule('Min', `should be longer than ${value}`, { value });
}

