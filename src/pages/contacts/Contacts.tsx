import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography } from '@mui/material';
import { CodeBlock } from '../../components';
import { theme } from '../../theme/ThemeRegistry';
import { modelsCodeBlocks } from '../../models/models-code-blocks';
import cn from 'classnames';
import { JsonEditor } from 'json-edit-react';
import { useAppSelector } from '../../hooks/redux-hooks';

// * temporary data
import data from '../../data/mockData.json';

import styles from './Contacts.module.scss';

export const Contacts = () => {
    const isMenuOpen = useAppSelector((store) => store.menu.isMenuOpen);

    return (
        <div className={styles.Contacts}>

            {/* DTO accordion */}
            <Accordion className={cn(styles.Contacts__accordion, {
                [styles.Contacts__accordion_hidden]: isMenuOpen === true
            })}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.contrastText }} />}
                    aria-controls="panel1-content"
                    id="dto-preview-header"
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
            <Accordion className={cn(styles.Contacts__accordion, {
                [styles.Contacts__accordion_hidden]: isMenuOpen === true
            })}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.contrastText }} />}
                    aria-controls="panel1-content"
                    id="json-preview-header"
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