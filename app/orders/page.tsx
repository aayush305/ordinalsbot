"use client";

import { useState, useEffect } from "react";
import { Grid, Typography, TextField, Button, Box, CircularProgress } from "@mui/material";
import { fetchOrder, fetchOrders } from "./fetchData";
import { Order } from "../constants/types";
import OrderComponent from "./components/order";

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [newOrderId, setNewOrderId] = useState<string>("");

  useEffect(() => {
    const orderIds = [
      "39c9bdcf-6459-4509-b7a6-7138ac826378",
      "7d138fda-001c-4421-b1df-cbb5b8571d20",
      "8bb1d29e-171a-4a63-9b38-c5ee3e7fe2e1",
      "800fa3c4-7004-43e8-823e-928a2e5c30a0",
    ];
    const getOrders = async () => {
      setLoading(true);
      const fetchedOrders = await fetchOrders(orderIds);
      setOrders(fetchedOrders);
      setLoading(false);
    };

    getOrders();
  }, []);

  const handleAddOrder = async () => {
    if (!newOrderId) {
      return;
    }
    setLoading(true);
    const orderRes = await fetchOrder(newOrderId);
    setOrders([orderRes, ...orders]);
    setNewOrderId("");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-purple-800 p-8">
      <Typography variant="h4" component="h1" gutterBottom>
        Orders
      </Typography>
      <Box display="flex" alignItems="center" mb={2}>
        <TextField
          label="Order ID"
          value={newOrderId}
          onChange={(e) => setNewOrderId(e.target.value)}
          variant="outlined"
          size="small"
          sx={{ marginRight: 2 }}
        />
        <Button variant="contained" onClick={handleAddOrder}  disabled={loading}>
        {loading ? <CircularProgress size={24} /> : "Show"}
        </Button>
      </Box>
      <Grid container spacing={3}>
        {orders.map((order) => (
          <Grid item sm={12} md={6} xl={4} key={order.id}>
            <OrderComponent order={order} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Orders;
