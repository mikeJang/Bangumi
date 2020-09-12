/*
 * @Author: czy0729
 * @Date: 2019-05-07 19:45:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-09-13 00:05:16
 */
import {
  Alert,
  Vibration
  // ToastAndroid
} from 'react-native'
import { Toast } from '@ant-design/react-native'
import ActionSheet from '@components/@/ant-design/action-sheet'
import { DEV } from '@constants'

function getSetting() {
  const systemStore = require('../stores/system').default
  const { setting } = systemStore
  return setting
}

/**
 * 轻震动反馈
 */
export function feedback() {
  const { vibration } = getSetting()
  if (!vibration) {
    return false
  }

  if (DEV) {
    log('vibration')
  }

  return Vibration.vibrate(24)
}

/**
 * 确定框
 * @param {*} content
 * @param {*} title
 * @param {*} onPress
 * @param {*} onCancelPress
 */
export function confirm(
  content,
  onPress,
  title = '提示',
  onCancelPress = Function.prototype
) {
  return Alert.alert(title, content, [
    {
      text: '取消',
      style: 'cancel',
      onPress: onCancelPress
    },
    {
      text: '确定',
      onPress
    }
  ])
}

/**
 * 轻提示
 * @param {*} content
 * @param {*} duration
 */
export function info(
  content = '网络错误',
  duration = 2.4,
  onClose = Function.prototype,
  mask = false
) {
  Toast.info(content, duration, onClose, mask)

  // if (IOS) {
  //   Toast.info(content, duration, onClose, mask)
  // } else {
  //   ToastAndroid.show(content, ToastAndroid.SHORT)
  // }
}

/**
 * 显示ActionSheet
 * https://rn.mobile.ant.design/components/action-sheet-cn/
 * @param {*} options
 * @param {*} callback
 */
export function showActionSheet(
  options = [],
  callback = Function.prototype,
  { title, message, cancelButtonIndex, destructiveButtonIndex } = {}
) {
  ActionSheet.showActionSheetWithOptions(
    {
      title,
      message,
      options,
      cancelButtonIndex,
      destructiveButtonIndex
    },
    callback
  )
}

/**
 * 显示ImageViewer
 * @param {*} imageUrls
 */
export function showImageViewer(imageUrls = []) {
  if (!Array.isArray(imageUrls) && imageUrls.length === 0) {
    return
  }

  const systemStore = require('../stores/system').default
  systemStore.showImageViewer(imageUrls)
}
