import { TextFieldProps } from "@mui/material";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import { FormikMuiXDateTimeProps, MUIDateTimeThProvider } from ".";

type FormikDatePickerProps = FormikMuiXDateTimeProps &
    DatePickerProps<Dayjs | null> &
    Omit<TextFieldProps, "name" | "label" | "value" | "error" | "helperText" | "variant">;

const FormikDatePicker = ({
    name,
    label,
    formik,
    useThaiLanguage = true,
    useBuddhistEra = true,
    ...other
}: FormikDatePickerProps) => {
    const { touched, value, error } = formik.getFieldMeta<Dayjs | null>(name);
    const { setFieldValue, setFieldTouched } = formik;

    const textFieldProps: Omit<TextFieldProps, "name" | "label" | "value" | "error" | "helperText" | "variant"> = other;

    const handleDateChange = (date: Dayjs | null) => setFieldValue(name, date);

    const handleBlur = () => setFieldTouched(name, true, true);

    return (
        <MUIDateTimeThProvider useThaiLanguage={useThaiLanguage} useBuddhistEra={useBuddhistEra}>
            <DatePicker
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

export default FormikDatePicker;
