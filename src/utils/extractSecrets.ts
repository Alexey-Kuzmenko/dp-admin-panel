export default function extractSecrets(str: string): Array<string> {
    return str.split(', ');
}
