# tao-wallet
wallet for everyone. send and receive. btc and usd. hodl. coming soon: auto-balancing :)

### install
```
npm i tao-wallet
```
### usage
```
const TaoWallet = require('tao-wallet')

// On first usage, generate a secret for the backend LnMarkets account.
const lnmSecret = require('crypto').randomBytes(16).toString('hex')

async function go() {
    const tao = new TaoWallet({ lnmSecret, network: 'mainnet' })

    // Login.
    await tao.login()

    // Create an invoice to deposit funds (amount in sats).
    const depositInvoice = await tao.fetchDepositAddress({ type: 'bolt11', amountSats: 1000000 })
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
    await tao.send({ type: 'on-chain', address: onchainAddress, amountSats: 100000 })
}

go()

```
