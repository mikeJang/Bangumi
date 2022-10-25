/*
 * @Author: czy0729
 * @Date: 2019-06-23 22:20:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-22 10:46:34
 */
import React from 'react'
import { View, Animated } from 'react-native'
import { RenderHtml } from '@components'
import { _ } from '@stores'
import { appNavigate } from '@utils'
import { obc } from '@utils/decorators'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import { Fn } from '@types'
import { TABS } from '../ds'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function About(
  props: {
    ListHeaderComponent: any
    scrollEventThrottle: number
    onScroll: Fn
  },
  { $, navigation }: Ctx
) {
  const styles = memoStyles()

  // 去除APP内高清头像背景的代码
  const sign =
    String($.users.sign).replace(
      /<span style="font-size:0px; line-height:0px;">(.+?)<\/span>/g,
      ''
    ) || '(什么都没有)'

  return (
    <Animated.ScrollView
      ref={ref => {
        const index = TABS.findIndex(item => item.title === '关于TA')
        return $.connectRef(ref, index)
      }}
      contentContainerStyle={styles.contentContainerStyle}
      {...props}
      {...SCROLL_VIEW_RESET_PROPS}
    >
      <View style={styles.page}>
        <RenderHtml
          style={_.mt.lg}
          html={sign}
          onLinkPress={href =>
            appNavigate(
              href,
              navigation,
              {},
              {
                id: '空间.跳转',
                data: {
                  from: '关于TA',
                  userId: $.userId
                }
              }
            )
          }
        />
      </View>
    </Animated.ScrollView>
  )
}

export default obc(About)