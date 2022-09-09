const { lnmarkets } = require('./lnmarkets')
const { getBalances } = require('./balance')

async function execute({ args, options }) {
    if (options.from === 'usd' && options.to === 'btc') {
        console.log(`Swapping ${options.amountUsd} usd to btc`)
        await swapUsdToBtc({ amountUsd: options.amountUsd })
        return
    }

    if (options.from === 'btc' && options.to === 'usd') {
        console.log(`Swapping btc for ${options.amountUsd} usd`)
        await swapBtcToUsd({ amountUsd: options.amountUsd })
        return
    }
}

async function swapBtcToUsd({ amountUsd }) {
    await lnmarkets.futuresNewPosition({
        type: 'm',
        side: 's',
        quantity: amountUsd,
        leverage: 1
    })
}

async function swapUsdToBtc({ amountUsd }) {
    const positions = await lnmarkets.futuresGetPositions({ type: 'running' })
    // Sort by ascending.
    const liveShorts = positions.filter(p => p.side === 's').sort((a, b) => a.quantity - b.quantity)
    const balanceUsd = liveShorts.reduce((acc, p) => acc + p.quantity, 0)
    if (balanceUsd < amountUsd) {
        throw new Error("You don't have enough usd to swap")
    }
    let usdClosed = 0
    for (const short of liveShorts) {
        if (usdClosed >= amountUsd) break
        await lnmarkets.futuresClosePosition({ pid: short.pid })
        usdClosed += short.quantity
    }

    if (usdClosed == amountUsd) return

    const usdToReopen = usdClosed - amountUsd
    await lnmarkets.futuresNewPosition({ 
        type: 'm',
        side: 's',
        quantity: usdToReopen,
        leverage: 1
    })
}

module.exports = { execute }