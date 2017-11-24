import counter from './index'

it('returns default 0', () => {
  expect(counter(undefined, {})).toBe(0)
})
it('should handle INCREMENT action', () => {
  expect(counter(1, { type: 'INCREMENT' })).toBe(2)
})
