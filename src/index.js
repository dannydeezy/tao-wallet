import { initializeLNMarketsApi } from '#src/lnmarkets.js'

import { fetchDepositAddress } from '#src/deposit.js'
import { fetchBalances } from '#src/balance.js'
import { swap } from '#src/swap.js'
import { send } from '#src/send.js'

export const TaoWallet = class TaoWallet {
  constructor({ lnmSecret, network = 'testnet' }) {
    // Currently LnMarkets is the only example custody option. In the future I hope to
    // have a wide range of options included fully self-custodial options.
    this.lnmSecret = lnmSecret
    this.network = network
  }

  isLoggedIn() {
    return !!this.lnmarkets
  }

  async login() {
    this.lnmarkets = await initializeLNMarketsApi({
      secret: this.lnmSecret,
      network: this.network,
    })
  }

  async fetchDepositAddress({ type, amountSats }) {
    return fetchDepositAddress({
      type,
      amountSats,
      lnmarkets: this.lnmarkets,
    })
  }

  async fetchBalances() {
    return fetchBalances({ lnmarkets: this.lnmarkets })
  }

  async swap({ from, to, amountUsd }) {
    return swap({ from, to, amountUsd, lnmarkets: this.lnmarkets })
  }

  async send({ type, address, amountSats }) {
    return send({ type, address, amountSats, lnmarkets: this.lnmarkets })
  }
}
