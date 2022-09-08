const { lnmarkets } = require('./lnmarkets')

async function execute({ args, options }) {
    const info = await lnmarkets.getUser()
    const balanceBtc = info.balance / 100000000.0
    const balanceUsd = await calculateUsdBalance()
    const { btcEquivalent, usdEquivalent } = await calculateEquivalents({ balanceBtc, balanceUsd })
    console.log(`\nbtc: ${balanceBtc}`)
    console.log(`usd: $${balanceUsd.toFixed(2)}`)
    console.log(`total value: ${btcEquivalent.toFixed(8)} btc ($${usdEquivalent})\n`)
}

async function calculateEquivalents({ balanceBtc, balanceUsd }) {
    const ticker = await lnmarkets.futuresGetTicker()
    const btcUsdPrice = ticker.index
    const usdEquivalent = ((balanceBtc * btcUsdPrice) + balanceUsd).toFixed(2)
    const btcEquivalent = balanceBtc + (balanceUsd / btcUsdPrice)
    return { btcEquivalent, usdEquivalent }
}

async function calculateUsdBalance() {
    const positions = await lnmarkets.futuresGetPositions()
    const liveShorts = positions.filter(p => p.side === 's' && p.market_wi === 'filled' && p.margin_wi === 'running')
    return liveShorts.reduce((acc, p) => acc + p.quantity, 0)
} 

module.exports = { execute }