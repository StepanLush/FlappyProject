const flappy = require('./flappy.js')
const assert = require('assert')

it('Поднимает птицу',() => {
    assert.equal(flappy.moveUp(150), 125)
  })

it('Отрисовка и движение труб',() => {
    assert.equal(flappy.draw(0), 0)
  })

