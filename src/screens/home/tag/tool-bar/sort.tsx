/*
 * @Author: czy0729
 * @Date: 2022-06-05 15:30:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-30 11:01:38
 */
import React from 'react'
import { ToolBar as CompToolBar } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { MODEL_TAG_ORDERBY, TAG_ORDERBY } from '@constants'
import { TagOrderCn } from '@types'
import { Ctx } from '../types'

function Sort(props, { $ }: Ctx) {
  const { order } = $.state
  return (
    <CompToolBar.Popover
      data={TAG_ORDERBY.map(item => item.label)}
      icon='md-sort'
      iconColor={_.colorDesc}
      text={order ? MODEL_TAG_ORDERBY.getLabel<TagOrderCn>(order) : '名称'}
      type='desc'
      heatmap='用户标签.排序选择'
      onSelect={$.onOrderSelect}
    />
  )
}

export default obc(Sort)
