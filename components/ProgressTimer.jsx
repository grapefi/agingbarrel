import { useEffect, useState } from "react";
import useLottoRead from "../hooks/useLottoRead";

const secondsInHour = 3600;
const hoursInDay = 24;
const secondsInDay = secondsInHour * hoursInDay;

export default function ProgressTimer() {
  const [countdownToNewDay, setCountdownToNewDay] = useState(0);
  const [percentDayComplete, setPercentDayComplete] = useState(0);
  const [showDrawingStartingSoon, setShowDrawingStartingSoon] = useState(true);
  const { timeLeftUntilNewDay } = useLottoRead();

  useEffect(() => {
    if (!timeLeftUntilNewDay?.data) return;
    const secondsUntilNewDay = Number(timeLeftUntilNewDay?.data?.toString());

    if (secondsUntilNewDay === 0) {
      setShowDrawingStartingSoon(true);
    } else {
      setShowDrawingStartingSoon(false);
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
    }
  }, [timeLeftUntilNewDay?.internal?.dataUpdatedAt]);

  return (
    <div className="flex-1 my-auto align-bottom w-full">
      <div className="bg-gray-200 rounded-full dark:bg-gray-700">
        <div
          className="bg-brand-1 text-xs font-medium text-white text-center p-0.5 leading-none rounded-full"
          style={{ width: `${percentDayComplete}%` }}
        >
          {percentDayComplete.toFixed(2)}%
        </div>
      </div>
      {showDrawingStartingSoon == true ? (
        <div className="my-auto text-white text-center font-bold">
          Next Drawing starting soon
        </div>
      ) : (
        <div className="my-auto text-white text-center font-bold">
          {countdownToNewDay} until next Drawing
        </div>
      )}
    </div>
  );
}
