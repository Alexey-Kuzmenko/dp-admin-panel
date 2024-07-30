export default function generateCodeBlock(obj: object): string {

    let codeBlock = '';
    const values = Object.entries(obj).map(([key, value]) => `\t"${key}": "${value}"\n`);

    values.forEach((str) => {
        codeBlock += str;
    });

    return '{\n' + codeBlock + '}';
}