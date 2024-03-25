import axios, { AxiosResponse } from "axios";
import dayjs from "dayjs";
import th from "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import timezone from "dayjs/plugin/timezone";
import { MUIDataTableColumnOptions } from "mui-datatables";
import { APIGW_URL, API_URL, PermissionList } from "../../../Const";
import { PermissionCondition, checkPermissions } from "../_auth";
import { encodeURLWithParams } from "../_common";

dayjs.locale(th);
dayjs.extend(buddhistEra);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Bangkok");

export const numberWithCommas = (x: number | string, decimalPlaces: number = 2): string => {
    const numberValue = typeof x === "number" ? x.toFixed(decimalPlaces) : parseFloat(x).toFixed(decimalPlaces);
    const [integerPart, decimalPart] = numberValue.split(".");
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return decimalPart ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;
};

export const formatDateString = (
    dateString: string | undefined,
    format: string = "DD/MM/BBBB HH:mm:ss"
): string | undefined => {
    if (dateString) {
        return dayjs(dateString).format(format);
    }
    return undefined;
};

export const backgroundColorMapPaymentStatus: Record<
    number,
    "#5DADE2" | "#FFF1CD" | "#D4EDBC" | "#FFCFC9" | "#E2F2FF"
> = {
    // 1: "#5DADE2", // NEW
    2: "#FFF1CD", // รอดำเนินการ
    3: "#E2F2FF", // รอตรวจสอบ
    4: "#D4EDBC", // โอนเงินสำเร็จ
    5: "#FFCFC9", // โอนไม่สำเร็จ
    6: "#FFF1CD", // กำลังดำเนินการ
};

export const colorMapPaymentStatus: Record<number, "#0B57D0" | "#11734B" | "#a56e07" | "#B32615"> = {
    // 1: "#0B57D0", // NEW
    2: "#a56e07", // รอดำเนินการ
    3: "#0B57D0", // รอตรวจสอบ
    4: "#11734B", // โอนเงินสำเร็จ
    5: "#B32615", // โอนไม่สำเร็จ
    6: "#a56e07", // กำลังดำเนินการ
};

export const statusBackgroundColorMapStatus: Record<number, "#FFF1CD" | "#D4EDBC" | "#FFCFC9"> = {
    2: "#FFF1CD", // อยู่ระหว่างการโอนเงิน
    3: "#D4EDBC", // ปกติ
    4: "#FFCFC9", // ยกเลิก
};

export const statusColorMapStatus: Record<number, "#a56e07" | "#11734B" | "#B32615"> = {
    2: "#a56e07", // อยู่ระหว่างการโอนเงิน
    3: "#11734B", // ปกติ
    4: "#B32615", // ยกเลิก
};

export const handleClickLink = (redirectURL?: string) => {
    if (redirectURL) {
        window.open(redirectURL, "_blank");
    }
};

export const handleNumberInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // กรอกให้เป็นตัวเลขเท่านั้น
    event.target.value = event.target.value.replace(/[^0-9]/g, "");
};

export const handleFloatingInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // กรอกให้เป็นตัวเลขเท่านั้น
    event.target.value = event.target.value.replace(/[^0-9.]/g, "");
};

export const setBankLogo = (bankId?: number): string | undefined => {
    let avatarSrc: string | undefined;
    const basePath = "/imgs";

    switch (bankId) {
        case 3:
            avatarSrc = `${basePath}/KTB_Logo.png`;
            break;
        case 4:
            avatarSrc = `${basePath}/SCB_Logo.jpg`;
            break;
        case 5:
        case 93468:
            avatarSrc = `${basePath}/TTB_Logo.png`;
            break;
        case 6:
            avatarSrc = `${basePath}/GSB_Logo.jpg`;
            break;
        case 7:
            avatarSrc = `${basePath}/BBL_Logo.png`;
            break;
        case 8:
            avatarSrc = `${basePath}/KBANK_Logo.png`;
            break;
        case 9:
            avatarSrc = `${basePath}/BAY_Logo.png`;
            break;
        case 10:
            avatarSrc = `${basePath}/BAAC_Logo.jpg`;
            break;
        case 11:
            avatarSrc = `${basePath}/TBANK_Logo.jpg`;
            break;
        case 12:
            avatarSrc = `${basePath}/CIMB_Logo.png`;
            break;
        case 13:
            avatarSrc = `${basePath}/LHBANK_Logo.png`;
            break;
        case 31501:
            avatarSrc = `${basePath}/KKB_Logo.png`;
            break;
        case 32692:
            avatarSrc = `${basePath}/UOB_Logo.jpg`;
            break;
        case 75751:
            avatarSrc = `${basePath}/ISBT_Logo.png`;
            break;
        case 93435:
            avatarSrc = `${basePath}/GHB_Logo.jpg`;
            break;
        default:
            // Handle default case if needed
            break;
    }
    return avatarSrc;
};

