import { Order } from "../constants/types";

export const fetchOrder = async (orderId: string) => {
  try {
    const response = await fetch(`/api/order/${orderId}`);
    if (!response.ok) {
      throw new Error(
        `Error fetching order ${orderId}: ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    return null;
  }
};

export const fetchOrders = async (orderIds: string[]): Promise<Order[]> => {
  const orders = await Promise.all(
    orderIds.map((orderId) => fetchOrder(orderId))
  );
  return orders.filter((order) => order !== null) as Order[];
};
