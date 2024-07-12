import { CopyBlock, vs2015 } from 'react-code-blocks';

interface CodeBlockProps {
    code: string
    lang: string
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, lang }) => {
    return (
        <CopyBlock
            text={code}
            language={lang}
            theme={vs2015}
            wrapLongLines={true}
        />
    );
};

