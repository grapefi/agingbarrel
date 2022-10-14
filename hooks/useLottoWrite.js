import { useAccount, useContractWrite, useNetwork } from 'wagmi';

// constants
import { LOTTO } from '../constants';

export const useLottoRead = () => {
  const { chain } = useNetwork();
  const account = useAccount();

  const lottoContract = {
    addressOrName: LOTTO[chain?.id]?.address,
    contractInterface: LOTTO[chain?.id]?.abi,
  }

  const { 
    writeAsync: writeBurnWineAsync,
  } = useContractWrite({
    ...lottoContract,
    functionName: 'burnGRAPE',
  });

  return {
    writeBurnWineAsync
  }
}

export default useLottoRead;