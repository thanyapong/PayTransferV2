import { Divider, Grid, LinearProgress, Typography } from "@mui/material";
import { GetTransactionHistoryDtoResponseListServiceResponse } from "../../_common/components/apiClient/payTransferApi.client";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineOppositeContent, { timelineOppositeContentClasses } from "@mui/lab/TimelineOppositeContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import { formatDateString } from "../../_common/functionHelper";

type TransactionLogProps = {
    transactionData: GetTransactionHistoryDtoResponseListServiceResponse | undefined;
    isLoading: boolean;
};

const TransactionLog = ({ transactionData, isLoading }: TransactionLogProps) => {
    const { data } = transactionData ?? {};

    const handleSplit = (data: string | undefined) => {
        const splitData = data?.split("/");

        if (splitData?.length == 1) {
            return (
                <Typography variant="body2" color="text.secondary">
                    {splitData}
                </Typography>
            );
        } else {
            return (
                <Grid container item>
                    <Grid item xs={12} lg={12}>
                        <Typography variant="body2" color="text.secondary">
                            {splitData![0]}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} lg={12}>
                        <Typography variant="body2" color="text.secondary">
                            {splitData![1]}
                        </Typography>
                    </Grid>
                </Grid>
            );
        }
    };

    return (
        <>
            <Typography fontWeight={"bold"}>ประวัติการทำรายการ</Typography>
            <Divider sx={{ mt: 1 }} />
            <Grid container sx={{ mt: 3 }}>
                <Timeline
                    sx={{
                        [`& .${timelineOppositeContentClasses.root}`]: {
                            flex: 0.2,
                        },
                    }}
                >
                    {isLoading ? (
                        <LinearProgress sx={{ mt: 3 }} />
                    ) : data?.length !== 0 ? (
                        <>
                            {data?.map((item, index) => (
                                <Timeline key={index} position="right" sx={{ flex: 0.18 }}>
                                    <TimelineItem>
                                        <TimelineOppositeContent align="right">
                                            <Typography variant="body2">
                                                {formatDateString(item.createdDate?.toString())}
                                            </Typography>
                                            <Typography variant="body2">{item.createdByUser}</Typography>
                                        </TimelineOppositeContent>
                                        <TimelineSeparator>
                                            <TimelineDot color="primary" />
                                            {index != data.length - 1 ? (
                                                <TimelineConnector sx={{ height: 50 }} />
                                            ) : null}
                                        </TimelineSeparator>
                                        <TimelineContent>
                                            <Grid container justifyContent="flex-start">
                                                {handleSplit(item.detail)}
                                            </Grid>
                                        </TimelineContent>
                                    </TimelineItem>
                                </Timeline>
                            ))}
                        </>
                    ) : (
                        <Grid container justifyContent="center">
                            <Typography style={{ fontSize: 18, color: "#1db0e3" }}>ไม่พบประวัติการทำรายการ</Typography>
                        </Grid>
                    )}
                </Timeline>
            </Grid>
        </>
    );
};

export default TransactionLog;
