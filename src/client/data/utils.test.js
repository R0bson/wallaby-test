import {expect} from 'chai'

import {reducerNoOp} from './utils'

describe('example test', () => {
  it('should return state', () => {
    const state = {}
    expect(reducerNoOp(state)).to.equal(state)
  })
})
