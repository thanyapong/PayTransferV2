import { FormikDropdown } from "..";
import { FormikDropdownProps } from "../CustomFormik/FormikDropdown";
import { useGetPaySourceType } from "../API/payTransferApi";

type PaySourceTypeDropDownProps = Omit<
    FormikDropdownProps,
    "data" | "isLoading" | "valueFieldName" | "label" | "displayFieldName" | "filterSelectedOptions"
>;

const PaySourceTypeDropDown = ({ formik, ...props }: PaySourceTypeDropDownProps) => {
    const { data, isLoading } = useGetPaySourceType();

    return (
        <>
            <FormikDropdown
                data={data?.data ?? []}
                label="ที่มา"
                fullWidth
                {...props}
                formik={formik}
                valueFieldName="payListSourceTypeId"
                displayFieldName="payListSourceTypeName"
                isLoading={isLoading}
            />
        </>
    );
};

export default PaySourceTypeDropDown;
