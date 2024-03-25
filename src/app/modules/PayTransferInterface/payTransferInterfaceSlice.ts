import dayjs from "dayjs";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../redux";

/** สร้าง Type ของ State และ Intitial State **/
export type PayTransferInterfaceState = {
    searchValues: {
        fromDate?: dayjs.Dayjs | undefined,
        toDate?: dayjs.Dayjs | undefined,
        payListStatusId?: number | undefined,
        payListSourceTypeId?: number | undefined,
        sendingBankCode?: string | undefined,
        searchType?: number | undefined,
        searchValues?: string | undefined,
    };

    paginated: {
        page?: number;
        recordsPerPage?: number;
        orderingField?: string;
        ascendingOrder?: boolean | undefined;
    };

    isSearch: boolean;

    payPopover: {
        refCode: string | undefined;
        payListHeaderId: string | undefined;
        payListHeaderCode: string | undefined;
        payListStatusId: number | undefined;
        payListStatusName: string | undefined;
    };

    dialogDetail: {
        payListHeaderCode: string | undefined,
        payListStatusId?: number,
        payListStatusName?: string | undefined,
        isOpen: boolean,
    };
};

const initialState: PayTransferInterfaceState = {
    searchValues: {
        fromDate: undefined,
        toDate: undefined,
        payListStatusId: undefined,
        payListSourceTypeId: 0,
        sendingBankCode: undefined,
        searchType: 0,
        searchValues: undefined,
    },

    paginated: {
        page: 1,
        recordsPerPage: 10,
        orderingField: "desc",
        ascendingOrder: true,
    },

    isSearch: false,

    payPopover: {
        refCode: "",
        payListHeaderId: "",
        payListHeaderCode: "",
        payListStatusId: 0,
        payListStatusName: "",
    },

    dialogDetail: {
        payListHeaderCode: '',
        payListStatusId: 0,
        payListStatusName: '',
        isOpen: false
    },

};

export type SetSearchValues = {
    fromDate?: dayjs.Dayjs | undefined,
    toDate?: dayjs.Dayjs | undefined,
    payListStatusId?: number | undefined,
    payListSourceTypeId?: number | undefined,
    sendingBankCode?: string | undefined,
    searchType?: number | undefined,
    searchValues?: string | undefined,
};

export type SetPaginated = {
    page?: number;
    recordsPerPage?: number;
    orderingField?: string;
    ascendingOrder?: boolean;
};

export type SetPopover = {
    refCode: string | undefined;
    payListHeaderId: string | undefined;
    payListHeaderCode: string | undefined;
    payListStatusId: number | undefined;
    payListStatusName: string | undefined;
};

export type SetDialogDetails = {
    payListHeaderCode: string | undefined,
    payListStatusId?: number,
    payListStatusName?: string | undefined,
    isOpen: boolean,
};

const PayTransferInterfaceSlice = createSlice({
    name: "payTransferInterface",
    initialState,
    reducers: {
        // สร้างฟังค์ชั่น สำหรับเปลี่ยนแปลง State
        updateSearchValues: (state, action: PayloadAction<SetSearchValues>) => {
            state.searchValues = action.payload;
            state.isSearch = true;
        },

        updatePaginated: (state, action: PayloadAction<SetPaginated>) => {
            state.paginated = action.payload;
        },

        updatePopover: (state, action: PayloadAction<SetPopover>) => {
            state.payPopover = action.payload;
        },

        updateDialogDetails: (state, action: PayloadAction<SetDialogDetails>) => {
            state.dialogDetail = action.payload;
        },

        reset: () => initialState,
    },
});

// สร้าง Action จาก Slice
export const {
    updateSearchValues,
    updatePaginated,
    updatePopover,
    updateDialogDetails,
    reset,
} = PayTransferInterfaceSlice.actions;

export const selectPayTransferInterface = (state: RootState) => state.paytransferInterface;
// สร้าง Reducer จาก Slice</Typography>
export default PayTransferInterfaceSlice.reducer;
