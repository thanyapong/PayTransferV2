import { useEffect } from 'react';
import MainPaper from '../../_common/components/MainDesign/MainPaper';
import PaySearch from '../components/PaySearch';
import PayTable from '../components/PayTable';
import { useAppDispatch } from '../../../../redux';
import { reset } from '../payTransferInterfaceSlice';

const PaytransferInterfacePage = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {

      return () => {
        dispatch(reset());
      };
    }, []);


    return (
      <>
        <MainPaper>
            <PaySearch/>
        </MainPaper>
        <MainPaper>
          <PayTable/>
        </MainPaper>
      </>
    );
};

export default PaytransferInterfacePage;