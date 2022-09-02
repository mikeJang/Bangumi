/*
 * @Author: czy0729
 * @Date: 2022-08-26 00:27:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 00:31:03
 */
import { Navigation } from '@types'
import { StoreType as $ } from '../types'

export const COVER_WIDTH = 80

export const COVER_HEIGHT = COVER_WIDTH * 1.4

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  subjectId: 0 as $['subjectId'],
  comic: [] as $['comic']
}