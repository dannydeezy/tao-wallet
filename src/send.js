const axios = require('axios')

async function send({ type, address, amountSats, lnmarkets }) {
    if (type === 'bolt11') {
        const params = { invoice: address }
        if (amountSats && amountSats > 0) {
            params.amount = amountSats
        }
        await lnmarkets.withdraw(params)
        return
    }

    if (type === 'on-chain') {
        // Withdraw on-chain using a deezy swap.
        const url = `https://api${lnmarkets.network === 'testnet' ? '-testnet': ''}.deezy.io/v1/swap`
        const response = await axios.post(url, {
            amount_sats: amountSats,
            on_chain_address: address,
            on_chain_sats_per_vbyte: 1 // TODO: realtime estimate
        }).catch(err => {
            //console.log(err)
            console.log(err.response.data)
            return null
        })
        if (!response) return
        const { bolt11_invoice } = response.data
        await lnmarkets.withdraw({ invoice: bolt11_invoice })
        return
    }
}

module.exports = { send }
