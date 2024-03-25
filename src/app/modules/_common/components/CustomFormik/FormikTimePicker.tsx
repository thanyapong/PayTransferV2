import { TimePicker, TimePickerProps } from "@mui/x-date-pickers/TimePicker";
import { Dayjs } from "dayjs";

import { TextFieldProps } from "@mui/material";
import { FormikMuiXDateTimeProps, MUIDateTimeThProvider } from ".";

type FormikTimePickerProps = FormikMuiXDateTimeProps &
    TimePickerProps<Dayjs | null> &
    Omit<TextFieldProps, "name" | "label" | "value" | "error" | "helperText" | "variant">;

const FormikTimePicker = ({
    name,
    label,
    formik,
    useThaiLanguage = true,
    useBuddhistEra = true,
    ...other
}: FormikTimePickerProps) => {
    const { touched, value, error } = formik.getFieldMeta<Dayjs | null>(name);
    const { setFieldValue, setFieldTouched } = formik;

    const textFieldProps: Omit<TextFieldProps, "name" | "label" | "value" | "error" | "helperText" | "variant"> = other;

    const handleDateChange = (date: Dayjs | null) => setFieldValue(name, date);

    const handleBlur = () => setFieldTouched(name, true, true);

    return (
        <MUIDateTimeThProvider useThaiLanguage={useThaiLanguage} useBuddhistEra={useBuddhistEra}>
            <TimePicker
                {...other}
                value={value}
                label={label}
                onChange={handleDateChange}
                onClose={handleBlur}
                slotProps={{
                    textField: {
                        helperText: error,
                        error: touched && !!error,
                        ...textFieldProps,
                    },
                }}
            />
        </MUIDateTimeThProvider>
    );
};

export default FormikTimePicker;
