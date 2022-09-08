const { lnmarkets } = require('./lnmarkets')

async function execute({ args, options }) {

    if (args.type === 'lightning') {
        if (!options.amount) {
            throw new Error('--amount is required and cannot be 0\n')
        }
        const { paymentRequest } = await lnmarkets.deposit({
            amount: options.amount
        })
        console.log(`\n${paymentRequest}\n`)
        return
    }

    if (args.type === 'on-chain') {
        if (options.amount) {
            throw new Error('cannot set --amount for on-chain deposit')
        }
        const { address } = await lnmarkets.getUser()
        console.log(`\n${address}\n`)
    }
}

module.exports = { execute }