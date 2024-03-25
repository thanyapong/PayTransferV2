import { useAppDispatch } from "../../../../redux";
import dayjs from "dayjs";
import { FormikErrors, useFormik } from "formik";
import { Button, CircularProgress, Grid } from "@mui/material";
import { Search } from "@mui/icons-material";
import { FormikTextField, PaginationSortableDto, swalWarning } from "../../_common";
import FormikDatePicker from "../../_common/components/CustomFormik/FormikDatePicker";
import PayStatusDropDown from "../../_common/components/PayTransfer/PayStatusDropDown";
import { updatePaginated, updateSearchValues } from "../payTransferInterfaceSlice";
import { PayTransferFilterRequestDto, useGetPayTransferInterfaceReport } from "../payTransferInterfaceApi";
import PaySourceTypeDropDown from "../../_common/components/PayTransfer/PaySourceTypeDropDown";
import PayBankListDataDropDown from "../../_common/components/PayTransfer/PayBankListDataDropDown";
import PaySearchTypeDropDown from "../../_common/components/PayTransfer/PaySearchTypeDropDown";
import { AxiosResponse } from "axios";
import fileDownload from "js-file-download";
import { grey } from "@mui/material/colors";

const PaySearch = () => {
    const dispatch = useAppDispatch();

    const defaultValue: PayTransferFilterRequestDto = {
        fromDate: dayjs(new Date()).local().startOf("month"),
        toDate: dayjs(new Date()).local().endOf("month"),
        payListStatusId: undefined,
        payListSourceTypeId: undefined,
        sendingBankCode: undefined,
        searchType: undefined,
        searchValues: undefined,
    };

    const formik = useFormik<PayTransferFilterRequestDto>({
        enableReinitialize: true,

        initialValues: defaultValue,

        onSubmit: (values) => {
            const paginate: PaginationSortableDto = {
                page: 1,
                recordsPerPage: 10,
                orderingField: "desc",
                ascendingOrder: true,
            };

            dispatch(updateSearchValues(values));
            dispatch(updatePaginated(paginate));
        },
        validate: () => {
            const errors: FormikErrors<PayTransferFilterRequestDto> = {};

            return errors;
        },
    });

    const handelExport = () => {
        payTransferInterfaceReport(formik.values);
    };

    const handleSuccess = (response: AxiosResponse<Blob, any>) => {
        fileDownload(
            response.data,
            `รายงานPayTransferInterface_${dayjs(new Date()).local().format("DD MMMM YYYY")}.xlsx`
        );
    };

    const handleError = () => {
        swalWarning("Warning", "ไม่พบข้อมูล");
    };

    const { mutate: payTransferInterfaceReport, isLoading } = useGetPayTransferInterfaceReport(handleSuccess, handleError);

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} lg={3}>
                    <FormikDatePicker fullWidth formik={formik} name="fromDate" label="วันที่สร้างรายการ" />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <FormikDatePicker fullWidth formik={formik} name="toDate" label="ถึงวันที่" />
                </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ mt: -1.5 }}>
                <Grid item xs={12} md={6} lg={3}>
                    <PayStatusDropDown
                        fullWidth
                        formik={formik}
                        name="payListStatusId"
                        firstItemText="ทั้งหมด"
                        disableFirstItem={false}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <PaySourceTypeDropDown
                        fullWidth
                        formik={formik}
                        name="payListSourceTypeId"
                        firstItemText="ทั้งหมด"
                        disableFirstItem={false}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={3}>
                    <PayBankListDataDropDown
                        fullWidth
                        formik={formik}
                        name="sendingBankCode"
                        firstItemText="ทั้งหมด"
                        disableFirstItem={false}
                    />
                </Grid>
            </Grid>
            <Grid container alignItems={"center"} spacing={3} sx={{ mt: -1.5 }}>
                <Grid item xs={12} md={6} lg={3}>
                    <PaySearchTypeDropDown
                        fullWidth
                        formik={formik}
                        name="searchType"
                        firstItemText="ทั้งหมด"
                        disableFirstItem={false}
                    />
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <FormikTextField formik={formik} name="searchValues" label="ค้นหา" size="small" />
                </Grid>
                <Grid container item xs={12} md={6} lg={1}>
                    <Button
                        fullWidth
                        size="medium"
                        startIcon={<Search />}
                        onClick={formik.submitForm}
                        sx={{ height: '39.5px', marginTop: 0.4 }}
                    >
                        ค้นหา
                    </Button>
                </Grid>
                <Grid container item xs={12} md={6} lg={2}>
                    <Button
                        fullWidth
                        size="medium"
                        color="success"
                        variant="contained"
                        onClick={handelExport}
                        disabled={isLoading}
                        sx={{ height: '39.5px', marginTop: 0.4 }}
                    >
                        { isLoading ? <CircularProgress  style={{ color: grey[400], marginTop: 10 }} size={20}/> : (
                            <>
                                Export to Excel
                            </>
                        )}
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default PaySearch;
