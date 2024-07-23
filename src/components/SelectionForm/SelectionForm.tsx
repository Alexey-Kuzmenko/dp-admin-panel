import { DetailedHTMLProps, FormHTMLAttributes } from 'react';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

import styles from './SlectionForm.module.scss';

interface SelectionFormProps extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
    values: Array<string>
    label: string
    selectId: string
    labelId: string
}

interface FormValues {
    searchValue: string
}

export const SelectionForm: React.FC<SelectionFormProps> = ({ values, selectId, labelId, label, ...props }) => {
    const
        {
            control,
            formState: {
                errors,
            },
            handleSubmit
        } = useForm<FormValues>({
            defaultValues: {
                searchValue: ''
            },
            mode: 'onBlur'
        });

    const renderMenuItem = (): JSX.Element[] => {
        return values.map((v: string) => {
            return (
                <MenuItem value={v}>{v}</MenuItem>
            );
        });
    };

    return (
        <form {...props}>
            <Controller
                name='searchValue'
                control={control}
                render={({ field }) => (
                    <FormControl variant="filled" sx={{ width: '100%', maxWidth: '600px' }}>
                        <InputLabel id={labelId}
                            className={styles.SelectionForm__label}
                            sx={{
                                '& .MuiInputLabel-root': {
                                    color: '#3959FF'
                                }
                            }}
                        >
                            {label}
                        </InputLabel>

                        <Select
                            className={styles.SelectionForm__select}
                            {...field}
                            labelId={labelId}
                            id={selectId}
                        >
                            <MenuItem value=''>None</MenuItem>
                            {renderMenuItem()}
                        </Select>

                    </FormControl>
                )}
            />
        </form>
    );
};