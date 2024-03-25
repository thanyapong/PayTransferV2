import { Button, Chip, DialogContent, DialogTitle, Divider, Grid, Typography, styled, useTheme } from "@mui/material";
import { Dialog, useMediaQuery } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../redux";
import { updateDialogDetails } from "../payTransferInterfaceSlice";
import { payListStatusSetStyle } from "../../_common/functionHelper";
import PayDetails from "./PayDetails";
import { usePayTransferListHeaderGet } from "../payTransferInterfaceApi";
import PayBankDetails from "./PayBankDetails";
import PayDialogTable from "./PayDialogTable";

const DialogTitleStyled = styled(DialogTitle)(() => ({
    backgroundColor: "#f2f2f2",
}));

const CloseButtonStyled = styled(Button)(() => ({
    color: "#1DB0E6",
    borderColor: "#1DB0E6",
    backgroundColor: "#ffffff",
}));

const PayDialog = () => {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const { payPopover, dialogDetail } = useAppSelector((state) => state.paytransferInterface);
    const { refCode } = payPopover;
    const { isOpen, payListStatusId, payListStatusName } = dialogDetail;

    const { data: payListHeaderData } = usePayTransferListHeaderGet(refCode ?? '');

    const handleClose = () => {
        let payload = {
            payListHeaderCode: "",
            payListStatusId: 0,
            payListStatusName: "",
            isOpen: false,
        };

        dispatch(updateDialogDetails(payload));
    };

    return (
        <Dialog open={isOpen} fullScreen={fullScreen} fullWidth maxWidth={"md"}>
            <DialogTitle>
                <Grid container justifyContent={"space-between"} alignItems={"center"}>
                    <Grid item xs={8} lg={8}>
                        <Typography fontWeight={"bold"}>รายละเอียดรายการ</Typography>
                    </Grid>
                    <Grid container justifyContent={"flex-end"} alignItems={"center"} item xs={4} sm={4} md={4} lg={4}>
                        <Chip color={payListStatusSetStyle(payListStatusId ?? 0)} label={payListStatusName}/>
                    </Grid>
                </Grid>
            </DialogTitle>
            <Divider/>
            <DialogContent>
                <PayDetails payListHeaderData = { payListHeaderData } />
                <Typography fontWeight={"bold"} sx={{ mb: 2 }}>รายละเอียดธนาคาร</Typography>
                <Divider sx={{ mb: 2 }}/>
                <PayBankDetails payListHeaderData = { payListHeaderData } />
                <PayDialogTable/>
            </DialogContent>
            <DialogTitleStyled>
                <Grid container justifyContent="center">
                    <Grid item xs={8} sm={6} md={4} lg={2}>
                        <CloseButtonStyled variant="outlined" size="large" fullWidth onClick={handleClose}>
                            ปิด
                        </CloseButtonStyled>
                    </Grid>
                </Grid>
            </DialogTitleStyled>
        </Dialog>
    );
};

export default PayDialog;
