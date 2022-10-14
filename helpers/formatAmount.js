import { utils } from 'ethers';

const formatAmount = ({ amount, maxDigits, minDigits }) => {
  if (!amount) return 0;
  return Number(utils.formatEther(amount)).toLocaleString([], {
    maximumFractionDigits: maxDigits ?? 6,
    minimumFractionDigits: minDigits ?? 0
  });
}

export default formatAmount;