import { useAccount, useContractWrite, useContractRead, useNetwork } from 'wagmi';

// constants
import { MIM, MINER } from '../constants';

export const useToken = () => {
  const account = useAccount();
  const { chain } = useNetwork();

  const mimContract = {
    addressOrName: MIM[chain?.id]?.address,
    contractInterface: MIM[chain?.id]?.abi,
  }

  const {
    writeAsync: writeApproveAsync,
  } = useContractWrite({
    ...mimContract,
    functionName: 'approve',
  });

  const { data: balance } = !account ? { data: 0 } : useContractRead({
    ...mimContract,
    functionName: 'balanceOf',
    args: [account?.address],
    watch: true,
  });

  const { data: minerAllowance } = !account ? { data: 0 } : useContractRead({
    ...mimContract,
    functionName: 'allowance',
    args: [account?.address, MINER[chain?.id]?.address],
    watch: true,
  });

  return {
    balance,
    minerAllowance,
    writeApproveAsync,
  }
}

export default useToken;