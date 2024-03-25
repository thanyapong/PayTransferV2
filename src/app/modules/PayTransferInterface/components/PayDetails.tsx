import { useAppSelector } from "../../../../redux";
import { Grid, Typography, styled } from "@mui/material";
import { PayListHeaderXBankResponseDtoServiceResponse } from "../../_common/components/apiClient/payTransferApi.client";
import { numberWithCommas } from "../../_common/functionHelper";

const Header = styled(Typography)(() => ({
    fontSize: 14,
}));

const Detail = styled(Typography)(() => ({
    fontSize: 14,
    color: "#3199d0",
}));

type PayDetailProps = {
    payListHeaderData: PayListHeaderXBankResponseDtoServiceResponse | undefined;
};

const PayDetails = ({ payListHeaderData }: PayDetailProps) => {
    const { dialogDetail } = useAppSelector((state) => state.paytransferInterface);
    const { payListHeaderCode } = dialogDetail;

    const {
        payListHeaderSourceTypeName,
        amount,
        sendingBankName,
        sendingBankAccountNo,
        receivingBankName,
        receivingBankAccountNo,
        receivingName,
    } = payListHeaderData?.data ?? {};

    return (
        <>
            <Grid container direction="row" sx={{ mb: 2 }}>
                <Grid item xs={4} sm={3} lg={2}>
                    <Header>รหัสรายการต้นทาง :</Header>
                </Grid>
                <Grid item xs={8} sm={3} lg={10}>
                    <Detail>{payListHeaderSourceTypeName == "Claim" ? "-" : payListHeaderCode}</Detail>
                </Grid>
            </Grid>
            <Grid
                container
                direction="row"
                sx={(theme) => ({
                    [theme.breakpoints.down("sm")]: {
                        mb: 0,
                    },
                    mb: 2,
                })}
            >
                <Grid
                    item
                    xs={4}
                    sm={3}
                    lg={2}
                    sx={(theme) => ({
                        [theme.breakpoints.down("sm")]: {
                            marginBottom: 1.9,
                        },
                    })}
                >
                    <Header>แหล่งที่มา :</Header>
                </Grid>
                <Grid
                    item
                    xs={8}
                    sm={3}
                    lg={4}
                    sx={(theme) => ({
                        [theme.breakpoints.down("sm")]: {
                            marginBottom: 1.9,
                        },
                    })}
                >
                    <Detail>{payListHeaderSourceTypeName ?? "-"}</Detail>
                </Grid>
                <Grid
                    item
                    xs={4}
                    sm={3}
                    lg={2}
                    sx={(theme) => ({
                        [theme.breakpoints.down("sm")]: {
                            marginBottom: 1.9,
                        },
                    })}
                >
                    <Header>จำนวนเงิน :</Header>
                </Grid>
                <Grid
                    item
                    xs={8}
                    sm={3}
                    lg={4}
                    sx={(theme) => ({
                        [theme.breakpoints.down("sm")]: {
                            marginBottom: 1.9,
                        },
                    })}
                >
                    <Detail>{amount ? numberWithCommas(amount) : "-"}</Detail>
                </Grid>
            </Grid>
            <Grid
                container
                direction="row"
                sx={{ mb: 4 }}
            >
                <Grid
                    item
                    xs={4}
                    sm={3}
                    lg={2}
                    sx={(theme) => ({
                        [theme.breakpoints.down("sm")]: {
                            marginBottom: 1.9,
                        },
                    })}
                >
                    <Header>ธนาคารผู้ส่ง :</Header>
                </Grid>
                <Grid
                    item
                    xs={8}
                    sm={3}
                    lg={4}
                    sx={(theme) => ({
                        [theme.breakpoints.down("sm")]: {
                            marginBottom: 1.9,
                        },
                    })}
                >
                    <Detail>{sendingBankName + " : " + sendingBankAccountNo}</Detail>
                </Grid>
                <Grid
                    item
                    xs={4}
                    sm={3}
                    lg={2}
                    sx={(theme) => ({
                        [theme.breakpoints.down("sm")]: {
                            marginBottom: 1.9,
                        },
                    })}
                >
                    <Header>ธนาคารผู้รับ :</Header>
                </Grid>
                <Grid
                    item
                    xs={8}
                    sm={3}
                    lg={4}
                    sx={(theme) => ({
                        [theme.breakpoints.down("sm")]: {
                            marginBottom: 1.9,
                        },
                    })}
                >
                    <Detail>{receivingBankName + " : " + receivingBankAccountNo + " : " + receivingName}</Detail>
                </Grid>
            </Grid>
        </>
    );
};

export default PayDetails;
