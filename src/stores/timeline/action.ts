/*
 * @Author: czy0729
 * @Date: 2023-04-25 16:37:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-25 16:38:42
 */
import { getTimestamp } from '@utils'
import { xhr } from '@utils/fetch'
import { HTML_ACTION_TIMELINE_REPLY, HTML_ACTION_TIMELINE_SAY } from '@constants'
import { Id, UserId } from '@types'
import Fetch from './fetch'

export default class Action extends Fetch {
  /** 更新隐藏某人动态的截止时间 */
  updateHidden = (hash?: UserId, day: number = 1) => {
    if (!hash) return false

    const key = 'hidden'
    if (day) {
      this.setState({
        [key]: {
          ...this.state[key],
          [hash]: getTimestamp() + day * 24 * 60 * 60
        }
      })
    } else {
      this.clearState(key, {})
    }
    this.save(key)

    return true
  }

  // -------------------- action --------------------
  /** 回复吐槽 */
  doReply = async (
    args: {
      id: Id
      content: string
      formhash: string
    },
    success?: () => any
  ) => {
    const { id, content, formhash } = args || {}
    xhr(
      {
        url: HTML_ACTION_TIMELINE_REPLY(id),
        data: {
          content,
          formhash,
          submit: 'submit'
        }
      },
      success
    )
  }

  /** 新吐槽 */
  doSay = async (
    args: {
      content: string
      formhash: string
    },
    success?: () => any
  ) => {
    const { content, formhash } = args || {}
    xhr(
      {
        url: HTML_ACTION_TIMELINE_SAY(),
        data: {
          say_input: content,
          formhash,
          submit: 'submit'
        }
      },
      success
    )
  }
}
