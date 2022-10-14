import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { utils } from "ethers";
// Components
import BurnWine from "./BurnWine";
import Card from "./utils/Card";
// Hooks
import useLottoRead from "../hooks/useLottoRead";
import usePairPrice from "../hooks/usePairPrice";

const secondsInHour = 3600;
const hoursInDay = 24;
const secondsInDay = secondsInHour * hoursInDay;

export default function LotteryPrize() {
  const {
    chanceToWinDaily,
    dailyDepositPot,
    largestDailyPot,
    monthlyWinnersPot,
    timeLeftUntilNewDay,
    timeLeftUntilNewMonth,
    userWinnings,
  } = useLottoRead();
  const [countdownToNewDay, setCountdownToNewDay] = useState(0);
  const [countdownToNewMonth, setCountdownToNewMonth] = useState(0);
  const [dailyDepositPotAmount, setDailyDepositPotAmount] = useState(0);
  const [largestDailyPotAmount, setLargestDailyPotAmount] = useState(0);
  const [percentDayComplete, setPercentDayComplete] = useState(0);
  const [percentMonthComplete, setPercentMonthComplete] = useState(0);
  const [monthlyWinnersPotAmount, setMonthlyWinnersPot] = useState(0);
  const [userWinningsAmount, setUserWinningsAmount] = useState(0);
  const [userTickets, setUserTickets] = useState(0);
  const [totalTickets, setTotalTickets] = useState(0);
  const wineMimLPPrice = usePairPrice();

  useEffect(() => {
    if (chanceToWinDaily?.isFetching) return;
    if (!chanceToWinDaily?.data) return;
    if (chanceToWinDaily?.data[0]?.toString() !== userTickets?.toString()) {
      setUserTickets(chanceToWinDaily?.data[0]);
    }
    if (chanceToWinDaily?.data[1]?.toString() !== totalTickets?.toString()) {
      setTotalTickets(chanceToWinDaily?.data[1]);
    }
  }, [chanceToWinDaily?.internal?.dataUpdatedAt]);

  useEffect(() => {
    if (!dailyDepositPot || !dailyDepositPot.data || dailyDepositPot.isFetching)
      return;
    setDailyDepositPotAmount(
      utils.formatEther(dailyDepositPot.data?.toString() || "0")
    );
  }, [dailyDepositPot?.internal?.dataUpdatedAt]);

  useEffect(() => {
    if (!largestDailyPot || !largestDailyPot.data || largestDailyPot.isFetching)
      return;
    setLargestDailyPotAmount(
      utils.formatEther(largestDailyPot.data?.toString() || "0")
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [largestDailyPot?.internal?.dataUpdatedAt]);

  useEffect(() => {
    if (
      !monthlyWinnersPot ||
      !monthlyWinnersPot.data ||
      monthlyWinnersPot.isFetching
    )
      return;
    setMonthlyWinnersPot(
      utils.formatEther(monthlyWinnersPot.data?.toString() || "0")
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthlyWinnersPot?.internal?.dataUpdatedAt]);

  useEffect(() => {
    if (!userWinnings || !userWinnings.data || userWinnings.isFetching) return;
    setUserWinningsAmount(
      utils.formatEther(userWinnings.data?.toString() || "0")
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userWinnings?.internal?.dataUpdatedAt]);

  useEffect(() => {
    if (!timeLeftUntilNewDay?.data) return;
    const secondsUntilNewDay = Number(timeLeftUntilNewDay?.data?.toString());

    // calc remaining time string. ex: "1h 42m 35s"
    let time = secondsUntilNewDay;
    const hoursUntilNewDay = Math.floor(time / 3600);
    time = time - hoursUntilNewDay * 3600;
    const minutesUntilNewDay = Math.floor(time / 60);
    time = time - minutesUntilNewDay * 60;
    const remainingSeconds = time;

    setCountdownToNewDay(
      `${hoursUntilNewDay}h ${minutesUntilNewDay}m ${remainingSeconds}s`
    );
    setPercentDayComplete((1 - secondsUntilNewDay / secondsInDay) * 100);
  }, [timeLeftUntilNewDay?.internal?.dataUpdatedAt]);

  useEffect(() => {
    if (!timeLeftUntilNewMonth?.data) return;
    const secondsUntilNewMonth = Number(
      timeLeftUntilNewMonth?.data?.toString()
    );
    // calc remaining time string. ex: "1h 42m 35s"
    let time = secondsUntilNewMonth;
    const daysUntilNewMonth = Math.floor(time / secondsInDay);
    time = time - daysUntilNewMonth * secondsInDay;
    const hoursUntilNewMonth = Math.floor(time / 3600);
    time = time - hoursUntilNewMonth * 3600;
    const minutesUntilNewMonth = Math.floor(time / 60);
    time = time - minutesUntilNewMonth * 60;
    const remainingSeconds = time;

    setCountdownToNewMonth(
      `${daysUntilNewMonth}d ${hoursUntilNewMonth}h ${minutesUntilNewMonth}m ${remainingSeconds}s`
    );
    setPercentMonthComplete(
      (1 - secondsUntilNewMonth / (secondsInDay * 30)) * 100
    );
  }, [timeLeftUntilNewMonth?.internal?.dataUpdatedAt]);

  return (
    <Card title="Lottery Prize" image="grape-xgrape.png">
      <div className="flex justify-between text-xl">
        <div>Daily Deposit Pot</div>
        <div style={{ textAlign: "right" }}>
          <CountUp end={dailyDepositPotAmount} decimals={2} separator="," />{" "}
          sVintage
          {wineMimLPPrice && (
            <div className="text-xs">
              ~${(dailyDepositPotAmount * wineMimLPPrice).toFixed(2)}
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-between text-xl">
        <div>Largest Daily Pot</div>
        <div style={{ textAlign: "right" }}>
          <CountUp end={largestDailyPotAmount} decimals={2} separator="," />{" "}
          sVintage
          {wineMimLPPrice && (
            <div className="text-xs">
              ~${(largestDailyPotAmount * wineMimLPPrice).toFixed(2)}
            </div>
          )}
        </div>
      </div>
      {/*<div className="flex justify-between text-xl">
        <div>Monthly Pot Amount</div>
        <div style={{ textAlign: "right" }}>
          <CountUp end={monthlyWinnersPotAmount} decimals={2} separator="," />{" "}
          sVintage
          {wineMimLPPrice && (
            <div className="text-xs">
              ~${(monthlyWinnersPotAmount * wineMimLPPrice).toFixed(2)}
            </div>
          )}
        </div>
      </div>*/}

      <div className="flex justify-between mt-5">
        <div>Next Daily Winner Drawing</div>
        <div>{countdownToNewDay}</div>
      </div>

      <div className="flex justify-center">
        <div className="w-full bg-slate-50 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-brand-1 h-2.5 rounded-full"
            style={{ width: percentDayComplete + "%" }}
          ></div>
        </div>
      </div>

{/*<div className="flex justify-between mt-4">
        <div>Next Monthly Winner Drawing</div>
        <div>{countdownToNewMonth}</div>
      </div>
      <div className="flex justify-center">
        <div className="w-full bg-slate-50 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-brand-1 h-2.5 rounded-full"
            style={{ width: percentMonthComplete + "%" }}
          ></div>
        </div>
      </div>*/}

      <div className="flex justify-between mt-4">
        <div>Burn Grape for Tickets (1 Grape each)</div>
      </div>
      <div className="flex mt-1">
        <BurnWine />
      </div>

      <div className="flex justify-between mt-4">
        <div>Your Lotto Tickets</div>
        <div>
          <CountUp end={userTickets} decimals={0} separator="," /> /{" "}
          <CountUp end={totalTickets} decimals={0} separator="," />
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <div className="grid grid-rows-2">
          <div  style={{ fontSize: userWinningsAmount > 0 ? '1.5rem' : '1rem', fontWeight: userWinningsAmount > 0 ? 'bold' : 'regular', color: userWinningsAmount > 0 ? '#1ac55e' : 'white',  }}>Your Lotto Winnings</div>
          <div className="text-sm opacity-75">
            Your winnings are sent to you automatically
          </div>
        </div>
        <div>
          <CountUp style={{ fontSize: userWinningsAmount > 0 ? '1.5rem' : '1rem', fontWeight: userWinningsAmount > 0 ? 'bold' : 'regular', color: userWinningsAmount > 0 ? '#1ac55e' : 'white',  }} end={userWinningsAmount} decimals={2} separator="," />
        </div>
      </div>
    </Card>
  );
}
