/*
 * @Author: czy0729
 * @Date: 2022-09-29 17:39:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-16 07:21:11
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  searchBar: {
    paddingVertical: _.md,
    paddingHorizontal: _.wind
  },
  btn: {
    width: 68,
    height: 40,
    borderRadius: 40
  }
}))
