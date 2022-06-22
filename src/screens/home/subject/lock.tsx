/*
 * @Author: czy0729
 * @Date: 2019-12-28 15:16:33
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-23 01:44:15
 */
import React from 'react'
import { Flex, Mesume, Text } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

function Lock(props, { $ }) {
  if (!$.lock) return null

  const styles = memoStyles()
  return (
    <Flex style={styles.container}>
      <Mesume index={2} size={72} />
      <Flex.Item>
        <Text type='main' size={16} bold>
          条目已锁定
        </Text>
        <Text style={_.mt.sm} type='sub'>
          不符合收录原则，条目及相关收藏、讨论、关联等内容将会随时被移除
        </Text>
      </Flex.Item>
    </Flex>
  )
}

export default obc(Lock)

const memoStyles = _.memoStyles(() => ({
  container: {
    paddingVertical: _.md,
    paddingRight: _.wind,
    paddingLeft: _.xs,
    margin: _.wind,
    borderWidth: 1,
    borderColor: _.colorMain,
    borderRadius: _.radiusSm
  }
}))
