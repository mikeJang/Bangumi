/*
 * @Author: czy0729
 * @Date: 2021-08-10 00:59:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-31 19:24:56
 */
import React from 'react'
import { View } from 'react-native'
import { Popover, Button as CompButton, Menu } from '@components'
import { _, systemStore } from '@stores'
import { memo, ob } from '@utils/decorators'
import { IOS, WSA } from '@constants'
import { buttonDefaultProps as defaultProps } from '../ds'
import { getType, getPopoverData, getComment } from './utils'
import { memoStyles } from './styles'

const Main = memo(
  ({ styles, heatMap, props, item, eps, isSp, num }) => {
    global.rerender('Eps.Button.Main')

    const {
      subjectId,
      width,
      margin,
      numbersOfLine,
      canPlay,
      login,
      advance,
      userProgress,
      onSelect
      // onLongPress
    } = props
    const isSide = num % numbersOfLine === 0
    const type = getType(userProgress[item.id], item.status)

    const popoverData = getPopoverData(
      item,
      isSp,
      canPlay,
      login,
      advance,
      userProgress
    )
    let popoverProps
    if (IOS) {
      popoverProps = {
        overlay: (
          <Menu
            title={[`ep${item.sort} · ${item.airdate}`]}
            data={popoverData}
            onSelect={value => onSelect(value, item)}
          />
        )
      }
    } else {
      popoverProps = {
        data: popoverData,
        onSelect: value => onSelect(value, item, subjectId)
      }
    }

    const { min, max } = getComment(eps)
    const containerStyle = {
      marginBottom: margin - 2
    }
    const style = {
      marginRight: !_.isLandscape && !_.isPad && !WSA && isSide ? 0 : margin,
      marginBottom: 6
    }
    return (
      <View style={containerStyle}>
        <Popover
          style={style}
          // onLongPress={() => onLongPress(item)}
          {...popoverProps}
        >
          <CompButton
            type={type}
            size='sm'
            style={{
              width,
              height: width
            }}
          >
            {item.sort}
          </CompButton>
          {heatMap && (
            <View
              style={[
                styles.bar,
                {
                  opacity: (item.comment - min / 1.68) / max // 1.68 是比率, 增大少回复与高回复的透明度幅度
                }
              ]}
            />
          )}
        </Popover>
      </View>
    )
  },
  defaultProps,
  ({ props, item, eps, isSp, num }) => {
    const { userProgress = {}, ...otherProps } = props
    return {
      props: otherProps,
      userProgress: userProgress[item.id],
      item,
      eps: eps.length,
      isSp,
      num
    }
  }
)

export const Button = ob(props => (
  <Main styles={memoStyles()} heatMap={systemStore.setting.heatMap} {...props} />
))
