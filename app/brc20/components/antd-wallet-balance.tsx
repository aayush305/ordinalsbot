"use client";

import React, { useState } from "react";
import {
  Card,
  Input,
  Button,
  Divider,
  Form,
  Typography,
  Grid,
  Row,
  Col,
} from "antd";
import { WalletOutlined } from "@ant-design/icons";
import axios from "axios";
import { BalanceResult } from "@/app/constants/types";

const AntdWalletBalance = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [ticker, setTicker] = useState("");
  const [data, setData] = useState<BalanceResult[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)

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
      <Row gutter={16} align={'bottom'} wrap>
        <Col sm={10} xs={18}>
          <Form.Item
            label="Wallet Address"
            validateStatus={error ? "error" : ""}
            help={error}
            required
          >
            <Input
              placeholder="Wallet Address"
              value={walletAddress}
              onChange={handleWalletAddressChange}
            />
          </Form.Item>
        </Col>
        <Col sm={10} xs={18}>
          <Form.Item label="Ticker">
            <Input
              placeholder="Ticker"
              value={ticker}
              onChange={handleTickerChange}
            />
          </Form.Item>
        </Col>
        <Col sm={4} className='mb-6' xs={18}>
          <Button type="primary" onClick={handleSearch} loading={loading}>
            Search
          </Button>
        </Col>
      </Row>
      {data?.length > 0 &&
        data.map((balance, index) => (
          <Card
            title={
              <span>
                <WalletOutlined /> Ticker: {balance.tick}
              </span>
            }
            bordered={false}
            style={{
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
            <div key={index}>
              <Typography.Paragraph>
                Overall Balance: {balance.overall_balance}
              </Typography.Paragraph>
              <Typography.Paragraph>
                Available Balance: {balance.available_balance}
              </Typography.Paragraph>
              <Typography.Paragraph>
                Block Height: {balance.block_height}
              </Typography.Paragraph>
            </div>
          </Card>
        ))}
    </>
  );
};

export default AntdWalletBalance;
