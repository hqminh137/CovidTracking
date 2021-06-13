import { FormControl, FormHelperText, InputLabel, NativeSelect } from "@material-ui/core";
import React from "react";

export default function CountrySelector({ value, handleOnChange, contries }) {
    return (
        <FormControl>
            <InputLabel htmlFor="country-select" shrink>
                Quốc gia:
            </InputLabel>
            <NativeSelect
                value={value}
                onChange={handleOnChange}
                inputProps={{
                    name: "country",
                    id: "country-select",
                }}
            >
                {contries.map((country) => {
                    return (
                        <option key={country.ISO2} value={country.ISO2.toLowerCase()}>
                            {country.Country}
                        </option>
                    );
                })}
            </NativeSelect>
            <FormHelperText>Lựa chọn quốc gia*</FormHelperText>
        </FormControl>
    );
}
