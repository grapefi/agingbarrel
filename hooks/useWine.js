import { useAccount, useContractWrite, useContractRead, useNetwork } from 'wagmi';

// constants
import { WINE, LOTTO, MINER } from '../constants';

export const useWine = () => {
  const account = useAccount();
  const { chain } = useNetwork();

  const wineContract = {
    addressOrName: WINE[chain?.id]?.address,
    contractInterface: WINE[chain?.id]?.abi,
  }

  const {
    writeAsync: writeApproveAsync,
  } = useContractWrite({
    ...wineContract,
    functionName: 'approve',
  });

  const { data: balance } = !account ? { data: 0 } : useContractRead({
    ...wineContract,
    functionName: 'balanceOf',
    args: [account?.address],
    watch: true,
  });

  const { data: minerAllowance } = !account ? { data: 0 } : useContractRead({
    ...wineContract,
    functionName: 'allowance',
    args: [account?.address, MINER[chain?.id]?.address],
    watch: true,
  });

  const { data: lottoAllowance } = !account ? { data: 0 } : useContractRead({
    ...wineContract,
    functionName: 'allowance',
    args: [account?.address, LOTTO[chain?.id]?.address],
    watch: true,
  });

  return {
    balance,
    lottoAllowance,
    minerAllowance,
    writeApproveAsync,
  }
}

export default useWine;