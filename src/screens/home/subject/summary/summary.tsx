/*
 * @Author: czy0729
 * @Date: 2019-03-24 05:24:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 01:34:00
 */
import React from 'react'
import { View } from 'react-native'
import { Expand, Text } from '@components'
import { SectionTitle } from '@_'
import { _ } from '@stores'
import { memo } from '@utils/decorators'
import IconTranslate from '../icon/translate'
import IconHidden from '../icon/hidden'
import { DEFAULT_PROPS } from './ds'
import { styles } from './styles'

export default memo(
  ({ showSummary, translateResult, content, onSwitchBlock }) => {
    global.rerender('Subject.Summary.Main')

    return (
      <View
        style={[
          _.container.wind,
          _.mt.sm,
          showSummary && styles.container,
          !showSummary && _.short
        ]}
      >
        <SectionTitle
          right={
            showSummary ? (
              <IconTranslate />
            ) : (
              <IconHidden name='简介' value='showSummary' />
            )
          }
          icon={!showSummary && 'md-navigate-next'}
          onPress={() => onSwitchBlock('showSummary')}
        >
          简介
        </SectionTitle>
        {showSummary && (
          <View>
            {translateResult.length ? (
              <View>
                {translateResult.map((item, index) => (
                  <View key={index} style={_.mt.sm}>
                    <Text style={_.mt.md} type='sub' size={12} selectable>
                      {item.src.trim()}
                    </Text>
                    <Text style={_.mt.sm} size={15} bold selectable>
                      {item.dst.trim()}
                    </Text>
                  </View>
                ))}
              </View>
            ) : (
              !!content && (
                <Expand>
                  <Text style={_.mt.sm} size={15} lineHeight={22} selectable>
                    {content}
                  </Text>
                </Expand>
              )
            )}
          </View>
        )}
      </View>
    )
  },
  DEFAULT_PROPS,
  ({ translateResult, ...other }: { translateResult: any[] }) => ({
    translateResult: translateResult.length,
    ...other
  })
)