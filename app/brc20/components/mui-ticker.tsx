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
import StorageIcon from "@mui/icons-material/Storage";
import MintIcon from "@mui/icons-material/AccountBalanceWallet";
import HeightIcon from "@mui/icons-material/Height";
import BurnIcon from "@mui/icons-material/Fireplace";
import { TickerInfoResponse, TickerInfoResult } from "@/app/constants/types";
import axios from "axios";

const MuiTicker = () => {
  const [filter, setFilter] = useState("");
  const [data, setData] = useState<TickerInfoResult>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const titleStyle = {
    color: "#1976d2",
    fontWeight: "bold",
  };

  const handleInputChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    setFilter(event.target.value);
  };

  const handleSearch = async () => {
    setLoading(true);
    if (!filter.trim()) {
      setError("Please enter a ticker to search.");
      setData(undefined);
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(`/api/brc20/${filter}`);
      setData(response.data.result);
      setError(null);
    } catch (err: any) {
      setError(err.response.data.error);
      setData(undefined);
    }
    setLoading(false);
  };

  const renderTickerInfo = () => {
    if (data) {
      const {
        tick,
        max_supply,
        limit_per_mint,
        block_height,
        remaining_supply,
        burned_supply,
        deploy_inscription_id,
      } = data;
      return (
        <Card
          variant="outlined"
          sx={{ minWidth: 275, borderRadius: 2, boxShadow: 3, padding: 2 }}
        >
          <CardContent>
            <Grid xs={12}>
              <Typography variant="h5" sx={titleStyle}>
                Tick:
              </Typography>
              <Typography variant="h5">{tick}</Typography>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" sx={titleStyle}>
                  <StorageIcon /> Max Supply:
                </Typography>
                <Typography variant="body1">{max_supply}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" sx={titleStyle}>
                  <MintIcon /> Limit Per Mint:
                </Typography>
                <Typography variant="body1">{limit_per_mint}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" sx={titleStyle}>
                  <HeightIcon /> Block Height:
                </Typography>
                <Typography variant="body1">{block_height}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" sx={titleStyle}>
                  <StorageIcon /> Remaining Supply:
                </Typography>
                <Typography variant="body1">{remaining_supply}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" sx={titleStyle}>
                  <BurnIcon /> Burned Supply:
                </Typography>
                <Typography variant="body1">{burned_supply}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" sx={titleStyle}>
                  Deploy Inscription ID:
                </Typography>
                <Box
                  sx={{
                    wordBreak: "break-all",
                    backgroundColor: "#f0f0f0",
                    padding: 1,
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="body1">
                    {deploy_inscription_id}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      );
    }
  };

  return (
    <>
      <Grid container spacing={2} sx={{ marginBottom: "16px" }}>
        <Grid item xs={10} sm={5}>
          <TextField
            fullWidth
            label="Enter Ticker"
            variant="outlined"
            value={filter}
            size="small"
            onChange={handleInputChange}
            error={!!error}
            helperText={error}
          />
        </Grid>
        <Grid item xs={10} sm={3}>
          <Button variant="contained" color="primary" onClick={handleSearch} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Search"}
          </Button>
        </Grid>
      </Grid>
      {data && renderTickerInfo()}
    </>
  );
};

export default MuiTicker;
