// app/brc20/page.tsx
"use client"

import { useEffect, useState } from "react";
import AntdTicker from "./components/antd-ticker";
import AntdWalletBalance from "./components/antd-wallet-balance";
import MuiTicker from "./components/mui-ticker";
import MuiWalletBalance from "./components/mui-wallet-balance";
import { fetchData } from "./fetchData";

const BRC20 = () => {
  const [blockHeight, setBlockHeight] = useState(null);

  useEffect(() => {
    const getBlockHeight = async () => {
      const data = await fetchData();
      setBlockHeight(data);
    };

    getBlockHeight();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-purple-800 p-8">
      <div className="bg-gray-100 rounded-lg shadow-lg p-6 mb-4">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-800">
        Current Block Height
          {blockHeight && (
            <p className="text-center text-lg text-blue-600 mt-4">
               {blockHeight}
            </p>
          )}
        </h2>
      </div>
      <div className="bg-gray-100 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-800">
          BRC20 Ticker Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4">
          <div>
            <AntdTicker />
          </div>
          <div className="flex justify-center items-center">
            <div className="h-full w-px bg-gray-300"></div>
          </div>
          <div>
            <MuiTicker />
          </div>
        </div>
      </div>

      <div className="bg-gray-100 rounded-lg shadow-lg p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-800">
          Wallet Balance Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4">
          <div>
            <AntdWalletBalance />
          </div>
          <div className="flex justify-center items-center">
            <div className="h-full w-px bg-gray-300"></div>
          </div>
          <div>
            <MuiWalletBalance />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BRC20;
