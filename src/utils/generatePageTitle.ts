export default function generatePageTitle(route: string): string {

    if (!route.length) throw new Error('Route argument can\'t be empty');

    let newStr = '';

    route.split('').forEach((symbol: string) => {

        if (symbol !== '/') {
            newStr += symbol;
        }

        if (symbol === '-') {
            newStr = newStr.replace('-', ' ');
        }
    });

    return newStr.toUpperCase();
}
