const { lnmarkets } = require('./lnmarkets')

async function execute({ args, options }) {
    console.log(`Swapping ${options.amount} ${options.from} to ${options.to}`)
    if (options.from === 'usd' && options.to === 'btc') {
        await swapUsdToBtc({ amountUsd: options.amount })
    }
}

async function swapUsdToBtc({ amountUsd }) {
    const positions = await lnmarkets.futuresGetPositions({ type: 'running' })
    const liveShorts = positions.filter(p => p.side === 's')
}

async function calculateEquivalents({ balanceBtc, balanceUsd }) {
    const ticker = await lnmarkets.futuresGetTicker()
    const btcUsdPrice = ticker.index
    const usdEquivalent = ((balanceBtc * btcUsdPrice) + balanceUsd).toFixed(2)
    const btcEquivalent = balanceBtc + (balanceUsd / btcUsdPrice)
    return { btcEquivalent, usdEquivalent }
}

async function calculateUsdBalance() {
    const positions = await lnmarkets.futuresGetPositions({ type: 'running' })
    const liveShorts = positions.filter(p => p.side === 's')
    return liveShorts.reduce((acc, p) => acc + p.quantity, 0)
}

module.exports = { execute }