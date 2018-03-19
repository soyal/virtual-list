import React from 'react'
import VirtualList from '../../src/index'

const Demo1 = () => {
  const data = Array(100)
    .fill(0)
    .map((e, index) => {
      return index
    })

  return <VirtualList data={data} itemHeight={30} />
}

export default Demo1
