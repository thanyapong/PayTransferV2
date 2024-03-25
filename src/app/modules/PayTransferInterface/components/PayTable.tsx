import React, { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux";
import { PaginationResultDto, PaginationSortableDto, StandardDataTable } from "../../_common";
import { usePayTransferInterfaceFilterGet } from "../payTransferInterfaceApi";
import { MUIDataTableColumn } from "mui-datatables";
import { updatePaginated, updatePopover } from "../payTransferInterfaceSlice";
import {
    cellAlignOptions,
    defaultOptionStandardDataTable,
    formatDateString,
    numberWithCommas,
    payListStatusSetStyle,
} from "../../_common/functionHelper";
import { Button, Chip, Divider, Grid, Popover, Typography, styled } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PayPopover from "./PayPopover";
import PayDialog from "./PayDialog";

const PopoverStyled = styled(Popover)(() => ({
    "& .MuiPaper-root": {
        boxShadow: "none",
        border: "1px solid #e0e0e0",
    },
}));

const PayTable = () => {
    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>, idx: number) => {
        const { refCode, refCodeNavigation, payListStatus } = data?.data?.[idx] ?? {};
        const { payListHeaderCode, payListHeaderId } = refCodeNavigation ?? {};
        const { payListStatusId, payListStatusName } = payListStatus ?? {};

        let payload = {
            refCode: refCode,
            payListHeaderId: payListHeaderId,
            payListHeaderCode: payListHeaderCode,
            payListStatusId: payListStatusId,
            payListStatusName: payListStatusName,
        };

        dispatch(updatePopover(payload));

        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const { searchValues, paginated, isSearch } = useAppSelector((state) => state.paytransferInterface);

    const { data, isLoading } = usePayTransferInterfaceFilterGet(searchValues, paginated, isSearch);

    const paginatedHandeler: React.Dispatch<React.SetStateAction<PaginationSortableDto>> = (newPaginate) => {
        if (typeof newPaginate == "function") {
            dispatch(updatePaginated(newPaginate(paginated)));
        } else {
            dispatch(updatePaginated(newPaginate));
        }
    };

    const pagination: PaginationResultDto = useMemo(
        () => ({
            totalAmountRecords: data?.totalAmountRecords ?? 0,
            totalAmountPages: data?.totalAmountPages ?? 0,
            currentPage: data?.currentPage ?? 0,
            recordsPerPage: data?.recordsPerPage ?? 0,
            pageIndex: data?.pageIndex ?? 0,
        }),
        [data]
    );

    const columns: MUIDataTableColumn[] = [
        {
            name: "receivingBankAccountNo",
            label: "เลขบัญชีผู้รับ",
            options: { ...cellAlignOptions({ align: "center" }) },
        },
        { name: "receivingName", label: "ชื่อบัญชีผู้รับ", options: { ...cellAlignOptions() } },
        {
            name: "amount",
            label: "จำนวนเงิน",
            options: {
                ...cellAlignOptions({ align: "right" }),
                customBodyRender: (value) => {
                    return value ? numberWithCommas(value) : "-";
                },
            },
        },
        {
            name: "payListSourceType.payListSourceTypeName",
            label: "แหล่งที่มา",
            options: {
                ...cellAlignOptions(),
                customBodyRender: (_values, tableMeta) => {
                    const { payListSourceType } = data?.data?.[tableMeta.rowIndex] ?? {};

                    const { payListSourceTypeName } = payListSourceType ?? {};

                    return payListSourceTypeName ?? "-";
                },
            },
        },
        {
            name: "",
            label: "สถานะ",
            options: {
                ...cellAlignOptions({ align: "center" }),
                customBodyRender: (_values, tableMeta) => {
                    const { payListStatus } = data?.data?.[tableMeta.rowIndex] ?? {};
                    const { payListStatusId, payListStatusName } = payListStatus ?? {};

                    const style = payListStatusSetStyle(payListStatusId ?? 0);

                    return <Chip color={style} label={payListStatusName} />;
                },
            },
        },
        {
            name: "isStatementId",
            label: "Statement",
            options: {
                ...cellAlignOptions({ align: "center" }),
                customBodyRender: (values, tableMeta) => {
                    const { refCodeNavigation } = data?.data?.[tableMeta.rowIndex] ?? {};
                    const { sendingBankId } = refCodeNavigation ?? {};

                    return (
                        <>
                            {sendingBankId == 7 ? (
                                <>
                                    {values == true ? (
                                        <CheckCircleIcon style={{ color: "#388E3C" }} />
                                    ) : (
                                        <CancelIcon style={{ color: "#BF360C" }} />
                                    )}
                                </>
                            ) : (
                                <></>
                            )}
                        </>
                    );
                },
            },
        },
        {
            name: "bankTransferDate",
            label: "วันที่โอนเงินผ่านธนาคาร",
            options: {
                ...cellAlignOptions({ align: "center" }),
                customBodyRender: (value) => {
                    return value ? formatDateString(value, "DD/MM/YYYY HH:mm") : "-";
                },
            },
        },
        {
            name: "bankStatusCode",
            label: "รหัสสถานะ",
            options: {
                ...cellAlignOptions({ align: "center" }),
                customBodyRender: (value) => {
                    return value ? value : "-";
                },
            },
        },
        {
            name: "",
            label: "ตัวเลือก",
            options: {
                ...cellAlignOptions({ align: "center" }),
                customBodyRender: (_value, tableMeta) => {
                    return (
                        <>
                            <Button
                                onClick={(e) => {
                                    handleClick(e, tableMeta.rowIndex);
                                }}
                                sx={{ color: "#0C569B", backgroundColor: "#E8F0F6" }}
                            >
                                <b>...</b>
                            </Button>
                            <PopoverStyled
                                id={id}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "right",
                                }}
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                                style={{ width: "80%" }}
                            >
                                <PayPopover handleClose={handleClose} />
                            </PopoverStyled>
                        </>
                    );
                },
            },
        },
    ];

    return (
        <>
            <Typography>
                รายการ
            </Typography>
            <Divider sx={{ mt: 1 }} />
            <Grid sx={{ mt: 3 }}>
                <StandardDataTable
                    name="payTransferInterfaceTable"
                    title=""
                    data={data?.data ?? []}
                    isLoading={isLoading}
                    columns={columns}
                    paginated={pagination}
                    setPaginated={paginatedHandeler}
                    color="primary"
                    displayToolbar={false}
                    options={defaultOptionStandardDataTable}
                />
                <PayDialog />
            </Grid>
        </>
    );
};

export default PayTable;
