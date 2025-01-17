/*
 * @Author: czy0729
 * @Date: 2022-07-30 11:02:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-26 20:44:54
 */
import React from 'react'
import { Header as CompHeader, Heatmap } from '@components'
import { open } from '@utils'
import { t } from '@utils/fetch'
import { obc } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { SubjectTypeCn } from '@types'
import { Ctx } from '../types'

function Header(props, { $ }: Ctx) {
  const { type, tag } = $.params
  return (
    <CompHeader
      title={tag || `${MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(type)}标签`}
      alias='用户标签'
      hm={[$.url, 'Tag']}
      headerRight={() => (
        <CompHeader.Popover
          data={['浏览器查看']}
          onSelect={key => {
            if (key === '浏览器查看') {
              t('用户标签.右上角菜单', { key })
              open($.url)
            }
          }}
        >
          <Heatmap id='用户标签.右上角菜单' />
        </CompHeader.Popover>
      )}
    />
  )
}

export default obc(Header)
