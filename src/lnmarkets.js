import { LNMarketsRest } from '@ln-markets/api'
import axios from 'axios'
import crypto from 'node:crypto'

import { bech32 } from 'bech32'
import secp256k1 from 'secp256k1'

export const initializeLNMarketsApi = async ({
  secret,
  network = 'testnet',
}) => {
  if (!secret) {
    throw new Error('secret is required')
  }

  const cookie = await fetchNewCookie({ secret, network })

  return new LNMarketsRest({
    skipApiKey: true,
    customHeaders: { Cookie: cookie },
    network,
  })
}

const fetchNewCookie = async ({ secret, network }) => {
  const host = `api${network === 'testnet' ? '.testnet' : ''}.lnmarkets.com/v1`
  const response = await axios.post(
    `https://${host}/lnurl/auth`,
    {},
    { headers: { 'Content-Type': 'application/json' } }
  )
  // console.log(response)
  const { lnurl, k1 } = response.data
  const cookie = response.headers['set-cookie']
  const decoded = bech32.decode(lnurl, 1023)
  const httpString = new Buffer.from(bech32.fromWords(decoded.words)).toString()
  const url = new URL(httpString)
  const secretKey = crypto
    .createHash('sha256')
    .update(`${url.host}:${secret}`)
    .digest()
  const publicKey = secp256k1.publicKeyCreate(secretKey)
  secp256k1.publicKeyVerify(publicKey, secretKey)
  const message = Buffer.from(url.searchParams.get('k1'), 'hex')
  const { signature } = secp256k1.ecdsaSign(message, secretKey)
  const hmac = url.searchParams.get('hmac')
  const key = Buffer.from(publicKey).toString('hex')
  const sig = Buffer.from(secp256k1.signatureExport(signature)).toString('hex')
  const params = new URLSearchParams({
    key,
    sig,
    hmac,
    k1,
    tag: 'login',
    jwt: false,
  })
  const loginResponse = await axios.get(
    `https://${host}/lnurl/auth?${params.toString()}`,
    {
      credentials: true,
      headers: { Cookie: cookie },
    }
  )
  if (loginResponse.data.status !== 'OK') {
    throw new Error('Login failed')
  }
  return cookie
}

const isCookieExpired = (cookie) => {
  const expiry = Date.parse(
    cookie
      .split('; ')
      .find((property) => property.startsWith('Expires='))
      .substring(8) // Length of Expires=, to only get the date.
  )
  const now = Date.now()

  return now > expiry
}
