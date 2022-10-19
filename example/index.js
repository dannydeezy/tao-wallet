import { TaoWallet } from '#src/index.js'

const wallet = new TaoWallet({
  lnmSecret: '<my super secret, please modify me>',
})

await wallet.login()
await wallet.fetchBalances().then(console.log)
await wallet.swap({ from: 'btc', to: 'usd', amountUsd: 10 }).then(console.log)
await wallet.fetchBalances().then(console.log)