export const formatPhone = (phone: string | undefined) => {
    const formatPattern = "%%%-%%%%%%%";
    let formattedNumber = "";
    let numberIndex = 0;
    if (phone == undefined || phone.length != 10) return "-";

    for (let i = 0; i < formatPattern.length; i++) {
        if (formatPattern[i] === "%") {
            formattedNumber += phone[numberIndex];
            numberIndex++;
        } else {
            formattedNumber += formatPattern[i];
        }
    }
    return formattedNumber;
};

export const encodeToBase64 = (str: string): string => {
    return btoa(encodeURIComponent(str));
};

export const decodeFromBase64 = (str: string): string => {
    return decodeURIComponent(atob(str));
};

export const styleColLeft = { textAlign: "left", fontSize: 14, fontWeight: 500 };
export const styleColCenter = { textAlign: "center", fontSize: 14, fontWeight: 500 };
export const styleColRight = { textAlign: "right", fontSize: 14, fontWeight: 500 };

type CellAlignOptions = {
    align?: "right" | "center" | "left";
    sort?: boolean;
    width?: string;
    headerWhiteSpace?: "normal" | "nowrap" | "pre" | "pre-line" | "pre-wrap" | "initial" | "inherit";
    cellWhiteSpace?: "normal" | "nowrap" | "pre" | "pre-line" | "pre-wrap" | "initial" | "inherit";
};

export const cellAlignOptions = (options: CellAlignOptions = {}): MUIDataTableColumnOptions => {
    const { align = "left", sort = false, width = "", headerWhiteSpace = "nowrap", cellWhiteSpace = "" } = options;

    return {
        filter: true,
        sort,
        setCellHeaderProps: () => ({
            style: { textAlign: align, width, whiteSpace: headerWhiteSpace },
        }),
        setCellProps: () => ({
            style: {
                textAlign: align,
                width,
                whiteSpace: cellWhiteSpace,
                overflow: "hidden",
            },
        }),
    };
};

export const defaultOptionStandardDataTable = {
    setTableProps: () => {
        return {
            size: "small",
        };
    },
    print: true,
    download: true,
};

interface AuthCheckPermissionProps {
    userPermissions: string[];
    permissions?: PermissionList[];
    condition?: PermissionCondition;
}

export const AuthCheckPermission = ({
    userPermissions,
    permissions,
    condition = "OR",
}: AuthCheckPermissionProps): boolean => {
    if (!permissions) {
        return true;
    }

    return checkPermissions(userPermissions, permissions as PermissionList[], condition);
};

export interface Payload {
    [key: string]: any;
}

export const cleanPayload = (payload: Payload): void => {
    for (const key in payload) {
        if (payload[key] === null || payload[key] === undefined) {
            delete payload[key];
        } else if (typeof payload[key] === "object") {
            cleanPayload(payload[key] as Payload);
        }
    }
};

export const toExcel = async <TRequest extends Payload>(
    payload: TRequest,
    url: string
): Promise<AxiosResponse<Blob>> => {
    cleanPayload(payload);
    const _url = encodeURLWithParams(API_URL + url, payload);
    return await axios
        .get(`${_url}`, { responseType: "blob" })
        .then((res: AxiosResponse<Blob>) => {
            if (res.status === 200) {
                return res;
            } else {
                throw Error(res.statusText);
            }
        })
        .catch((err) => {
            throw err;
        });
};

export const toExcelPost = async <TRequest extends Payload>(
    payload: TRequest,
    url: string
): Promise<AxiosResponse<Blob>> => {
    const _url = APIGW_URL + url;
    return await axios
        .post(_url, payload)
        .then((res) => {
            if (res.status !== 200) {
                throw new Error(res.data.message);
            } else {
                return axios.post(_url, payload, { responseType: "blob" });
            }
        })
        .catch((err) => {
            throw err;
        });
};

export const [startOfMonth, endOfMonth] = [
    dayjs().local().utcOffset(0).startOf("month"),
    dayjs().local().utcOffset(0).endOf("month"),
];

export const toUtcOffset = (date: dayjs.ConfigType, keepLocalTime?: boolean): dayjs.Dayjs | undefined => {
    if (!date) return undefined;

    const result = keepLocalTime
        ? dayjs(date)?.utcOffset(0, keepLocalTime).startOf("day")
        : dayjs(date)?.utcOffset(0).startOf("day");

    return result;
};

export const renderDashboardValue = (itemCount: number | undefined, decimalPlaces: number = 2): string => {
    let result: string = "-";
    if (typeof itemCount != "undefined") result = numberWithCommas(itemCount, decimalPlaces);

    return result;
};

export const payListStatusSetStyle = (payListStatusId : number) => {
    switch (payListStatusId) {
        case 2:
            return "primary";
        case 3:
            return "edit";
        case 4:
            return "submit";
        case 5:
            return "unapprove";
        default:
            return "default";
    }
};