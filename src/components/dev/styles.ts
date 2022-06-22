/*
 * @Author: czy0729
 * @Date: 2022-05-03 16:08:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-21 21:21:45
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  dev: {
    position: 'absolute',
    zIndex: 1000,
    right: _.wind,
    bottom: 64
  },
  touch: {
    backgroundColor: _.colorTitle,
    borderRadius: 20,
    overflow: 'hidden',
    opacity: 0.8
  },
  icon: {
    width: 40,
    height: 40
  },
  scroll: {
    position: 'absolute',
    zIndex: 1000,
    right: _.sm,
    left: _.sm,
    bottom: _.lg,
    height: 240,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderWidth: _.hairlineWidth,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: _.radiusSm
  },
  container: {
    padding: _.md
  }
}))
