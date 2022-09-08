const { LNMarketsRest } = require('@ln-markets/api')

module.exports = {
    lnmarkets: new LNMarketsRest({
        key: process.env.LNM_API_KEY,
        secret: process.env.LNM_API_SECRET,
        passphrase: process.env.LNM_API_PASSPHRASE,
    })
}