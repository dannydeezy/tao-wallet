import { LNMarketsRest } from '@ln-markets/api'

import * as balance from '../src/balance'
import { createPosition } from './utils/lnmarkets'

const lnmarkets: LNMarketsRest = new LNMarketsRest({
	skipApiKey: true,
	network: 'testnet',
})

describe('Balance.calculateUsdBalance', () => {
	it('should return no usd balance for empty positions', async () => {
		lnmarkets.futuresGetPositions = jest.fn(() => {
			return Promise.resolve([])
		})

		expect.assertions(1)
		const balanceUsd = await balance.calculateUsdBalance({ lnmarkets })
		expect(balanceUsd).toBe(0)
	})

	it('should return no usd balance for positions', async () => {
		lnmarkets.futuresGetPositions = jest.fn(() => {
			return Promise.resolve([createPosition({})])
		})

		expect.assertions(1)
		const balanceUsd = await balance.calculateUsdBalance({ lnmarkets })
		expect(balanceUsd).toBe(0)
	})

	it('should return usd balance for position', async () => {
		lnmarkets.futuresGetPositions = jest.fn(() => {
			return Promise.resolve([
				createPosition({
					side: 's',
					market_wi: 'filled',
					margin_wi: 'running',
					quantity: 1,
				}),
			])
		})

		expect.assertions(1)
		const balanceUsd = await balance.calculateUsdBalance({ lnmarkets })
		expect(balanceUsd).toBe(1)
	})

	it('should return usd balance for multiple positions', async () => {
		lnmarkets.futuresGetPositions = jest.fn(() => {
			return Promise.resolve([
				createPosition({
					side: 's',
					market_wi: 'filled',
					margin_wi: 'running',
					quantity: 1,
				}),
				createPosition({
					side: 's',
					market_wi: 'filled',
					margin_wi: 'running',
					quantity: 5,
				}),
			])
		})

		expect.assertions(1)
		const balanceUsd = await balance.calculateUsdBalance({ lnmarkets })
		expect(balanceUsd).toBe(6)
	})
})
