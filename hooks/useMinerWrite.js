import { useContractWrite, useNetwork } from 'wagmi';
// constants
import { MINER } from '../constants';

export const useMinerWrite = () => {
  const { chain } = useNetwork();

  const minerContract = {
    addressOrName: MINER[chain?.id]?.address,
    contractInterface: MINER[chain?.id]?.abi,
  }

  const { 
    writeAsync: writeDepositAsync,
  } = useContractWrite({
    ...minerContract,
    functionName: 'deposit',
  });

  const { 
    writeAsync: writeZapAndDepositAsync,
  } = useContractWrite({
    ...minerContract,
    functionName: 'zapAndDeposit',
  });

  const {
    writeAsync: writeClaimAsync,
  } = useContractWrite({
    ...minerContract,
    functionName: 'claim'
  });

  const {
    writeAsync: writeCompoundAsync,
  } = useContractWrite({
    ...minerContract,
    functionName: 'compound'
  });

  const {
    writeAsync: writeAssassinationAsync,
  } = useContractWrite({
    ...minerContract,
    functionName: 'assassinate'
  });

  return {
    writeAssassinationAsync,
    writeClaimAsync,
    writeCompoundAsync,
    writeDepositAsync,
    writeZapAndDepositAsync,
  }
}

export default useMinerWrite;