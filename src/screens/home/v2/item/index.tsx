/*
 * @Author: czy0729
 * @Date: 2021-08-09 08:04:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-12 15:09:57
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Touchable, Accordion, Heatmap } from '@components'
import { _ } from '@stores'
import { memo, obc } from '@utils/decorators'
import Cover from './cover'
import Title from './title'
import OnAir from './onair'
import Eps from './eps'
import Count from './count'
import ToolBar from './tool-bar'
import Progress from './progress'
import { LIMIT_HEAVY, TITLE_HIT_SLOPS } from './ds'

const defaultProps = {
  navigation: {},
  styles: {},
  index: 0,
  subject: {},
  subjectId: 0,
  epStatus: '',
  heatMap: false,
  expand: false,
  epsCount: 0,
  isTop: false,
  onItemPress: Function.prototype
}

const Item = memo(
  ({
    navigation,
    styles,
    index,
    subject,
    subjectId,
    epStatus,
    heatMap,
    expand,
    epsCount,
    isTop,
    onItemPress
  }) => {
    global.rerender('Home.Item.Main', subject.name_cn || subject.name)

    return (
      <View style={heatMap && expand ? styles.itemWithHeatMap : styles.item}>
        <Flex style={styles.hd}>
          <Cover index={index} subjectId={subjectId} subject={subject} />
          <Flex.Item style={styles.content}>
            <Touchable
              style={styles.title}
              withoutFeedback
              hitSlop={TITLE_HIT_SLOPS}
              onPress={() => onItemPress(navigation, subjectId, subject)}
            >
              <Flex align='start'>
                <Flex.Item>
                  <Title subjectId={subjectId} subject={subject} />
                </Flex.Item>
                <OnAir subjectId={subjectId} />
              </Flex>
            </Touchable>
            <View>
              <Flex style={styles.info}>
                <Count
                  index={index}
                  subjectId={subjectId}
                  subject={subject}
                  epStatus={epStatus}
                />
                <Flex.Item />
                <ToolBar
                  index={index}
                  subjectId={subjectId}
                  subject={subject}
                  isTop={isTop}
                />
              </Flex>
              <Progress epStatus={epStatus} subject={subject} />
            </View>
          </Flex.Item>
          {index === 1 && (
            <View>
              <Heatmap id='首页.置顶或取消置顶' />
            </View>
          )}
        </Flex>
        <Accordion key={String(epsCount)} expand={expand}>
          <Eps subjectId={subjectId} />
        </Accordion>
        {isTop && <View style={styles.dot} />}
      </View>
    )
  },
  defaultProps
)

export default obc(
  ({ index = 0, subjectId = 0, subject = {}, epStatus = '' }, { $, navigation }) => {
    // rerender('Home.Item', subject.name_cn || subject.name)

    const { _mounted } = $.state
    if (index >= LIMIT_HEAVY && !_mounted) {
      const styles = memoStylesLazy()
      return <View style={styles.lazy} />
    }

    const styles = memoStyles()
    const { expand } = $.$Item(subjectId)
    const { top } = $.state
    const isTop = top.indexOf(subjectId) !== -1
    return (
      <Item
        navigation={navigation}
        styles={styles}
        index={index}
        subject={subject}
        subjectId={subjectId}
        epStatus={epStatus}
        heatMap={$.heatMap}
        isTop={isTop}
        expand={expand}
        epsCount={$.eps(subjectId).length}
        onItemPress={$.onItemPress}
      />
    )
  }
)

const memoStylesLazy = _.memoStyles(() => ({
  lazy: {
    height: 150,
    backgroundColor: _.colorPlain,
    borderBottomWidth: 8,
    borderBottomColor: _.colorBg
  }
}))

const memoStyles = _.memoStyles(() => {
  const needWind = _.isMobileLanscape || _.isPad
  return {
    item: {
      paddingVertical: _._wind * _.ratio,
      paddingRight: needWind ? _.wind - _._wind : 0,
      paddingLeft: needWind ? _.wind : _._wind,
      backgroundColor: _.colorPlain,
      borderBottomWidth: 8,
      borderBottomColor: _.colorBg
    },
    itemWithHeatMap: {
      paddingTop: _._wind * _.ratio,
      paddingRight: needWind ? _.wind - _._wind : 0,
      paddingBottom: (_._wind + 4) * _.ratio,
      paddingLeft: needWind ? _.wind : _._wind,
      backgroundColor: _.colorPlain,
      borderBottomWidth: 8,
      borderBottomColor: _.colorBg
    },
    hd: {
      paddingRight: _._wind
    },
    content: {
      marginLeft: _._wind
    },
    title: {
      minHeight: 60 * _.ratio
    },
    info: {
      height: 40 * _.ratio
    },
    dot: {
      position: 'absolute',
      top: _.r(4),
      right: _.r(-2),
      borderWidth: _.r(8),
      borderTopColor: 'transparent',
      borderBottomColor: 'transparent',
      borderRightColor: 'transparent',
      borderLeftColor: _.colorIcon,
      transform: [
        {
          rotate: '-45deg'
        }
      ],
      opacity: 0.8
    }
  }
})