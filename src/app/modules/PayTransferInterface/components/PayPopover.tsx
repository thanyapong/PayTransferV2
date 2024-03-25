import React, { useState } from "react";
import { Backdrop, Button, CircularProgress, Grid, styled } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../redux";
import { updateDialogDetails } from "../payTransferInterfaceSlice";
import { encodeToBase64 } from "../../_common/functionHelper";
import { swalConfirm, swalError, swalResultSuccess, swalWarning } from "../../_common";
import { useInquiryTransectionBank, useResultOfBankTranferInquiryGet } from "../payTransferInterfaceApi";
import { InquiryTransectionBankRequestDto } from "../../_common/components/apiClient/payTransferApi.client";

const detailsImage: string = "/images/icon/Detail.png";
const inquiryImage: string = "/images/icon/Inquiry.png";
const historyImage: string = "/images/icon/History.png";

const ButtonStyled = styled(Button)(() => ({
    backgroundColor: "#ffffff",
    color: "#000000",
    justifyContent: "flex-start",
    whiteSpace: "nowrap",
    " &:hover": {
        backgroundColor: "#1db0e6",
        color: "#ffffff",
    },
    "&:focus": {
        backgroundColor: "#1db0e6",
        color: "#ffffff",
    },
}));

type PayPopoverProps = {
    handleClose(): void;
};

const PayPopover = ({ handleClose }: PayPopoverProps) => {
    const dispatch = useAppDispatch();
    // const [isSearch, setIsSearch] = useState(false);
    const [resultCounter, setResultCounter] = useState(0);
    const { payPopover } = useAppSelector((state) => state.paytransferInterface);
    const { refCode, payListHeaderId, payListHeaderCode, payListStatusId, payListStatusName } = payPopover;

    const [open, setOpen] = useState(false);
    const handleCloseBd = () => {
        setOpen(false);
    };
    const handleOpenBd = () => {
        setOpen(true);
    };

    const imageStyle: React.CSSProperties = {
        width: "5vh",
    };

    const handleOpenDialog = () => {
        let payload = {
            payListHeaderCode: payListHeaderCode,
            payListStatusId: payListStatusId,
            payListStatusName: payListStatusName,
            isOpen: true,
        };

        handleClose();
        dispatch(updateDialogDetails(payload));
    };

    const handleInquiry = () => {
        swalConfirm("ยืนยันการทำรายการ?", "ยืนยันรายการเพื่อสอบถามรายการโอนกับทางธนาคาร", "ยืนยัน", "ยกเลิก").then(
            (res) => {
                if (res.isConfirmed) {
                    let payload: InquiryTransectionBankRequestDto = {
                        refCode: refCode ?? "",
                    };

                    inquiryTransectionBank(payload);
                }
            }
        );
    };

    const handleOpenTransaction = () => {
        const encodeId = encodeToBase64(payListHeaderId ?? "");

        const url = `/paytransfertransaction/${encodeId}`;
        window.open(url, "_blank");
        handleClose();
    };

    const handleInquirySuccess = (data: any) => {
        if (data) {
            // setIsSearch(true);
            handleOpenBd();
            resultBankTransfer(refCode ?? "");
            setResultCounter((prevCounter) => prevCounter + 1);
        }
    };

    const handleInquiryError = (err: any) => {
        swalError("Error", err);
    };

    const handleResultSuccess = (data: any) => {
        if (data) {
            const splitData = data?.message.split("/");
            const splitStatusName = splitData![0].split(" : ");
            let colorStyle = "";

            if (splitStatusName![1] == "สำเร็จ") colorStyle = "green";
            else colorStyle = "red";

            swalResultSuccess(
                "ผลลัพธ์การสอบถามรายการโอนจากธนาคาร",
                `${splitStatusName![0]} : <span style="color:${colorStyle};" }>${splitStatusName![1]}</span>`,
                splitData![1],
                "ตกลง"
            ).then((res) => {
                if (res.isConfirmed) {
                    handleClose();
                }
            });
        }
    };

    const handleResultError = () => {
        if (resultCounter < 4 && resultCounter !== 0) {
            handleOpenBd();
            setTimeout(() => {
                resultBankTransfer(refCode ?? "");
                setResultCounter((prevCounter) => prevCounter + 1);
            }, 2000);
        } else {
            swalWarning("ผลลัพธ์การสอบถามรายการโอนจากธนาคาร", "กรุณาตรวจสอบรายการใหม่ภายหลัง").then(() => {
                handleCloseBd();
            });
        }
    };

    const { mutate: inquiryTransectionBank, isLoading } = useInquiryTransectionBank(
        handleInquirySuccess,
        handleInquiryError
    );
    const { mutate: resultBankTransfer } = useResultOfBankTranferInquiryGet(handleResultSuccess, handleResultError);

    return (
        <Grid container direction="row" alignItems="center">
            <Grid item xs={12} lg={12}>
                <ButtonStyled
                    fullWidth
                    onClick={handleOpenDialog}
                    startIcon={<img src={detailsImage} alt="" style={imageStyle} />}
                >
                    รายละเอียด
                </ButtonStyled>
            </Grid>
            <Grid item xs={12} lg={12}>
                <ButtonStyled
                    fullWidth
                    onClick={handleInquiry}
                    startIcon={<img src={inquiryImage} alt="" style={imageStyle} />}
                >
                    สอบถามธนาคาร
                </ButtonStyled>
                <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading || open}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Grid>
            <Grid item xs={12} lg={12}>
                <ButtonStyled
                    fullWidth
                    onClick={handleOpenTransaction}
                    startIcon={<img src={historyImage} alt="" style={imageStyle} />}
                >
                    ประวัติการทำรายการ
                </ButtonStyled>
            </Grid>
        </Grid>
    );
};

export default PayPopover;
