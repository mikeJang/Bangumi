/*
 * @Author: czy0729
 * @Date: 2023-04-12 09:06:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-13 19:55:50
 */
import React from 'react'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { STORYBOOK } from '@constants'
import { Skeleton as SkeletonComp } from '../../skeleton'

function Skeleton({ style, textOnly, placeholder, loaded }) {
  if (STORYBOOK || textOnly || !placeholder || loaded) return null

  const { width, height } = _.flatten(style)
  return <SkeletonComp width={width} height={height} />
}

export default observer(Skeleton)