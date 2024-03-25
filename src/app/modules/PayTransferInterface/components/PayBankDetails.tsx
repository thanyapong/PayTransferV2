import { Grid, Typography, styled } from "@mui/material";
import { PayListHeaderXBankResponseDtoServiceResponse } from "../../_common/components/apiClient/payTransferApi.client";

const Header = styled(Typography)(() => ({
    fontSize: 14,
}));

const Detail = styled(Typography)(() => ({
    fontSize: 14,
    color: "#3199d0",
}));

type PayBankDetailsProps = {
    payListHeaderData: PayListHeaderXBankResponseDtoServiceResponse | undefined;
};

const PayBankDetails = ({ payListHeaderData }: PayBankDetailsProps) => {
    const { payListHeaderSourceTypeName, ref1, bankTranferNo, bankStatusCode, bankDescription, bankDescriptionTh } =
        payListHeaderData?.data ?? {};

    return (
        <>
            <Grid container direction="row" sx={{ mb: 2 }}>
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
                    <Header>Ref :</Header>
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
                    <Detail>{ref1 ?? "-"}</Detail>
                </Grid>
                <Grid item xs={4} sm={3} lg={2}>
                    <Header>รหัสอ้างอิง :</Header>
                </Grid>
                <Grid item xs={8} sm={3} lg={4}>
                    <Detail>{bankTranferNo}</Detail>
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
                    <Header>รหัสสถานะ :</Header>
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
                    <Detail>{bankStatusCode}</Detail>
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
                    <Header>รายละเอียด :</Header>
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
                    <Detail>{bankDescription ?? "-"}</Detail>
                    <Detail style={{ marginTop: 5 }}>{bankDescriptionTh ? ": " + bankDescriptionTh : "-"}</Detail>
                </Grid>
            </Grid>
            <Grid
                container
                direction="row"
                sx={{ mb: 2 }}
            >
                <Grid item xs={4} sm={3} lg={2}>
                    <Header>รหัสรายการต้นทาง :</Header>
                </Grid>
                <Grid item xs={8} sm={3} lg={10}>
                    <Detail>{payListHeaderSourceTypeName}</Detail>
                </Grid>
            </Grid>
        </>
    );
};

export default PayBankDetails;
