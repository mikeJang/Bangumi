/*
 * @Author: czy0729
 * @Date: 2021-06-26 05:09:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-14 18:51:38
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { getStorage, setStorage } from '@utils'
import { obc } from '@utils/decorators'
import { FLITER_SWITCH_LAST_PATH_KEY, FILTER_SWITCH_DS, PATH_MAP } from './ds'
import { memoStyles } from './styles'
import { Props as FilterSwitchProps } from './types'

export { FilterSwitchProps }

export async function getLastPath() {
  const path = await getStorage(FLITER_SWITCH_LAST_PATH_KEY)
  return path || PATH_MAP[FILTER_SWITCH_DS[0]]
}

export const FilterSwitch = obc(
  (
    { title = '频道', name = FILTER_SWITCH_DS[0] }: FilterSwitchProps,
    { navigation }
  ) => {
    const styles = memoStyles()
    return (
      <Flex style={styles.row}>
        <View>
          <Text size={12} bold>
            {title}
          </Text>
        </View>
        <Flex.Item style={_.ml.md}>
          <ScrollView
            style={styles.contentContainerStyle}
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            overScrollMode='never'
          >
            {FILTER_SWITCH_DS.map(item => {
              const isActive = name === item
              return (
                <Touchable
                  key={item}
                  style={[styles.item, isActive && styles.itemActive]}
                  onPress={
                    isActive
                      ? undefined
                      : () => {
                          setStorage(FLITER_SWITCH_LAST_PATH_KEY, PATH_MAP[item])
                          navigation.replace(PATH_MAP[item])
                        }
                  }
                >
                  <Text size={11}>{item}</Text>
                </Touchable>
              )
            })}
          </ScrollView>
        </Flex.Item>
      </Flex>
    )
  }
)