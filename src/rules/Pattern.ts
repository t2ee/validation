import CustomRule from './CustomRule';

export default function Pattern(value: RegExp): (target: any, key: string) => any {
    return CustomRule('Pattern', `should has a pattern of ${value}`, { value });
}

