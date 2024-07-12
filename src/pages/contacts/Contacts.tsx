import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography } from '@mui/material';
import { CodeBlock } from '../../components';
import { theme } from '../../theme/ThemeRegistry';
import { modelsCodeBlocks } from '../../models/models-code-blocks';

// ! testing
import { JsonEditor } from 'json-edit-react';
import data from '../../data/mockData.json';

import styles from './Contacts.module.scss';

export const Contacts = () => {
    return (
        <div className={styles.Contacts}>
            {/* DTO accordion */}
            <Accordion defaultExpanded className={styles.Contacts__accordion}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.contrastText }} />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Typography component='h1' variant='h5'>Dto</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <CodeBlock
                        code={modelsCodeBlocks.contacts}
                        lang='typescript'
                    />
                </AccordionDetails>
            </Accordion>

            {/* JSON preview accordion */}
            <Accordion defaultExpanded className={styles.Contacts__accordion}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.contrastText }} />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Typography component='h1' variant='h5'>All contacts</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <JsonEditor data={{ data }} />
                </AccordionDetails>
            </Accordion>

        </div>
    );
};