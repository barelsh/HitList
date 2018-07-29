const utils = require('../../App/Lib/utils')
import R from 'ramda'

test('updateBalances 1 member', () => {
  const balances = [{memberId: 0, name: 'John', balance: 0}]
  const transaction = {
    whoPayed: 0,
    forWhom: [0],
    amount: 100
  }
  const result = utils.updateBalances(balances, transaction)

  expect(R.equals(result, [{memberId: 0, name: 'John', balance: 0}])).toBe(true)
})

test('updateBalances 2 members', () => {
  const balances = [{memberId: 0, name: 'John', balance: 0},
                    {memberId: 1, name: 'Tali', balance: 0}]
  const transaction = {
    whoPayed: 0,
    forWhom: [0,1],
    amount: 100
  }
  const result = utils.updateBalances(balances, transaction)

  expect(R.equals(result, [{memberId: 0, name: 'John', balance: -50},
                           {memberId: 1, name: 'Tali', balance: 50}])).toBe(true)
})

test('updateBalances 2 members not including payer', () => {
  const balances = [{memberId: 0, name: 'John', balance: 0},
                    {memberId: 1, name: 'Tali', balance: 0}]
  const transaction = {
    whoPayed: 0,
    forWhom: [1],
    amount: 100
  }
  const result = utils.updateBalances(balances, transaction)

  expect(R.equals(result, [{memberId: 0, name: 'John', balance: -100},
                           {memberId: 1, name: 'Tali', balance: 100}])).toBe(true)
})

test('updateBalances 3 members', () => {
  const balances = [{memberId: 0, name: 'John', balance: 0},
                    {memberId: 1, name: 'Tali', balance: 0},
                    {memberId: 2, name: 'Pinhas', balance: 0}]
  const transaction = {
    whoPayed: 0,
    forWhom: [0,1,2],
    amount: 150
  }
  const result = utils.updateBalances(balances, transaction)

  expect(R.equals(result, [{memberId: 0, name: 'John', balance: -100},
                           {memberId: 1, name: 'Tali', balance: 50},
                           {memberId: 2, name: 'Pinhas', balance: 50}])).toBe(true)
})

test('updateBalances 3 members not including all', () => {
  const balances = [{memberId: 0, name: 'John', balance: 0},
                    {memberId: 1, name: 'Tali', balance: 0},
                    {memberId: 2, name: 'Pinhas', balance: 0}]
  const transaction = {
    whoPayed: 0,
    forWhom: [0,1],
    amount: 150
  }
  const result = utils.updateBalances(balances, transaction)

  expect(R.equals(result, [{memberId: 0, name: 'John', balance: -75},
                           {memberId: 1, name: 'Tali', balance: 75},
                           {memberId: 2, name: 'Pinhas', balance: 0}])).toBe(true)
})

test('updateBalances 3 members not including payer', () => {
  const balances = [{memberId: 0, name: 'John', balance: 0},
                    {memberId: 1, name: 'Tali', balance: 0},
                    {memberId: 2, name: 'Pinhas', balance: 0}]
  const transaction = {
    whoPayed: 0,
    forWhom: [2,1],
    amount: 150
  }
  const result = utils.updateBalances(balances, transaction)

  expect(R.equals(result, [{memberId: 0, name: 'John', balance: -150},
                           {memberId: 1, name: 'Tali', balance: 75},
                           {memberId: 2, name: 'Pinhas', balance: 75}])).toBe(true)
})

test('updateBalances fraction result', () => {
  const balances = [{memberId: 0, name: 'John', balance: 0},
                    {memberId: 1, name: 'Tali', balance: 0},
                    {memberId: 2, name: 'Pinhas', balance: 0}]
  const transaction = {
    whoPayed: 0,
    forWhom: [2,1],
    amount: 101
  }
  const result = utils.updateBalances(balances, transaction)

  expect(R.equals(result, [{memberId: 0, name: 'John', balance: -101},
                           {memberId: 1, name: 'Tali', balance: 50.5},
                           {memberId: 2, name: 'Pinhas', balance: 50.5}])).toBe(true)
})

test('updateBalances fraction2 result', () => {
  const balances = [{memberId: 0, name: 'John', balance: 0},
                    {memberId: 1, name: 'Tali', balance: 0},
                    {memberId: 2, name: 'Pinhas', balance: 0}]
  const transaction = {
    whoPayed: 0,
    forWhom: [0,2,1],
    amount: 100
  }
  const result = utils.updateBalances(balances, transaction)

  expect(R.equals(result, [{memberId: 0, name: 'John', balance: -66.67},
                           {memberId: 1, name: 'Tali', balance: 33.33},
                           {memberId: 2, name: 'Pinhas', balance: 33.33}])).toBe(true)
})
