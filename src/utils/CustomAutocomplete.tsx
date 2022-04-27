import {
    Autocomplete,
    AutocompleteRenderInputParams,
    CircularProgress,
    TextField
} from '@mui/material';
import React from 'react';

interface Props {
    options: ReadonlyArray<{ label: string }>;
    loading: boolean;
    value: { label: string };
    label: string;
    onChange: (
        event: React.SyntheticEvent<Element, Event>,
        newValue: { label: string } | null
    ) => void;
}

const CustomAutocomplete: React.FC<Props> = ({ options, loading, value, label, onChange }) => {
    const autocompleteMainProps = {
        options,
        value,
        onChange,
        renderInput: (params: AutocompleteRenderInputParams) => (
            <TextField
                {...params}
                label={label}
                InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                        <React.Fragment>
                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                        </React.Fragment>
                    )
                }}
            />
        )
    };

    const autocompleteOtherProps = {
        loading,
        fullWidth: true,
        clearIcon: false,
        clearOnBlur: true,
        blurOnSelect: true,
        autoHighlight: true,
        disablePortal: true,
        openOnFocus: true
    };

    return <Autocomplete {...autocompleteMainProps} {...autocompleteOtherProps} />;
};

export default CustomAutocomplete;
