import { DetailedHTMLProps, FormHTMLAttributes } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';


interface SelectionFormProps extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
    values: Array<string>
    labelId: string
    id: string
}

interface FormValues {
    searchValue: string
}

export const SelectionForm: React.FC<SelectionFormProps> = ({ values, labelId, id, ...props }) => {
    const
        {
            control,
            formState: {
                errors,
            },
            handleSubmit
        } = useForm<FormValues>();

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
                    <FormControl variant="filled">
                        <InputLabel id="demo-simple-select-filled-label">Age</InputLabel>
                        <Select
                            {...field}
                            labelId={labelId}
                            id={id}
                            onChange={() => { }}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                )}
            />
        </form>
    );
};