import { FormikDropdown } from "..";
import { FormikDropdownProps } from "../CustomFormik/FormikDropdown";
import { useGetPayListStatus } from "../API/payTransferApi";

type PayStatusDropDownProps = Omit<
    FormikDropdownProps,
    "data" | "isLoading" | "valueFieldName" | "label" | "displayFieldName" | "filterSelectedOptions"
>;

const PayStatusDropDown = ({ formik, ...props }: PayStatusDropDownProps) => {
    const { data, isLoading } = useGetPayListStatus();

    return (
        <>
            <FormikDropdown
                data={data?.data ?? []}
                label="สถานะ"
                fullWidth
                {...props}
                formik={formik}
                valueFieldName="payListStatusId"
                displayFieldName="payListStatusName"
                isLoading={isLoading}
            />
        </>
    );
};

export default PayStatusDropDown;
