'use strict'
import BinaryTree from '../src/binary-trees.js'

const { log } = console,
  tree = new BinaryTree().add('d').add('b').add('a').add('g').add('f').add('h')

log(tree)
