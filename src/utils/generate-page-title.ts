export default function generatePageTitle(route: string): string {

    if (!route.length) {
        throw new Error('Route argument can\'t be empty');
    } else {
        return route.split('').map((symbol: string) => {
            let newStr = '';

            if (symbol !== '/') {
                newStr += symbol;
            }

            if (symbol === '-') {
                newStr = newStr.replace('-', ' ');
            }

            return newStr.toUpperCase();

        }).join('');
    }

}
