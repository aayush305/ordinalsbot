import { NextApiRequest, NextApiResponse } from "next";
import axiosInstance from "@/app/lib/axiosInstance";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { orderId } = req.query;

  try {
    const response = await axiosInstance.get(`/order`, {
      params: { id: orderId },
    });
    res.status(200).json(response.data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
