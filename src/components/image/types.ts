/*
 * @Author: czy0729
 * @Date: 2022-05-03 21:15:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-03 23:02:48
 */
import { ImageProps } from 'react-native'
import { Expand, ViewStyle, ImageStyle, EventType } from '@types'

type Source = {
  uri?: string
  headers?: {
    [key: string]: string
  }
}

export type Props = Expand<
  Omit<ImageProps, 'source'> & {
    /** 图片容器的样式 */
    style?: ViewStyle

    /** 强制传递给图片的样式 */
    imageStyle?: ImageStyle

    /** 图片地址 */
    src?: Source | string | number

    /** 此组件禁用source */
    // source: never

    /** 大小 | 宽度 */
    size?: number

    /** 高度 */
    height?: number

    /** 是否带边框 */
    border?: number | boolean

    /** 是否带边框 */
    borderWidth?: number

    /** 是否带圆角 */
    radius?: number | boolean

    /** 是否带阴影 */
    shadow?: boolean | 'lg'

    /** 是否有底色 */
    placeholder?: boolean

    /** 支持自动计算远端图片高度, 传递图片的宽度, 高度适应比例 */
    autoSize?: number | boolean

    /** 是否自动选择Bangumi图片质量 */
    quality?: boolean

    /** 是否点击显示全局的ImageViewer, 此值打开会覆盖onPress */
    imageViewer?: boolean

    /** 若有值, 打开ImageViewer时使用此src */
    imageViewerSrc?: string

    /** 埋点事件 */
    event?: EventType

    /** <Touchable> delay */
    delay?: boolean

    /** 是否本地缓存  */
    cache?: boolean

    /** 图片请求头 */
    headers?: object

    /** 开发模式，强制不显示图片 */
    textOnly?: boolean

    /** 是否退回使用 rn 的 <Image> (安卓 only) */
    fallback?: boolean

    /** 图片点击回调 */
    onPress?: (arg0?: any) => any

    /** 图片长按回调 */
    onLongPress?: (arg0?: any) => any

    /** 图片加载失败回调 */
    onError?: (arg0?: any) => any
  }
>