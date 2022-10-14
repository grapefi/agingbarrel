import { useAccount, useContractWrite, useContractRead, useNetwork } from 'wagmi';

// constants
import { GRAPE, LOTTO } from '../constants';

export const useGrape = () => {
  const account = useAccount();
  const { chain } = useNetwork();

  const grapeContract = {
    addressOrName: GRAPE[chain?.id]?.address,
    contractInterface: GRAPE[chain?.id]?.abi,
  }

  const {
    writeAsync: writeApproveAsync,
  } = useContractWrite({
    ...grapeContract,
    functionName: 'approve',
  });

  const { data: balance } = !account ? { data: 0 } : useContractRead({
    ...grapeContract,
    functionName: 'balanceOf',
    args: [account?.address],
    watch: true,
  });

  const { data: lottoAllowance } = !account ? { data: 0 } : useContractRead({
    ...grapeContract,
    functionName: 'allowance',
    args: [account?.address, LOTTO[chain?.id]?.address],
    watch: true,
  });

  return {
    balance,
    lottoAllowance,
    writeApproveAsync,
  }
}

export default useGrape;
