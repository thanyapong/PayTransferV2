import { TextFieldProps } from "@mui/material";
import { MobileTimePicker, MobileTimePickerProps } from "@mui/x-date-pickers/MobileTimePicker";
import { Dayjs } from "dayjs";
import { FormikMuiXDateTimeProps, MUIDateTimeThProvider } from ".";

type FormikMobileTimePickerProps = FormikMuiXDateTimeProps &
    MobileTimePickerProps<Dayjs | null> &
    Omit<TextFieldProps, "name" | "label" | "value" | "error" | "helperText" | "variant">;

const FormikMobileTimePicker = ({
    name,
    label,
    formik,
    useThaiLanguage = true,
    useBuddhistEra = true,
    ...other
}: FormikMobileTimePickerProps) => {
    const { touched, value, error } = formik.getFieldMeta<Dayjs | null>(name);
    const { setFieldValue, setFieldTouched } = formik;

    const textFieldProps: Omit<TextFieldProps, "name" | "label" | "value" | "error" | "helperText" | "variant"> = other;

    const handleDateChange = (date: Dayjs | null) => setFieldValue(name, date);

    const handleBlur = () => setFieldTouched(name, true, true);

    return (
        <MUIDateTimeThProvider useThaiLanguage={useThaiLanguage} useBuddhistEra={useBuddhistEra}>
            <MobileTimePicker
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

export default FormikMobileTimePicker;
