import { NextApiRequest, NextApiResponse } from "next";
import axiosInstance from "../../../app/lib/axiosInstance";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await axiosInstance.get(`/opi/v1/brc20/block_height`);
    res.status(200).json(response.data);
  } catch (error: any) {
    res.status(500).json({ status: "error", error: error.message });
  }
}
