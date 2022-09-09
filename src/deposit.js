async function fetchDepositAddress({ type, amountSats, lnmarkets }) {

    if (type === 'bolt11') {
        if (!amountSats) {
            throw new Error('amountSats is required and cannot be 0\n')
        }
        const { paymentRequest } = await lnmarkets.deposit({ amount: amountSats })
        return paymentRequest
    }

    if (type === 'on-chain') {
        if (amountSats) {
            throw new Error('cannot set amountSats for on-chain deposit')
        }
        const { address } = await lnmarkets.getUser()
        return address
    }

    throw new Error(`Unsupported deposit type: ${type}`)
}

module.exports = { fetchDepositAddress }