import React from "react";
import Image from 'next/image'
import grapeImg from "../public/img/grape.png";
import wineImg from "../public/img/gshare.png";
import vintageImg from "../public/img/vintage-token.png";
import gbondImg from "../public/img/gbond.png";

export default function BackgroundDecoration() {

  function randomNumberInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const grapeRandomPosY = randomNumberInRange(70, 150);
  const wineRandomPosY = randomNumberInRange(70, 200);
  const gBondRandomPosY = randomNumberInRange(0, 100);
  const vintageRandomPosY = randomNumberInRange(0, 200);

  const grapeRandomPosX = randomNumberInRange(0, 300);
  const wineRandomPosX = randomNumberInRange(0, 250);
  const gBondRandomPosX = randomNumberInRange(0, 200);
  const vintageRandomPosX = randomNumberInRange(0, 250);

  const grapeRandomRotate = randomNumberInRange(-20, 20);
  const wineRandomRotate = randomNumberInRange(-20, 20);
  const gBondRandomRotate = randomNumberInRange(-20, 20);
  const vintageRandomRotate = randomNumberInRange(-20, 20);

  const grapeRandomScale = randomNumberInRange(1, 2.3);
  const wineRandomScale = randomNumberInRange(1, 2.5);
  const gBondRandomScale = randomNumberInRange(1, 2.5);
  const vintageRandomScale = randomNumberInRange(1, 2.7);

  return (
    <>
      <div
        className="background-image-1"
        style={{
          top: `${grapeRandomPosY}px`,
          right: `${grapeRandomPosX}px`,
          transform: `rotate(${grapeRandomRotate}deg) scale(${grapeRandomScale})`,
        }}
      >
        <Image alt="grape" src={grapeImg} width={70} height={70} />
      </div>
      <div
        className="background-image-2"
        style={{
          top: `${wineRandomPosY}px`,
          left: `${wineRandomPosX}px`,
          transform: `rotate(${wineRandomRotate}deg) scale(${wineRandomScale})`,
        }}
      >
        <Image alt="wine" src={wineImg} width={70} height={70} />
      </div>
      <div
        className="background-image-3"
        style={{
          bottom: `${gBondRandomPosY}px`,
          right: `${gBondRandomPosX}px`,
          transform: `rotate(${gBondRandomRotate}deg) scale(${gBondRandomScale})`,
        }}
      >
        <Image alt="gbond" src={vintageImg} width={70} height={70} />
      </div>
      <div
        className="background-image-4"
        style={{
          bottom: `${vintageRandomPosY}px`,
          left: `${vintageRandomPosX}px`,
          transform: `rotate(${vintageRandomRotate}deg) scale(${vintageRandomScale})`,
        }}
      >
        <Image alt="vintage" src={gbondImg} width={70} height={70} />
      </div>
    </>
  );
}
