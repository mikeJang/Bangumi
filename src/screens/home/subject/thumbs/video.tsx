/*
 * @Author: czy0729
 * @Date: 2022-06-21 20:51:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-23 04:00:32
 */
import React from 'react'
import { View } from 'react-native'
import { Image, Flex, Touchable, Text } from '@components'
import { _, systemStore } from '@stores'
import { open } from '@utils'
import { ob } from '@utils/decorators'
import { THUMB_WIDTH, THUMB_HEIGHT } from './ds'
import { styles } from './styles'

function Video({ item, epsThumbsHeader }) {
  const { showCharacter } = systemStore.setting
  if (!showCharacter) return null
  return (
    <View key={item.cover} style={_.mr.sm}>
      <Image
        style={styles.image}
        src={item.cover}
        size={THUMB_WIDTH}
        height={THUMB_HEIGHT}
        radius
        headers={epsThumbsHeader}
      />
      <View style={styles.play}>
        <Touchable style={styles.touch} onPress={() => open(item.src || item.href)}>
          <Flex style={styles.touch} justify='center'>
            <Text style={styles.icon} type='__plain__'>
              ▶
            </Text>
          </Flex>
        </Touchable>
      </View>
      {/* <Text style={styles.title} size={10} numberOfLines={1} align='center'>
        {item.title}
      </Text> */}
    </View>
  )
}

export default ob(Video)
