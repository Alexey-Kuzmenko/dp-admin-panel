import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { CopyIcon } from './components/CopyIcon';
import { Box } from '@mui/material';

type CodeBlockLanguages = 'javascript' | 'typescript' | 'json' | 'css' | 'markdown' | 'bash';

interface CodeBlockProps {
    code: string
    lang?: CodeBlockLanguages
    copyButton?: boolean
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, lang = 'typescript', copyButton = true }) => {
    return (
        <Box sx={{ position: 'relative' }}>
            {copyButton && <CopyIcon codeString={code} />}
            <SyntaxHighlighter language={lang} style={vs2015} wrapLines wrapLongLines>
                {code}
            </SyntaxHighlighter>
        </Box>

    );
};
