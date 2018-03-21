import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.less'

class VirtualList extends Component {
  static propTypes = {
    getItemHeight: PropTypes.func, // (data:any, index: number): number
    data: PropTypes.array
  }

  container = null

  constructor(props) {
    super(props)

    this.state = {
      contentHeight: this.getContentHeight(),
      viewData: [],
      start: 0
    }
  }

  getContentHeight() {
    const { data, getItemHeight } = this.props

    let total = 0
    data.forEach((e, i) => {
      total += getItemHeight(e, i)
    })

    return total
  }

  /**
   * 获取index距离最顶部的距离(不含自身)
   * @param {Number} index
   * @return {Number}
   */
  getItemOffset(index) {
    const { data, getItemHeight } = this.props

    let total = 0
    for (let i = 0; i < index; i++) {
      total += getItemHeight(data[i], i)
    }

    return total
  }

  /**
   * 查找距离top最近的索引值，换句话说，到index的距离(包含index在内) >= top
   */
  findNearestItemIndex(top) {
    const { data, getItemHeight } = this.props
    const len = data.length
    let total = 0
    for (let i = 0; i < len; i++) {
      total += getItemHeight(data[i], i)
      if (total >= top) return i
    }

    return len - 1
  }

  scrollHandler = () => {
    const viewHeight = this.container.clientHeight
    const scrollTop = this.container.scrollTop

    const start = this.findNearestItemIndex(scrollTop)
    const end = this.findNearestItemIndex(scrollTop + viewHeight)
    const viewData = this.props.data.slice(start, end + 1)

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
    const { getItemHeight } = this.props
    const pTop = this.getItemOffset(start)
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
                  height: getItemHeight(itemData, start + index) + 'px'
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
