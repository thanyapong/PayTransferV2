import { FormikDropdown } from "..";
import { FormikDropdownProps } from "../CustomFormik/FormikDropdown";

type PaySearchTypeDropDownProps = Omit<
    FormikDropdownProps,
    "data" | "isLoading" | "valueFieldName" | "label" | "displayFieldName" | "filterSelectedOptions"
>;

const PaySearchTypeDropDown = ({ formik, ...props }: PaySearchTypeDropDownProps) => {
    const searchIndex = [
        { id: 1, name: "รหัสอ้างอิง" },
        { id: 2, name: "เลขบัญชีผู้ส่ง" },
        { id: 3, name: "เลขบัญชีผู้รับ" },
        { id: 4, name: "ชื่อผู้รับ" },
    ];

    return (
        <>
            <FormikDropdown
                data={searchIndex}
                label="ที่มา"
                fullWidth
                {...props}
                formik={formik}
                valueFieldName="id"
                displayFieldName="name"
            />
        </>
    );
};

export default PaySearchTypeDropDown;
