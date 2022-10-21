# tao-wallet

Wallet for everyone. send and receive. btc, usd, and more.

Self custodial or yield-generating full custody, choose your own adventure.


[![Tao](https://img.shields.io/badge/License-MIT-brightgreen)](https://github.com/dannydeezy/tao-wallet/blob/main/LICENSE.md)
[![ShapeShift](https://img.shields.io/discord/539606376339734558.svg?label=discord&logo=discord&logoColor=white)](https://discord.gg/nmTNNtGgKK)
[![ShapeShift](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Ftwitter.com%2Ftaowallet)](https://twitter.com/taowallet)


Work in progress, looking for teammates!


# Usage

## Install as dependency
```sh
npm i tao-wallet
```

## Usage
```javascript
import { randomBytes } from 'crypto'
import { TaoWallet } from 'tao-wallet'

// On first usage, generate a secret for the backend LnMarkets account.
const lnmSecret = randomBytes(16).toString('hex')

const tao = new TaoWallet({ lnmSecret, network: 'mainnet' })

// Login.
await tao.login()

// Create an invoice to deposit funds (amount in sats).
const depositInvoice = await tao.fetchDepositAddress({
	type: 'bolt11',
	amountSats: 1000000,
})
console.log(depositInvoice)

// Create an on-chain address to deposit funds.
const depositAddress = await tao.fetchDepositAddress({ type: 'on-chain' })
console.log(depositAddress)

// Get balances.
const balances = await tao.fetchBalances()
console.log(balances)

// Swap btc for $2 of usd.
await tao.swap({ from: 'btc', to: 'usd', amountUsd: 2 })

// Swap $1 of usd for btc.
await tao.swap({ from: 'usd', to: 'btc', amountUsd: 1 })

// Send funds from your tao wallet to a lightning invoice.
const invoice = 'lnbc1....'
await tao.send({ type: 'bolt11', address: invoice })

// Send 100,000 sats from your tao wallet to an on-chain address.
const onchainAddress = 'bc1...'
await tao.send({
	type: 'on-chain',
	address: onchainAddress,
	amountSats: 100000,
})
```

## More Info
[Architecture, Contributing, Releases, etc](INFO.md)