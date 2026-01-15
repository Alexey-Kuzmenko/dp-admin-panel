export default function excludeObjectValues<T>(keys: Array<string>, arr: Array<object>): Array<T> {
    const updatedObjects: Array<T> = [];

    for (const obj of arr) {
        updatedObjects.push(
            Object.fromEntries(Object.entries(obj).filter(([key]) => !keys.includes(key))) as T
        );
    }

    return updatedObjects;
}
