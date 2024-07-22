import { useState } from 'react';
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
import { VIEWPORT_MIN_WIDTH } from '../../constants/constants';
import { ContactModel } from '../../models/contact.model';

import styles from './Contacts.module.scss';

// * temporary data
import data from '../../data/mockData.json';

export const Contacts = () => {
    const viewportWidth = window.innerWidth;
    const isMenuOpen = useAppSelector((store) => store.menu.isMenuOpen);
    const [jsonData, setJsonData] = useState<object>(data);

    // ! debug
    console.log(jsonData);

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

            {/* JSON editor accordion */}
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
                    {
                        viewportWidth < VIEWPORT_MIN_WIDTH ?
                            <Typography component='h2' variant='body1'>
                                *JSON editor not available on current screen width. Please rotate
                                your device and reload the page, or log in from another device.
                            </Typography>
                            :
                            <JsonEditor
                                data={jsonData}
                                className={styles.Contacts__jsonEditor}
                                onUpdate={({ newData }) => {
                                    setJsonData(newData);
                                }}
                            />
                    }
                </AccordionDetails>
            </Accordion>

            {/* Add contact accordion */}
            <Accordion className={cn(styles.Contacts__accordion, {
                [styles.Contacts__accordion_hidden]: isMenuOpen === true
            })}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.contrastText }} />}
                    aria-controls="panel1-content"
                    id="json-preview-header"
                >
                    <Typography component='h1' variant='h5'>Add contact</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    From
                </AccordionDetails>
            </Accordion>

            {/* Delete contact accordion */}
            <Accordion className={cn(styles.Contacts__accordion, {
                [styles.Contacts__accordion_hidden]: isMenuOpen === true
            })}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.contrastText }} />}
                    aria-controls="panel1-content"
                    id="json-preview-header"
                >
                    <Typography component='h1' variant='h5'>Delete contact</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    Form
                </AccordionDetails>
            </Accordion>

        </div>
    );
};