import React, { Component } from 'react'
import './index.less'

class VirtualList extends Component {
  container = null

  render() {
    return (
      <div
        className="virtual-list"
        ref={dom => {
          this.container = dom
        }}
      >
        {/* placeholder 用于撑起高度 */}
        <div className="virtual-list_phantom" />

        <div className="virtual-list_content" />
      </div>
    )
  }
}

export default VirtualList
