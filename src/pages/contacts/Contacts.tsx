import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography } from '@mui/material';
import { CodeBlock, SelectionForm } from '../../components';
import { theme } from '../../theme/ThemeRegistry';
import { modelsCodeBlocks } from '../../models/models-code-blocks';
import cn from 'classnames';
import { JsonEditor } from 'json-edit-react';
import { useAppSelector } from '../../hooks/redux-hooks';
import { VIEWPORT_MIN_WIDTH } from '../../constants/constants';

import styles from './Contacts.module.scss';

// * temporary data
import data from '../../data/mockData.json';
const ids: string[] = [
    'd944a37b-6383-4862-a181-eac8e611811d',
    'ace375c8-ee45-4eab-88c2-d49f22c01ddc',
    'e7cdabc7-ac69-468b-824f-0e603a547b26',
    'c53e6365-1ab2-46e9-8ae0-ffa72d08dbf5'
];

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
                    <SelectionForm
                        values={ids}
                        label='Choose contact id'
                        selectId='contacts-select'
                        labelId='contacts-select-label'
                        id='contacts-select-form'
                    />
                </AccordionDetails>
            </Accordion>

        </div>
    );
};