/*
 * @Author: czy0729
 * @Date: 2021-03-14 18:00:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-14 18:42:17
 */
import { observable, computed } from 'mobx'
import { tinygrailStore, userStore } from '@stores'
import { getTimestamp } from '@utils'
import store from '@utils/store'
import { info } from '@utils/ui'
import { levelList } from '@tinygrail/_/utils'

export default class ScreenTinygrailAdvanceState extends store {
  state = observable({
    level: '',
    _loaded: false
  })

  init = () => {
    const { _loaded } = this.advanceState
    if (!_loaded) {
      this.fetchAdvanceState()
    }
  }

  // -------------------- fetch --------------------
  fetchAdvanceState = (showInfo = true) => {
    const { _loaded } = this.advanceState
    if (!_loaded) {
      return tinygrailStore.fetchAdvanceState()
    }

    if (!this.advance && getTimestamp() - _loaded < 60 * 60 * 4) {
      if (showInfo) {
        info('普通用户4小时内只能刷新一次')
      }
      return true
    }

    if (this.advance && getTimestamp() - _loaded < 60 * 1) {
      if (showInfo) {
        info('为避免服务器压力, 1分钟后再刷新吧')
      }
      return true
    }

    return tinygrailStore.fetchAdvanceState()
  }

  // -------------------- get --------------------
  @computed get myUserId() {
    return userStore.myUserId
  }

  @computed get advance() {
    return tinygrailStore.advance
  }

  @computed get advanceState() {
    return tinygrailStore.advanceState
  }

  @computed get computedList() {
    const { level } = this.state
    const list = this.advanceState
    if (!list._loaded) {
      return list
    }

    let _list = list
    if (level) {
      _list = {
        ..._list,
        list: levelList(level, _list.list)
      }
    }

    return _list
  }

  @computed get levelMap() {
    const { list } = this.advanceState
    const data = {}
    list.forEach(item =>
      data[item.level] ? (data[item.level] += 1) : (data[item.level] = 1)
    )
    return data
  }

  // -------------------- page --------------------
  onLevelSelect = level => {
    this.setState({
      level
    })
  }
}
