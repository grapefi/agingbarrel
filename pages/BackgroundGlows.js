import React from "react";
import background1 from "../public/img/celler_bg.png";
import Image from "next/image";

function BackgroundGlows() {
  return (
    <div style={{ minWidth: "100vw" }}>
      <span className="background-blur">
        <Image
          alt="background"
          src={background1}
          layout="fill"
          className="fixed-image"
        />
      </span>
    </div>
  );
}

export default BackgroundGlows;
