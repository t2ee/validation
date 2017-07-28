import CustomRule from './CustomRule';

export default function Length(value: number): (target: any, key: string) => any {
    return CustomRule('Length', `should has a length of ${value}`, { value });
}

