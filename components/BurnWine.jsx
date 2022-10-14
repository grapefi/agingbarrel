import { useContext, useEffect, useMemo, useState } from "react";
import { BigNumber, constants, utils } from "ethers";
import { useAccount, useNetwork } from "wagmi";
// Components
import LoadingSpinner from "./utils/LoadingSpinner";
// Context
import NotificationContext from "../context/NotificationContext";
// Constants
import { LOTTO } from "../constants";
// Hooks
import useWine from "../hooks/useWine";
import useGrape from "../hooks/useGrape";
import useLottoWrite from "../hooks/useLottoWrite";

const WINE_PER_BATCH = 10;

export default function BurnWine () {
  // context
  const { popNotification } = useContext(NotificationContext);
  // hooks
  const account = useAccount();
  const { chain } = useNetwork();
  const { writeBurnWineAsync } = useLottoWrite();
  const { balance: wineBalanceOf, lottoAllowance: wineLottoAllowance, writeApproveAsync: approveWine } = useGrape();
  // state
  const [approvalIsLoading, setApprovalIsLoading] = useState(false);
  const [batchAmount, setBatchAmount] = useState('');
  const [burnIsLoading, setBurnIsLoading] = useState(false);
  const [btnClass, setBtnClass] = useState('app-btn w-full');
  const [hasSufficientAllowance, setHasSufficientAllowance] = useState(false);

  const burnAmountWei = useMemo(() => {
    if (!batchAmount) return '0';
    return utils.parseEther((batchAmount * WINE_PER_BATCH).toString());
  }, [batchAmount]);

  const numWineToBurn = useMemo(() => {
    if (!batchAmount) return '';
    return (batchAmount * WINE_PER_BATCH) + ' Grape'
  }, [batchAmount]);

  const handleBatchAmountChanged = (e) => {
    console.log(Number(e.target.value))
    if (isNaN(Number(e.target.value))) return;
    setBatchAmount(e.target.value);
  }

  useEffect(() => {
    const className = 'app-btn w-full';
    if (!account) className += ' btn-disabled';
    setBtnClass(className);
  }, [account, hasSufficientAllowance]);

  useEffect(() => {
    if (!wineLottoAllowance) return setHasSufficientAllowance(false);
    const bnMinerAllowance = BigNumber.from(wineLottoAllowance);
    if (bnMinerAllowance.eq(0)) return setHasSufficientAllowance(false);
    const bnDepositAmount = BigNumber.from(burnAmountWei);
    setHasSufficientAllowance(bnMinerAllowance.gte(bnDepositAmount));
  }, [wineLottoAllowance]);

  const approve = async () => {
    setApprovalIsLoading(true);
    try {
      const req = await approveWine({
        args: [LOTTO[chain?.id]?.address, constants.MaxUint256]
      });
      popNotification({
        type: 'success',
        title: 'Approval Submitted',
        description: `View on ${chain?.blockExplorers.default.name}`,
        link: `${chain?.blockExplorers.default.url}/tx/${req.hash}`
      });
      const tx = await req.wait();
      popNotification({
        type: 'success',
        title: 'Approval Complete',
        description: `View on ${chain?.blockExplorers.default.name}`,
        link: `${chain?.blockExplorers.default.url}/tx/${tx.transactionHash}`
      });
      setHasSufficientAllowance(true);
    } catch (e) {
      popNotification({
        type: 'error',
        title: 'Approval Error',
        description: e.toString()
      });
    }
    
    setApprovalIsLoading(false);
  }

  const burn = async () => {
    if (burnIsLoading) return;
    setBurnIsLoading(true);
    console.log({ batchAmount })
    try {
      const req = await writeBurnWineAsync({
        args: batchAmount
      })
      popNotification({
        type: 'success',
        title: 'Burn Submitted',
        description: `View on ${chain?.blockExplorers.default.name}`,
        link: `${chain?.blockExplorers.default.url}/tx/${req.hash}`
      });
      const tx = await req.wait();
      popNotification({
        type: 'success',
        title: 'Burn Complete',
        description: `View on ${chain?.blockExplorers.default.name}`,
        link: `${chain?.blockExplorers.default.url}/tx/${tx.transactionHash}`
      });
    } catch (e) {
      popNotification({
        type: 'error',
        title: 'Burn Error',
        description: e.toString()
      });
    }
    setBurnIsLoading(false);
    setBatchAmount(0);
  }


  return (
    <div className="w-full">
      { !hasSufficientAllowance
        ?
          <button 
            className={btnClass}
            onClick={() => approve()}
          >
            { approvalIsLoading 
              ? <LoadingSpinner text="Approving"/>
              : `Approve`
            }
          </button>
        :
        <>
          <div className="grid grid-cols-1 gap-2">
            <div className="text-sm opacity-75">
              Burn batches of {WINE_PER_BATCH} Grape in exchange for 10 lotto tickets
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
            <input 
              type="text" 
              name="burn" 
              id="burn" 
              value={batchAmount}
              onChange={handleBatchAmountChanged}
              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 sm:text-sm text-right text-slate-500 border-gray-300 rounded-md"
              placeholder="Number of batches"
            />
            <button 
              className={btnClass}
              onClick={() => burn()}
            >
              { burnIsLoading
                ? <LoadingSpinner text="Burning"/>
                : <span>Burn {numWineToBurn}</span>
              }
            </button>
          </div>
        </>
      }
    </div>
  );
}
