import { LNMarketsRest, Network } from '@ln-markets/api'

import * as balance from './balance'
import * as deposit from './deposit'
import lnmarketsInit from './lnmarkets'
import { send } from './send'
import { swap, Currency } from './swap'

export default class TaoWallet {
	network: Network
	lnmSecret: string
	lnmarkets: LNMarketsRest | undefined = undefined

	constructor({
		lnmSecret,
		network = 'testnet',
	}: {
		lnmSecret: string
		network?: Network
	}) {
		// Currently LnMarkets is the only example custody option. In the future I hope to
		// have a wide range of options included fully self-custodial options.
		this.lnmSecret = lnmSecret
		this.network = network
	}

	isLoggedIn() {
		return Boolean(this.lnmarkets)
	}

	async login() {
		this.lnmarkets = await lnmarketsInit({
			secret: this.lnmSecret,
			network: this.network,
		})
	}

	async fetchDepositAddress({
		type,
		amountSats,
	}: {
		type: 'bolt11' | 'on-chain'
		amountSats: number
	}) {
		if (!this.lnmarkets) {
			throw new Error('login() needs to be called first')
		}
		return deposit.fetchDepositAddress({
			type,
			amountSats,
			lnmarkets: this.lnmarkets,
		})
	}

	async fetchBalances() {
		if (!this.lnmarkets) {
			throw new Error('login() needs to be called first')
		}
		return balance.fetchBalances({
			lnmarkets: this.lnmarkets,
		})
	}

	async swap({
		from,
		to,
		amountUsd,
	}: {
		from: Currency
		to: Currency
		amountUsd: number
	}) {
		if (!this.lnmarkets) {
			throw new Error('login() needs to be called first')
		}
		return swap({
			from,
			to,
			amountUsd,
			lnmarkets: this.lnmarkets,
		})
	}

	async send({
		type,
		address,
		amountSats,
	}: {
		type: 'bolt11' | 'on-chain'
		address: string
		amountSats: number
	}) {
		if (!this.lnmarkets) {
			throw new Error('login() needs to be called first')
		}
		return send({
			type,
			address,
			amountSats,
			lnmarkets: this.lnmarkets,
		})
	}
}
