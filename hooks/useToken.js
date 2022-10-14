import { useAccount, useContractWrite, useContractRead, useNetwork } from 'wagmi';

// constants
import { TOKEN, MINER } from '../constants';

export const useToken = () => {
  const account = useAccount();
  const { chain } = useNetwork();

  const tokenContract = {
    addressOrName: TOKEN[chain?.id]?.address,
    contractInterface: TOKEN[chain?.id]?.abi,
  }

  const { 
    isLoading: approvalIsLoading,
    writeAsync: writeApproveAsync,
  } = useContractWrite({
    ...tokenContract,
    functionName: 'approve',
  });

  const { data: balance } = !account ? { data: 0 } : useContractRead({
    ...tokenContract,
    functionName: 'balanceOf',
    args: [account?.address],
    watch: true,
  });

  const { data: minerAllowance } = !account ? { data: 0 } : useContractRead({
    ...tokenContract,
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