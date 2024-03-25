import MainPaper from '../../_common/components/MainDesign/MainPaper';
import TransactionHeader from '../components/TransactionHeader';
import { useParams } from 'react-router-dom';
import { usePayTransferListHeaderGet, useTransactionHistoryGet } from '../payTransferInterfaceApi';
import { decodeFromBase64 } from '../../_common/functionHelper';
import TransactionLog from '../components/TransactionLog';

const PayTransferTransactionPage = () => {
    const { refCode } = useParams();

    const decodeRefCode = decodeFromBase64(refCode ?? "");

    const { data: payListHeaderData, isLoading: payListHeaderLoading } = usePayTransferListHeaderGet(decodeRefCode ?? '');

    const { data: transactionData, isLoading: transactionDataLoading } = useTransactionHistoryGet(decodeRefCode ?? '');

    return (
        <>
            <MainPaper>
                <TransactionHeader payListHeaderData = { payListHeaderData } payListHeaderLoading = { payListHeaderLoading } />
            </MainPaper>
            <MainPaper>
                <TransactionLog transactionData = { transactionData } isLoading = { transactionDataLoading } />
            </MainPaper>
        </>
    );
};

export default PayTransferTransactionPage;