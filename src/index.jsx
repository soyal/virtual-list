import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.less'

class VirtualList extends Component {
  static propTypes = {
    itemHeight: PropTypes.number, // 每个条目的高度
    data: PropTypes.array
  }

  container = null

  constructor(props) {
    super(props)

    this.state = {
      contentHeight: props.itemHeight * props.data.length,
      viewData: [],
      start: 0
    }
  }

  scrollHandler = () => {
    const viewHeight = this.container.clientHeight
    const scrollTop = this.container.scrollTop
    const { itemHeight, data } = this.props

    const viewCount = Math.ceil(viewHeight / itemHeight) // 视口展示的数据条目数量
    const start = Math.floor(scrollTop / itemHeight)
    const end = start + viewCount
    const viewData = data.slice(start, end + 1)

    this.setState({
      viewData,
      start
    })
  }

  componentDidMount() {
    this.container.addEventListener('scroll', this.scrollHandler)
    this.scrollHandler()
  }

  render() {
    const { contentHeight, viewData, start } = this.state
    const { itemHeight } = this.props
    const pTop = itemHeight * start
    return (
      <div
        className="virtual-list"
        ref={dom => {
          this.container = dom
        }}
      >
        {/* placeholder 用于撑起高度 */}
        <div
          className="virtual-list_phantom"
          style={{
            height: `${contentHeight}px`
          }}
        />

        {/* 内容展示区域 */}
        <div
          className="virtual-list_content"
          style={{
            transform: `translateY(${pTop}px)`
          }}
        >
          {viewData.map((itemData, index) => {
            return (
              <div
                key={index}
                className="virtual-list_content-item"
                style={{
                  height: itemHeight
                }}
              >
                {itemData}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default VirtualList
