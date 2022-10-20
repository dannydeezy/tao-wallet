import { LNMarketsRest } from '@ln-markets/api'

import { SATS_PER_BITCOIN } from './constants'

export async function fetchBalances({
	lnmarkets,
}: {
	lnmarkets: LNMarketsRest
}) {
	const info = await lnmarkets.getUser()
	const balanceBtc = info.balance / SATS_PER_BITCOIN
	const balanceUsd = await calculateUsdBalance({ lnmarkets })
	const { btcEquivalent, usdEquivalent } = await calculateEquivalents({
		balanceBtc,
		balanceUsd,
		lnmarkets,
	})
	return { balanceBtc, balanceUsd, btcEquivalent, usdEquivalent }
}

export async function calculateEquivalents({
	balanceBtc,
	balanceUsd,
	lnmarkets,
}: {
	balanceBtc: number
	balanceUsd: number
	lnmarkets: LNMarketsRest
}) {
	const ticker = await lnmarkets.futuresGetTicker()
	const btcUsdPrice = ticker.index
	const usdEquivalent = (balanceBtc * btcUsdPrice + balanceUsd).toFixed(2)
	const btcEquivalent = (balanceBtc + balanceUsd / btcUsdPrice).toFixed(8)
	return { btcEquivalent, usdEquivalent }
}

export async function calculateUsdBalance({
	lnmarkets,
}: {
	lnmarkets: LNMarketsRest
}) {
	const positions = await lnmarkets.futuresGetPositions()
	const liveShorts = positions.filter(
		p =>
			p.side === 's' && p.market_wi === 'filled' && p.margin_wi === 'running',
	)
	return liveShorts.reduce((acc, p) => acc + p.quantity, 0)
}
