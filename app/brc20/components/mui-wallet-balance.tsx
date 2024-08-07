"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Divider,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import axios from "axios";
import { BalanceResult } from "@/app/constants/types";

const MuiWalletBalance = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [ticker, setTicker] = useState("");
  const [data, setData] = useState<BalanceResult[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleWalletAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setWalletAddress(e.target.value);
  };

  const handleTickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTicker(e.target.value);
  };

  const handleSearch = async () => {
    setLoading(true);
    if (!walletAddress.trim()) {
      setError("Please enter a wallet address.");
      setData([]);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`/api/brc20/wallet-balance`, {
        params: { address: walletAddress, ticker: ticker || undefined },
      });
      setData(response.data.result);
      setError("");
    } catch (err: any) {
      setError(err.response.data.error);
      setData([]);
    }
    setLoading(false);
  };

  return (
    <>
      <Grid container spacing={1} alignItems="center" sx={{ mb: 2 }}>
        <Grid item xs={10} sm={5}>
          <TextField
            label="Wallet Address"
            variant="outlined"
            value={walletAddress}
            onChange={handleWalletAddressChange}
            error={!!error}
            helperText={error}
            size="small"
          />
        </Grid>
        <Grid item xs={10} sm={5}>
          <TextField
            label="Ticker (Optional)"
            variant="outlined"
            value={ticker}
            onChange={handleTickerChange}
            size="small"
          />
        </Grid>
        <Grid item xs={10} sm={2}>
          <Button variant="contained" color="primary" onClick={handleSearch} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Search"}
          </Button>
        </Grid>
      </Grid>

      {data?.length > 0 &&
        data.map((balance, index) => (
          <Card
            variant="outlined"
            sx={{
              minWidth: 275,
              borderRadius: 2,
              boxShadow: 3,
              padding: 2,
              marginBottom: 1,
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                component="div"
                sx={{ mb: 2, color: "#1976d2", fontWeight: "bold" }}
              >
                <AccountBalanceWalletIcon /> Ticker: {balance.tick}
              </Typography>
              <Divider sx={{ my: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12} key={index}>
                  <Typography variant="body1">
                    Overall Balance: {balance.overall_balance}
                  </Typography>
                  <Typography variant="body1">
                    Available Balance: {balance.available_balance}
                  </Typography>
                  <Typography variant="body1">
                    Block Height: {balance.block_height}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
    </>
  );
};

export default MuiWalletBalance;
