import { LNMarketsRest } from '@ln-markets/api'

interface SendArgs {
	address: string
	amountSats: number
	lnmarkets: LNMarketsRest
}

const isLnInvoice = (address: string) =>
	Boolean(address.match(/^(lnbc|LNBC)([0-9]{1,}[a-zA-Z0-9]+){1}$/))

export async function send({ address, amountSats, lnmarkets }: SendArgs) {
	if (isLnInvoice(address)) {
		await lnmarkets.withdraw({
			amount: amountSats,
			invoice: address,
		})
		return
	}

	// Withdraw on-chain using a deezy swap.
	const url = `https://api${
		lnmarkets.network === 'testnet' ? '-testnet' : ''
	}.deezy.io/v1/swap`
	const result = await fetch(url, {
		method: 'post',
		body: JSON.stringify({
			amount_sats: amountSats,
			on_chain_address: address,
			on_chain_sats_per_vbyte: 1, // TODO: realtime estimate
		}),
	})
		.then(response => response.json() as Promise<{ bolt11_invoice: string }>)
		.catch(err => {
			console.log(err)
			return null
		})

	if (result == null) {
		return
	}

	const { bolt11_invoice } = result
	await lnmarkets.withdraw({ invoice: bolt11_invoice })
	return
}
