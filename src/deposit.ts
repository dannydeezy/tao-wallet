import { LNMarketsRest } from '@ln-markets/api'

interface FetchDepositAddressArgs {
	type: 'bolt11' | 'on-chain'
	lnmarkets: LNMarketsRest
	amountSats: number | null
}

export async function fetchDepositAddress({
	type,
	amountSats,
	lnmarkets,
}: FetchDepositAddressArgs) {
	if (type === 'bolt11') {
		if (amountSats == null || amountSats === 0) {
			throw new Error('amountSats is required and cannot be 0')
		}
		const { paymentRequest } = await lnmarkets.deposit({ amount: amountSats })
		return paymentRequest
	}

	if (type === 'on-chain') {
		if (amountSats != null) {
			throw new Error('cannot set amountSats for on-chain deposit')
		}
		const { address } = await lnmarkets.getUser()
		return address
	}

	throw new Error('Unsupported deposit type')
}
