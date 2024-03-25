import axios from "axios";
import { API_URL } from "../../../../../Const";
import { PayTransferClient } from "../apiClient/payTransferApi.client";
import { useQuery } from "@tanstack/react-query";

const payTransferClient = new PayTransferClient(API_URL, axios);

const getPayStatusQueryKey = "getPayStatusQueryKey";
const getPaySourceTypeQueryKey = "getPaySourceTypeQueryKey";
const getPayBankListQueryKey = "getPayBankListQueryKey";

export const useGetPayListStatus = () => {
    return useQuery([getPayStatusQueryKey], () => payTransferClient.getPayListStatus(), {
        refetchOnWindowFocus: true,
    });
};

export const useGetPaySourceType = () => {
    return useQuery([getPaySourceTypeQueryKey], () => payTransferClient.getPayListSourceType(), {
        refetchOnWindowFocus: true,
    });
};

export const useGetPayBankList = () => {
    return useQuery([getPayBankListQueryKey], () => payTransferClient.getBankList(), {
        refetchOnWindowFocus: true,
    });
};