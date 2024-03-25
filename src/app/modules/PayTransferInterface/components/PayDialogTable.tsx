import { PaginationResultDto, PaginationSortableDto, StandardDataTable } from '../../_common';
import { Grid } from '@mui/material';
import { useAppSelector } from '../../../../redux';
import { usePayListDetailGet } from '../payTransferInterfaceApi';
import { useMemo, useState } from 'react';
import { defaultOptionStandardDataTable, cellAlignOptions, numberWithCommas, formatDateString } from '../../_common/functionHelper';
import { MUIDataTableColumn } from 'mui-datatables';

const PayDialogTable = () => {
    const { payPopover } = useAppSelector((state) => state.paytransferInterface);
    const { refCode } = payPopover;

    const [paginated, setPaginated] = useState<PaginationSortableDto>({
        page: 1,
        recordsPerPage: 10,
    });

    const paginatedHandeler: React.Dispatch<React.SetStateAction<PaginationSortableDto>> = (newPaginate) => {
        if (typeof newPaginate == "function") {
            setPaginated(newPaginate(paginated));
        } else {
            setPaginated(newPaginate);
        }
    };

    const { data, isLoading } = usePayListDetailGet(refCode ?? "", paginated);

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
            name: "payListDetailCode",
            label: "รหัสรายการ",
            options: {
                ...cellAlignOptions({ align: 'center' }),

            },
        },
        {
            name: "refDetail01",
            label: "รายละเอียด 1",
            options: {
                ...cellAlignOptions(),

            },
        },
        {
            name: "refDetail02",
            label: "รายละเอียด 2",
            options: {
                ...cellAlignOptions(),

            },
        },
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
            name: "refDate",
            label: "วันที่อ้างอิง",
            options: {
                ...cellAlignOptions({ align: "center" }),
                customBodyRender: (value) => {
                    return value ? formatDateString(value, "DD/MM/YYYY HH:mm") : "-";
                },
            },
        },
    ];

    return (
        <Grid item sx={{ mt: 3.1 }}>
            <StandardDataTable
                name="payListDetailTable"
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
        </Grid>
    );
};

export default PayDialogTable;