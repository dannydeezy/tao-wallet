import { LNMarketsRest, Network } from '@ln-markets/api'
import { bech32 } from 'bech32'
import crypto from 'crypto'
import secp256k1 from 'secp256k1'

export default async function init({
	secret,
	network = 'testnet',
}: {
	secret: string
	network: Network
}) {
	if (secret == null || secret === '') {
		throw new Error('secret is required')
	}
	const cookie = await fetchNewCookie({ secret, network })
	return new LNMarketsRest({
		skipApiKey: true,
		customHeaders: { Cookie: cookie },
		network,
	})
}

async function fetchNewCookie({
	secret,
	network,
}: {
	secret: string
	network: Network
}) {
	const host = `api${network === 'testnet' ? '.testnet' : ''}.lnmarkets.com/v1`
	const response = await fetch(`https://${host}/lnurl/auth`, {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
	})
	// console.log(response)

	const cookie = response.headers.get('set-cookie')
	if (cookie == null || cookie === '') {
		throw new Error('No cookie returned')
	}

	const { lnurl, k1 } = (await response.json()) as { lnurl: string; k1: string }
	const limit = 1023
	const decoded = bech32.decode(lnurl, limit)
	const httpString = Buffer.from(bech32.fromWords(decoded.words)).toString()
	const url = new URL(httpString)
	const secretKey = crypto
		.createHash('sha256')
		.update(`${url.host}:${secret}`)
		.digest()

	const publicKey = secp256k1.publicKeyCreate(secretKey)
	secp256k1.publicKeyVerify(publicKey)
	const message = Buffer.from(url.searchParams.get('k1') ?? '', 'hex')
	const { signature } = secp256k1.ecdsaSign(message, secretKey)

	const hmac = url.searchParams.get('hmac') ?? ''
	const key = Buffer.from(publicKey).toString('hex')
	const sig = Buffer.from(secp256k1.signatureExport(signature)).toString('hex')

	const params = new URLSearchParams({
		key,
		sig,
		hmac,
		k1,
		tag: 'login',
		jwt: 'false',
	})
	const loginResponse = await fetch(
		`https://${host}/lnurl/auth?${params.toString()}`,
		{
			headers: { Cookie: cookie },
		},
	)
	if (!loginResponse.ok) {
		throw new Error('Login failed')
	}
	return cookie
}

// function isCookieExpired(cookie: string) {
// 	const expiry = Date.parse(
// 		cookie
// 			.split('; ')
// 			.find(property => property.startsWith('Expires='))
// 			.substring(8) // Length of Expires=, to only get the date.
// 	)
// 	const now = Date.now()
// 	return now > expiry
// }
