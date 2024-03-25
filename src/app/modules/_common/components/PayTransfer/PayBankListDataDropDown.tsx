import { FormikDropdown } from "..";
import { FormikDropdownProps } from "../CustomFormik/FormikDropdown";
import { useGetPayBankList } from "../API/payTransferApi";

type PayBankListDataDropDownProps = Omit<
    FormikDropdownProps,
    "data" | "isLoading" | "valueFieldName" | "label" | "displayFieldName" | "filterSelectedOptions"
>;

const PayBankListDataDropDown = ({ formik, ...props }: PayBankListDataDropDownProps) => {
    const { data, isLoading } = useGetPayBankList();

    return (
        <>
            <FormikDropdown
                data={data?.data ?? []}
                label="ธนาคารต้นทาง"
                fullWidth
                {...props}
                formik={formik}
                valueFieldName="bankCode"
                displayFieldName="bankName"
                isLoading={isLoading}
            />
        </>
    );
};

export default PayBankListDataDropDown;
