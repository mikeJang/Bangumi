/*
 * @Author: czy0729
 * @Date: 2023-02-24 16:22:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-24 17:17:23
 */
import React from 'react'
import { Flex, Touchable, Text } from '@components'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import { memoStyles } from './styles'

function Tags(props, { $ }: Ctx) {
  const styles = memoStyles()
  const { tags, more } = $.state
  const tagsCount = $.tagsCount()
  return (
    <Flex style={styles.tags} wrap='wrap'>
      {$.memoTags.map(item => {
        const isActive = tags.includes(item)
        return (
          !!tagsCount[item] && (
            <Touchable
              key={item}
              style={styles.touch}
              onPress={() => $.onSelectTag(item.split(' ')?.[0])}
            >
              <Text
                style={styles.tag}
                type={isActive ? 'main' : 'title'}
                size={11}
                bold
              >
                {item}
                <Text type={isActive ? 'main' : 'sub'} size={10} lineHeight={11} bold>
                  {' '}
                  {tagsCount[item]}
                </Text>
              </Text>
            </Touchable>
          )
        )
      })}
      <Touchable style={styles.touch} onPress={$.onToggleTags}>
        <Text style={styles.tagMore} type='title' size={11} bold>
          {more ? '收起' : '展开'}
        </Text>
      </Touchable>
    </Flex>
  )
}

export default obc(Tags)
