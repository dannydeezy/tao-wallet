async function fetchDepositAddress({ type, amount, lnmarkets }) {

    if (type === 'lightning') {
        if (!amount) {
            throw new Error('amount is required and cannot be 0\n')
        }
        const { paymentRequest } = await lnmarkets.deposit({ amount })
        return paymentRequest
    }

    if (type === 'on-chain') {
        if (amount) {
            throw new Error('cannot set amount for on-chain deposit')
        }
        const { address } = await lnmarkets.getUser()
        return address
    }

    throw new Error(`Unsupported deposit type: ${type}`)
}

module.exports = { fetchDepositAddress }