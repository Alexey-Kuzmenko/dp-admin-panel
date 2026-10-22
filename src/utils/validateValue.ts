export default function validateValue(obj: object): boolean {
    if (!Object.values(obj).length) {
        return false;
    } else {
        return Object.values(obj).every((v) => v !== '' && v.length);
    }
}
