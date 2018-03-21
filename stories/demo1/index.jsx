import React from 'react'
import VirtualList from '../../src/index'

const Demo1 = () => {
  const data = Array(10000)
    .fill(0)
    .map((e, index) => {
      return index
    })

  return (
    <VirtualList
      data={data}
      getItemHeight={(data, index) => {
        return index % 2 === 0 ? 50 : 100
      }}
    />
  )
}

export default Demo1
