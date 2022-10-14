import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
// Components
import Connect from "./Connect";
import Buy from "./Buy";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function MenuTop() {
  const matches = useMediaQuery("(min-width:500px)");

  return (
    <div
      className="sticky top-0"
      style={{
        zIndex: 10,
        background: "transparent",
        backdropFilter: "blur(5px)",
        boxShadow: "50px 4px 26px -18px rgba(0,0,0,0.99) !important",
      }}
    >
      <div
        className="navbar"
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0.5rem",
          minHeight: "4rem",
          width: "100%",
        }}
      >
        <div className="flex-1">
          <a href="https://grapefinance.app">
            <Image
              src={matches ? "/img/logo-horizontal.png" : "/img/grape.png"}
              alt="Logo"
              width={matches ? 310 : 50}
              height={45}
              priority
            />
          </a>
        </div>
        <div className="flex-none mr-5">
          <a
            rel="noreferrer"
            target="_blank"
            href="https://grape-finance.gitbook.io/grape-finance-docs/unique-features/xgrape-grapevine/soda-press"
            className="app-btn inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            Docs
          </a>
        </div>
        <div className="flex-none mr-5">
          <Buy />
        </div>
        <div className="flex-none">
          <Connect />
        </div>
      </div>
    </div>
  );
}
