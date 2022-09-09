const lnmarketsApi = require('./src/lnmarkets')
const deposit = require('./src/deposit')
const balance = require('./src/balance')
const swap = require('./src/swap')
const send = require('./src/send')

class TaoWallet {

    constructor({ lnmSecret, network = 'testnet'}) {
        this.lnmSecret = lnmSecret
        this.network = network
    }

    isLoggedIn() { return !!(this.lnmarkets) }
    
    async login() {
        this.lnmarkets = await lnmarketsApi.init({
            secret: this.lnmSecret,
            network: this.network
        })
    }

    async fetchDepositAddress({ type, amount }) {
        return deposit.fetchDepositAddress({ type, amount, lnmarkets: this.lnmarkets })
    }

    async fetchBalances() {
        return balance.fetchBalances({ lnmarkets: this.lnmarkets })
    }

    async swap({ from, to, amountUsd }) {
        return swap.swap({ from, to, amountUsd, lnmarkets: this.lnmarkets })
    }

    async send({ type, address, amountSats }) {
        return send.send({ type, address, amountSats, lnmarkets: this.lnmarkets })
    }
}

module.exports = TaoWallet