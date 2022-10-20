// NOTE: The types here are incomplete. They have been copied from the following sources:
// https://docs.lnmarkets.com/api/v1
// https://npmjs.com/package/@ln-markets/api

declare module '@ln-markets/api' {
	export type Network = 'mainnet' | 'testnet'
	export type WorkingIndicator = 'filled' | 'running' | 'closed' | 'canceled'
	export type PositionSide = 'b' | 's'
	export type PositionType = 'l' | 'm'

	export interface UserInfo {
		uid: string
		balance: number
		account_type: 'lnurl' | 'credentials' | 'joule'
		username: string
		linkingpublickey: string

		// NOTE: This type is not defined in the API docs, but it's used in deposit.ts
		// Is that accurate?
		address: string
	}

	export interface Ticker {
		index: number
		bid: number
		offer: number
	}

	export interface Position {
		canceled: boolean
		closed: boolean
		closed_ts: number | null
		creation_ts: number
		exit_price: number | null
		id: number
		leverage: number
		liquidation: number
		margin: number
		margin_wi: WorkingIndicator
		market_filled_ts: number | null
		market_wi: WorkingIndicator
		pid: string
		pl: number
		price: number
		quantity: number
		side: PositionSide
		sign: number
		stoploss: number | null
		stoploss_wi: WorkingIndicator
		sum_carry_fees: number
		takeprofit: number | null
		takeprofit_wi: WorkingIndicator
		type: PositionType
	}

	export interface LNMarketsOptions {
		key?: string
		secret?: string
		network?: Network
		version?: string
		customHeaders?: Record<string, string>
		fullResponse?: boolean
		passphrase?: string
		skipApiKey?: boolean
		debug?: boolean
	}

	export interface WithdrawParams {
		amount?: number
		invoice: string
		unit?: 'sat'
	}

	export interface WithdrawResult {
		amount: number
		fees: number
		id: string
		payment_hash: string
		payment_secret: string
	}

	export interface DepositParams {
		amount: number
	}

	export interface DepositResult {
		expiry: number
		paymentRequest: string
	}

	export interface FuturesClosePositionParams {
		pid: string
	}

	export interface FuturesClosePositionResult {
		closed: boolean
		closed_ts: string | null
		exit_price: string
		pid: string
		pl: number
	}

	export type FuturesGetTickerParams = unknown

	export interface FuturesGetPositionsParams {
		type: 'open' | 'running' | 'closed'
		from?: number
		to?: number
		limit?: number
	}

	export type FuturesGetPositionsResult = Position[]

	export interface FuturesNewPositionParams {
		type: PositionType
		side: PositionSide
		margin?: number
		leverage: number
		quantity?: number
		takeprofit?: number
		stoploss?: number
		price?: number
	}

	export interface FuturesNewPositionResult {
		creation_ts: string
		id: string
		leverage: string
		liquidation: string
		margin: string
		margin_wi: WorkingIndicator
		market_filled_ts: string | null
		market_wi: WorkingIndicator
		pid: string
		pl: string
		price: string
		quantity: string
		side: PositionSide
		stoploss: string | null
		stoploss_wi: WorkingIndicator | null
		takeprofit: string | null
		takeprofit_wi: WorkingIndicator | null
		type: PositionType
	}

	export class LNMarketsRest {
		key: string
		secret: string
		network: Network
		version: string
		customHeaders: Record<string, string>
		fullResponse: boolean
		passphrase: string
		skipApiKey: boolean
		debug: boolean

		constructor(options: LNMarketsOptions)

		getUser(): Promise<UserInfo>
		futuresClosePosition(
			params: FuturesClosePositionParams,
		): Promise<FuturesClosePositionResult>
		futuresGetTicker(params?: FuturesGetTickerParams): Promise<Ticker>
		futuresGetPositions(
			params?: FuturesGetPositionsParams,
		): Promise<FuturesGetPositionsResult>
		futuresNewPosition(
			params?: FuturesNewPositionParams,
		): Promise<FuturesNewPositionResult>
		withdraw(params: WithdrawParams): Promise<WithdrawResult>
		deposit(params: DepositParams): Promise<DepositResult>
	}
}
