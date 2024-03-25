import { TextFieldProps } from "@mui/material";
import { DateField, DateFieldProps } from "@mui/x-date-pickers/DateField";
import { Dayjs } from "dayjs";
import { FormikMuiXDateTimeProps, MUIDateTimeThProvider } from ".";

export type FormikDateFieldProps = FormikMuiXDateTimeProps &
    DateFieldProps<Dayjs | null> &
    Omit<TextFieldProps, "name" | "label" | "value" | "error" | "helperText" | "variant">;

const FormikDateField = ({
    name,
    label,
    formik,
    useThaiLanguage = true,
    useBuddhistEra = true,
    ...other
}: FormikDateFieldProps) => {
    const { touched, value, error } = formik.getFieldMeta<Dayjs | null>(name);
    const { setFieldValue, setFieldTouched } = formik;

    const textFieldProps: Omit<TextFieldProps, "name" | "label" | "value" | "error" | "helperText" | "variant"> = other;

    const handleDateChange = (date: Dayjs | null) => setFieldValue(name, date);

    const handleBlur = () => setFieldTouched(name, true, false);

    return (
        <MUIDateTimeThProvider useThaiLanguage={useThaiLanguage} useBuddhistEra={useBuddhistEra}>
            <DateField
                {...other}
                value={value}
                label={label}
                onBlur={handleBlur}
                onChange={handleDateChange}
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

export default FormikDateField;
