import axios, { AxiosResponse } from "axios";
import { API_URL } from "../../../Const";
import { GetResultOfBankTranferInquiryResponseDto, InquiryTransectionBankRequestDto, PayTransferClient } from "../../modules/_common/components/apiClient/payTransferApi.client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { toExcel } from "../_common/functionHelper";
import { PaginationSortableDto } from "../_common";

const payTransferClient = new PayTransferClient(API_URL, axios);

const getPayTransferInterfaceFilterQueryKey = "getPayTransferInterfaceFilterQueryKey";
const getPayTransferListHeaderQueryKey = "getPayTransferListHeaderQueryKey";
const getPayListDetailQueryKey = "getPayListDetailQueryKey";
const getTransactionHistoryQueryKey = "getTransactionHistoryQueryKey";

export const useGetPayTransferInterfaceReport = (
    onSuccessCallback?: (response: AxiosResponse<Blob, any>) => void,
    onErrorCallback?: (error: string) => void
) => {
    return useMutation(
        (body: PayTransferFilterRequestDto) =>
            toExcel(
                {
                    ...body
                },
                "/reports/report"
            ),
        {
            onSuccess: (data) => {
                if (!data) onErrorCallback?.("ไม่พบข้อมูล");
                else onSuccessCallback?.(data);
            },
            onError: (error: Error) => {
                onErrorCallback?.(error.message);
            },
        }
    );
};

export const usePayTransferInterfaceFilterGet = (
    body: PayTransferFilterRequestDto,
    paginated?: PaginationSortableDto,
    isSearch?: boolean
) => {
    return useQuery(
        [
            getPayTransferInterfaceFilterQueryKey,
            body.fromDate,
            body.toDate,
            body?.payListStatusId,
            body?.payListSourceTypeId,
            body?.payListDetailCode,
            body?.sendingBankCode,
            body?.searchType,
            body?.searchValues,
            paginated,
        ],
        () =>
            payTransferClient.getPayListTransfer(
                paginated?.page,
                paginated?.recordsPerPage,
                body.fromDate,
                body.toDate,
                body?.payListStatusId,
                body?.payListSourceTypeId,
                body?.payListDetailCode,
                body?.sendingBankCode,
                body?.searchType,
                body?.searchValues,
                paginated?.orderingField,
                paginated?.ascendingOrder,
            ),
        {
            enabled: isSearch ? true : false,
            refetchOnWindowFocus: false,
        }
    );
};

export const usePayTransferListHeaderGet = (
    id: string
) => {
    return useQuery(
        [
            getPayTransferListHeaderQueryKey,
            id
        ],
        () =>
            payTransferClient.getPayListHeader(
                id
            ),
        {
            enabled: id ? true : false,
            refetchOnWindowFocus: false,
        }
    );
};

export const usePayListDetailGet = (
    id: string,
    paginated?: PaginationSortableDto,
) => {
    return useQuery(
        [
            getPayListDetailQueryKey,
            id,
            paginated,
        ],
        () =>
            payTransferClient.getPayListDetail(
                id,
                paginated?.page,
                paginated?.recordsPerPage,
                paginated?.orderingField,
                paginated?.ascendingOrder,
            ),
        {
            enabled: id ? true : false,
            refetchOnWindowFocus: false,
        }
    );
};

export const useInquiryTransectionBank = (
    onSuccessCallback: (response: string | undefined) => void,
    onErrorCallback: (error: string) => void
) => {
    const queryClient = useQueryClient();

    return useMutation(
        (body: InquiryTransectionBankRequestDto) =>
            payTransferClient.inquiryTransectionBank(
                body,
            ),
        {
            onSuccess: (response) => {
                if (!response.isSuccess)
                    onErrorCallback(response.message || response.exceptionMessage || "Unknown error");
                else onSuccessCallback(response.data);

                queryClient.invalidateQueries([getPayTransferInterfaceFilterQueryKey]);
            },
            onError: (error: Error) => {
                onErrorCallback && onErrorCallback(error.message);

                queryClient.invalidateQueries([getPayTransferInterfaceFilterQueryKey]);
            },
        }
    );
};

export const useResultOfBankTranferInquiryGet = (
    onSuccessCallback: (response: GetResultOfBankTranferInquiryResponseDto | undefined) => void,
    onErrorCallback: (error: string) => void
) => {
    const queryClient = useQueryClient();

    return useMutation(
        (paylistheaderid : string) =>
            payTransferClient.getResultOfBankTranferInquiry(
                paylistheaderid,
            ),
        {
            onSuccess: (response) => {
                if (!response.isSuccess)
                    onErrorCallback(response.message || response.exceptionMessage || "Unknown error");
                else onSuccessCallback(response.data);

                queryClient.invalidateQueries([getPayTransferInterfaceFilterQueryKey]);
            },
            onError: (error: Error) => {
                onErrorCallback && onErrorCallback(error.message);

                queryClient.invalidateQueries([getPayTransferInterfaceFilterQueryKey]);
            },
        }
    );
};

// export const useResultOfBankTranferInquiryGet = (
//     paylistheaderid: string,
//     isSearch: boolean,
//     onSuccessCallback: (response: GetResultOfBankTranferInquiryResponseDto | undefined) => void,
//     onErrorCallback: (error: string) => void
// ) => {

//     const queryClient = useQueryClient();
//     return useQuery(
//         [
//             getResultOfBankTranferInquiryQueryKey,
//             paylistheaderid,
//         ],
//         () =>
//             payTransferClient.getResultOfBankTranferInquiry(
//                 paylistheaderid,
//             ),
//         {
//             onSuccess: (response) => {
//                 if (!response.isSuccess)
//                     onErrorCallback(response.message || response.exceptionMessage || "Unknown error");
//                 else onSuccessCallback(response.data);
//                 queryClient.invalidateQueries([getPayTransferInterfaceFilterQueryKey]);
//             },
//             onError: (error: Error) => {
//                 onErrorCallback && onErrorCallback(error.message);
//                 queryClient.invalidateQueries([getPayTransferInterfaceFilterQueryKey]);
//             },
//             enabled: isSearch ? true : false,
//             refetchOnWindowFocus: true,
//             refetchInterval: 6000,
//         }
//     );
// };

export const useTransactionHistoryGet = (
    paylistheaderid: string,
) => {
    return useQuery(
        [
            getTransactionHistoryQueryKey,
            paylistheaderid,
        ],
        () =>
            payTransferClient.getTransactionHistory(
                paylistheaderid,
            ),
        {
            enabled: paylistheaderid ? true : false,
            refetchOnWindowFocus: false,
        },
    );
};

export interface PayTransferFilterRequestDto {
    fromDate?: dayjs.Dayjs | undefined,
    toDate?: dayjs.Dayjs | undefined,
    payListStatusId?: number | undefined,
    payListSourceTypeId?: number | undefined,
    payListDetailCode?: string | undefined,
    sendingBankCode?: string | undefined,
    searchType?: number | undefined,
    searchValues?: string | undefined,
};