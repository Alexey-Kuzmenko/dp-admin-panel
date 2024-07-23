import { DetailedHTMLProps, FormHTMLAttributes } from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';


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
                searchValue: 'None'
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
                    <FormControl variant="filled" sx={{ width: '100%', maxWidth: '300px' }}>
                        <InputLabel id={labelId}>{label}</InputLabel>
                        <Select
                            sx={{ borderBottom: '2px solid #fff' }}
                            {...field}
                            labelId={labelId}
                            id={selectId}
                        // onChange={() => { }}
                        >
                            {renderMenuItem()}
                        </Select>
                    </FormControl>
                )}
            />
        </form>
    );
};