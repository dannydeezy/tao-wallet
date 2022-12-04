import { LNMarketsRest } from '@ln-markets/api'
import axios from 'axios'

interface SendArgs {
	type: 'bolt11' | 'on-chain'
	address: string
	amountSats: number
	lnmarkets: LNMarketsRest
}

export async function send({ type, address, amountSats, lnmarkets }: SendArgs) {
	if (type === 'bolt11') {
		await lnmarkets.withdraw({
			amount: amountSats,
			invoice: address,
		})
		return
	}

	if (type === 'on-chain') {
		// Withdraw on-chain using a deezy swap.
		const url = `https://api${
			lnmarkets.network === 'testnet' ? '-testnet' : ''
		}.deezy.io/v1/swap`
	
		await axios
			.post<{ bolt11_invoice: string }>(url, {
				amount_sats: amountSats,
				on_chain_address: address,
				on_chain_sats_per_vbyte: 1, // TODO: realtime estimate
			})
			.then(async ({ data }) => {
				await lnmarkets.withdraw({ invoice: data.bolt11_invoice })
			})
			.catch((err) => {
				if(axios.isAxiosError(err)) {
					// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
					throw Error(err.response?.data)
				}
			})
	}
}
