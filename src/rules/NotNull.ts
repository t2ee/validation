import CustomRule from './CustomRule';

export default function NotNull(target: any, key: string) {
    return CustomRule('NotNull', 'should not be null')(target, key);
}
