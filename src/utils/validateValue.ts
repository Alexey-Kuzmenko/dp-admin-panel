export default function validateValue(obj: object): boolean {
    let isValid = true;

    if (!Object.values(obj).length) {
        isValid = false;
    } else {
        isValid = Object.values(obj).every((v) => v !== '' && v.length);
    }

    return isValid;
}