export interface TickerInfoResult {
  id: string;
  original_tick: string;
  tick: string;
  max_supply: string;
  decimals: number;
  limit_per_mint: string;
  remaining_supply: string;
  burned_supply: string;
  is_self_mint: boolean;
  deploy_inscription_id: string;
  block_height: number;
}

export interface TickerInfoResponse {
  error: string | null;
  result?: TickerInfoResult;
  status?: "error";
}

export interface BalanceResult {
  overall_balance: string;
  available_balance: string;
  block_height: number;
  tick: string;
}

export interface BalanceResponse {
  error: string | null;
  result?: BalanceResult[];
  status?: "error";
}

export interface Order {
  status: string;
  state: string;
  paid: boolean;
  underpaid?: boolean;
  expired?: boolean;
  charge: Charge;
  fee: number;
  baseFee: number;
  chainFee: number;
  serviceFee: number;
  createdAt: number;
  orderType: string;
  receiveAddress: string;
  tx?: Transaction;
  files?: File[];
  sent?: string;
  id: string;
}

interface Charge {
  amount: number;
  hosted_checkout_url?: string;
  status: string;
}

interface Transaction {
  commit: string;
  fees: number;
  inscription: string;
  reveal: string;
}

interface File {
  name: string;
  size: number;
  type: string;
  url: string;
  completed?: boolean;
  inscriptionId?: string;
  processing?: boolean;
  s3Key?: string;
  sent?: string;
  status?: string;
  tx?: {
    inscription: string;
    reveal: string;
    totalFees: number;
    updatedAt: number;
  };
}
