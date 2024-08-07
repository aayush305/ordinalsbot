import { NextApiRequest, NextApiResponse } from "next";
import axiosInstance from "../../../app/lib/axiosInstance";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { address, ticker } = req.query;

  const params: {
    address: string;
    ticker?: string;
  } = {
    address: address as string,
  };

  if (ticker) params.ticker = ticker as string;

  try {
    const response = await axiosInstance.get(
      `/opi/v1/brc20/get_current_balance_of_wallet`,
      {
        params,
      }
    );
    res.status(200).json(response.data);
  } catch (error: any) {
    res.status(500).json({ status: "error", error: error.message });
  }
}
