import React, { DetailedHTMLProps, FormHTMLAttributes, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Button } from '../Button/Button';

import styles from './SelectionForm.module.scss';

interface SelectionFormProps extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
    values: Array<string>
    label: string
    selectId: string
    labelId: string
    onFind: (value: string) => void
    onDelete?: React.MouseEventHandler
}

interface FormValues {
    searchValue: string
}

export const SelectionForm: React.FC<SelectionFormProps> =
    ({ values, selectId, labelId, label, onFind, onDelete, ...props }) => {

        const
            {
                control,
                handleSubmit,
                reset
            } = useForm<FormValues>({
                defaultValues: {
                    searchValue: ''
                },
                mode: 'onBlur'
            });

        const [isValid, setIsValid] = useState<boolean>(false);

        const handleFormSubmit: SubmitHandler<FormValues> = ({ searchValue }) => {
            if (searchValue.length) {
                setIsValid(true);
            }

            onFind(searchValue);
            reset();
        };

        const renderMenuItem = (): JSX.Element[] => {
            return values.map((v: string) => {
                return (
                    <MenuItem key={v} value={v}>{v}</MenuItem>
                );
            });
        };

        return (
            <form {...props} className={styles.SelectionForm} onSubmit={handleSubmit(handleFormSubmit)}>
                <Controller
                    name='searchValue'
                    rules={{ required: true }}
                    control={control}
                    render={({ field }) => (
                        <FormControl variant='filled' sx={{ width: '100%', maxWidth: '600px' }}>

                            <InputLabel id={labelId} className={styles.SelectionForm__selectLabel}>{label}</InputLabel>

                            <Select
                                {...field}
                                labelId={labelId}
                                id={selectId}
                            >
                                {renderMenuItem()}
                            </Select>

                        </FormControl>
                    )}
                />

                <div className={styles.SelectionForm__controls}>
                    <Button role='button' type='submit' variant='outlined'>Find</Button>
                    {
                        !onDelete
                            ?
                            null
                            :
                            <Button role='link' variant='contained' onClick={onDelete} disabled={!isValid}>
                                Delete
                            </Button>
                    }
                </div>
            </form>
        );
    };