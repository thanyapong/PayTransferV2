import { Divider, Grid, LinearProgress, Typography, styled } from "@mui/material";
import { PayListHeaderXBankResponseDtoServiceResponse } from "../../_common/components/apiClient/payTransferApi.client";
import { numberWithCommas } from "../../_common/functionHelper";

const Header = styled(Typography)(() => ({
    fontSize: 14,
}));

const Detail = styled(Typography)(() => ({
    fontSize: 14,
    color: "#3199d0",
}));

type TransactionHeaderProps = {
    payListHeaderData: PayListHeaderXBankResponseDtoServiceResponse | undefined;
    payListHeaderLoading: boolean;
};

const TransactionHeader = ({ payListHeaderData, payListHeaderLoading }: TransactionHeaderProps) => {
    const {
        payListHeaderSourceTypeName,
        sendingBankName,
        sendingBankAccountNo,
        amount,
        receivingBankName,
        receivingBankAccountNo,
        receivingName,
    } = payListHeaderData?.data ?? {};

    return (
        <>
            <Typography fontWeight={"bold"}>รายละเอียดรายการ</Typography>
            <Divider sx={{ mt: 1 }} />
            {payListHeaderLoading ? (
                <LinearProgress sx={{ mt: 3 }}  />
            ) : (
                <>
                    <Grid container sx={{ mt: 3 }}>
                        <Grid
                            item
                            xs={4}
                            md={2}
                            lg={1}
                            sx={(theme) => ({
                                [theme.breakpoints.down("lg")]: {
                                    marginBottom: 1.9,
                                },
                            })}
                        >
                            <Header>แหล่งที่มา :</Header>
                        </Grid>
                        <Grid item xs={8} md={4} lg={3}>
                            <Detail>{payListHeaderSourceTypeName ?? "-"}</Detail>
                        </Grid>
                        <Grid
                            item
                            xs={4}
                            md={2}
                            lg={1}
                            sx={(theme) => ({
                                [theme.breakpoints.down("lg")]: {
                                    marginBottom: 1.9,
                                },
                            })}
                        >
                            <Header>ธนาคารผู้ส่ง :</Header>
                        </Grid>
                        <Grid item xs={8} md={4} lg={3}>
                            <Detail>{sendingBankName + " : " + sendingBankAccountNo}</Detail>
                        </Grid>
                        <Grid
                            item
                            xs={4}
                            md={2}
                            lg={1}
                            sx={(theme) => ({
                                [theme.breakpoints.down("lg")]: {
                                    marginBottom: 1.9,
                                },
                            })}
                        >
                            <Header>จำนวนเงิน :</Header>
                        </Grid>
                        <Grid item xs={8} md={4} lg={3}>
                            <Detail>{amount ? numberWithCommas(amount) : "-"}</Detail>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        sx={(theme) => ({
                            [theme.breakpoints.down("lg")]: {
                                mt: 0.3,
                            },
                            mt: 3,
                        })}
                    >
                        <Grid
                            item
                            xs={4}
                            md={2}
                            lg={1}
                            sx={(theme) => ({
                                [theme.breakpoints.down("lg")]: {
                                    marginBottom: 1.9,
                                },
                            })}
                        >
                            <Header>ธนาคารผู้รับ :</Header>
                        </Grid>
                        <Grid item xs={8} md={4} lg={3}>
                            <Detail>
                                {receivingBankName + " : " + receivingBankAccountNo + " : " + receivingName}
                            </Detail>
                        </Grid>
                    </Grid>
                </>
            )}
        </>
    );
};

export default TransactionHeader;
