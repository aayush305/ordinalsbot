import axios from "axios";

export const fetchData = async () => {
  try {
    const response = await axios.get(`/api/brc20/block-height`);
    return response.data;
  } catch (err: any) {
    return null;
  }
};
