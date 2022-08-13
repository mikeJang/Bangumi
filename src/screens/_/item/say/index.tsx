/*
 * @Author: czy0729
 * @Date: 2020-11-11 11:58:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-12 06:47:08
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, RenderHtml } from '@components'
import { _ } from '@stores'
import { appNavigate } from '@utils/app'
import { obc } from '@utils/decorators'
import { EVENT } from '@constants'
import { Avatar, Name } from '../../base'
import { memoStyles } from './styles'
import { Props as ItemSayProps } from './types'

export { ItemSayProps }

export const ItemSay = obc(
  (
    {
      event = EVENT,
      index,
      position = 'left',
      avatar,
      showName,
      name,
      text,
      id,
      format = true,
      onLongPress = () => {}
    }: ItemSayProps,
    { navigation }
  ) => {
    const styles = memoStyles()
    if (position === 'right') {
      return (
        <Flex key={index} style={showName ? _.mt.md : _.mt.sm} align='start'>
          <Flex.Item style={styles.contentRight}>
            <Flex direction='column' align='end'>
              {showName && (
                <Text style={_.mr.sm} size={11} type='title' bold>
                  {name}
                </Text>
              )}
              <View style={[styles.text, styles.textActive, _.mt.xs]}>
                <RenderHtml
                  baseFontStyle={styles.baseFontStyleRight}
                  linkStyle={styles.linkStyleRight}
                  html={format ? getBgmHtml(text) : text}
                  onLinkPress={href => appNavigate(href, navigation, {}, event)}
                />
              </View>
            </Flex>
          </Flex.Item>
          <Flex style={styles.avatarWrapRight} justify='center'>
            <Avatar
              navigation={navigation}
              src={avatar}
              size={34}
              userId={id}
              name={name}
              borderWidth={0}
              round
              event={event}
            />
          </Flex>
        </Flex>
      )
    }

    return (
      <Flex key={index} style={showName ? _.mt.md : _.mt.sm} align='start'>
        <Flex style={styles.avatarWrapLeft} justify='center'>
          <Avatar
            navigation={navigation}
            src={avatar}
            size={34}
            userId={id}
            name={name}
            round
            borderWidth={0}
            event={event}
            onLongPress={onLongPress}
          />
        </Flex>
        <Flex.Item style={styles.contentLeft}>
          <Flex direction='column' align='start'>
            {showName && (
              <Name style={_.ml.sm} userId={id} showFriend size={11} type='title' bold>
                {name}
              </Name>
            )}
            <View style={[styles.text, _.mt.xs]}>
              <RenderHtml
                baseFontStyle={styles.baseFontStyle}
                html={format ? getBgmHtml(text) : text}
                onLinkPress={href => appNavigate(href, navigation, {}, event)}
              />
            </View>
          </Flex>
        </Flex.Item>
      </Flex>
    )
  }
)

function getBgmHtml(html = '') {
  let _html = html
  const matchs = _html.match(/\(bgm\d+\)/g) || []
  if (matchs.length) {
    matchs.forEach(item => {
      const index = parseInt(item.match(/\d+/g)[0])

      // 防止2连同一个bgm表情, 替换不了后面的
      _html = _html.replace(item, `<img smileid alt="(bgm~~~${index})" />`)
    })
  }

  return _html.replace(/~~~/g, '')
}
