"use client";

import React, { useState } from "react";
import { Button, Card, Form, Input, Space } from "antd";
import {
  TagOutlined,
  DatabaseOutlined,
  WalletOutlined,
  LineHeightOutlined,
  FireOutlined,
} from "@ant-design/icons";
import { TickerInfoResult } from "@/app/constants/types";
import axios from "axios";

const { Meta } = Card;

const AntdTicker = () => {
  const [filter, setFilter] = useState("");
  const [data, setData] = useState<TickerInfoResult>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
          title="Ant Design"
          bordered={false}
          style={{
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <Meta
            description={
              <>
                <p>
                  <strong>
                    <TagOutlined /> Ticker:
                  </strong>
                  {tick}
                </p>
                <p>
                  <strong>
                    <DatabaseOutlined /> Max Supply:
                  </strong>
                  {max_supply}
                </p>
                <p>
                  <strong>
                    <WalletOutlined /> Limit Per Mint:
                  </strong>
                  {limit_per_mint}
                </p>
                <p>
                  <strong>
                    <LineHeightOutlined /> Block Height:
                  </strong>
                  {block_height}
                </p>
                <p>
                  <strong>
                    <DatabaseOutlined /> Remaining Supply:
                  </strong>
                  {remaining_supply}
                </p>
                <p>
                  <strong>
                    <FireOutlined /> Burned Supply:
                  </strong>
                  {burned_supply}
                </p>
                <p>
                  <strong>Deploy Inscription ID:</strong>
                  <span
                    style={{
                      wordBreak: "break-all",
                      backgroundColor: "#f0f0f0",
                      padding: "4px",
                      borderRadius: "4px",
                    }}
                  >
                    {deploy_inscription_id}
                  </span>
                </p>
              </>
            }
          />
        </Card>
      );
    }
  };

  return (
    <>
      <Space style={{ marginBottom: "16px" }} align="start" wrap>
        <Form>
          <Form.Item
            label="Enter Ticker"
            required
            validateStatus={error ? "error" : ""}
            help={error}
          >
            <Input
              placeholder="Enter Ticker"
              value={filter}
              onChange={handleInputChange}
            />
          </Form.Item>
        </Form>
        <Button type="primary" onClick={handleSearch} loading={loading}>
          Search
        </Button>
      </Space>
      {data && renderTickerInfo()}
    </>
  );
};

export default AntdTicker;
