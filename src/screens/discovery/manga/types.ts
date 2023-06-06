/*
 * @Author: czy0729
 * @Date: 2022-09-11 16:37:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-06 04:12:09
 */
import { factory } from '@utils'
import { Navigation } from '@types'
import Store from './store'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type Params = {
  _tags?: string[] | string
}
