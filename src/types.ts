import type { TransactionMeta } from '@metamask/transaction-controller';

/** API */
export enum APIType {
  'GET_FEES',
  'ESTIMATE_GAS',
  'SUBMIT_TRANSACTIONS',
  'CANCEL',
  'BATCH_STATUS',
  'LIVENESS',
}

/** SmartTransactions */
export enum SmartTransactionMinedTx {
  NOT_MINED = 'not_mined',
  SUCCESS = 'success',
  CANCELLED = 'cancelled',
  REVERTED = 'reverted',
  UNKNOWN = 'unknown',
}

export enum SmartTransactionCancellationReason {
  WOULD_REVERT = 'would_revert',
  TOO_CHEAP = 'too_cheap',
  DEADLINE_MISSED = 'deadline_missed',
  INVALID_NONCE = 'invalid_nonce',
  USER_CANCELLED = 'user_cancelled',
  NOT_CANCELLED = 'not_cancelled',
  PREVIOUS_TX_CANCELLED = 'previous_tx_cancelled',
}

export enum SmartTransactionStatuses {
  PENDING = 'pending',
  SUCCESS = 'success',
  REVERTED = 'reverted',
  UNKNOWN = 'unknown',
  CANCELLED = 'cancelled',
  CANCELLED_WOULD_REVERT = 'cancelled_would_revert',
  CANCELLED_TOO_CHEAP = 'cancelled_too_cheap',
  CANCELLED_DEADLINE_MISSED = 'cancelled_deadline_missed',
  CANCELLED_INVALID_NONCE = 'cancelled_invalid_nonce',
  CANCELLED_USER_CANCELLED = 'cancelled_user_cancelled',
  CANCELLED_PREVIOUS_TX_CANCELLED = 'cancelled_previous_tx_cancelled',
  RESOLVED = 'resolved',
}

export enum ClientId {
  Mobile = 'mobile',
  Extension = 'extension',
}

export const cancellationReasonToStatusMap = {
  [SmartTransactionCancellationReason.WOULD_REVERT]:
    SmartTransactionStatuses.CANCELLED_WOULD_REVERT,
  [SmartTransactionCancellationReason.TOO_CHEAP]:
    SmartTransactionStatuses.CANCELLED_TOO_CHEAP,
  [SmartTransactionCancellationReason.DEADLINE_MISSED]:
    SmartTransactionStatuses.CANCELLED_DEADLINE_MISSED,
  [SmartTransactionCancellationReason.INVALID_NONCE]:
    SmartTransactionStatuses.CANCELLED_INVALID_NONCE,
  [SmartTransactionCancellationReason.USER_CANCELLED]:
    SmartTransactionStatuses.CANCELLED_USER_CANCELLED,
  [SmartTransactionCancellationReason.PREVIOUS_TX_CANCELLED]:
    SmartTransactionStatuses.CANCELLED_PREVIOUS_TX_CANCELLED,
};

export type SmartTransactionsStatus = {
  error?: string;
  cancellationFeeWei: number;
  cancellationReason?: SmartTransactionCancellationReason;
  deadlineRatio: number;
  minedHash: string;
  minedTx: SmartTransactionMinedTx;
  isSettled: boolean;
  duplicated?: boolean;
  timedOut?: boolean;
  proxied?: boolean;
};

export type SmartTransaction = {
  uuid: string;
  txHash?: string;
  chainId?: string;
  destinationTokenAddress?: string;
  destinationTokenDecimals?: string;
  destinationTokenSymbol?: string;
  history?: any;
  nonceDetails?: any;
  origin?: string;
  preTxBalance?: string;
  status?: string;
  statusMetadata?: SmartTransactionsStatus;
  sourceTokenSymbol?: string;
  swapMetaData?: any;
  swapTokenValue?: string;
  time?: number; // @deprecated We should use creationTime instead.
  creationTime?: number;
  txParams?: any;
  type?: string;
  confirmed?: boolean;
  cancellable?: boolean;
  accountHardwareType?: string;
  accountType?: string;
  deviceModel?: string;
  transactionId?: string; // It's an ID for a regular transaction from the TransactionController.
};

export type Fee = {
  maxFeePerGas: number;
  maxPriorityFeePerGas: number;
};

export type IndividualTxFees = {
  fees: Fee[];
  cancelFees: Fee[];
  feeEstimate: number;
  gasLimit: number;
  gasUsed: number;
};

export type Fees = {
  approvalTxFees: IndividualTxFees | null;
  tradeTxFees: IndividualTxFees | null;
};

// TODO
export type UnsignedTransaction = any;

// TODO
export type SignedTransaction = any;

// TODO
export type SignedCanceledTransaction = any;

export type Hex = `0x${string}`;

export type GetTransactionsOptions = {
  searchCriteria?: any;
  initialList?: TransactionMeta[];
  filterToCurrentNetwork?: boolean;
  limit?: number;
};

export type MetaMetricsProps = {
  accountHardwareType?: string;
  accountType?: string;
  deviceModel?: string;
};

export type FeatureFlags = {
  smartTransactions?: {
    mobileReturnTxHashAsap?: boolean;
    extensionReturnTxHashAsap?: boolean;
  };
};
