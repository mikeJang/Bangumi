/*
 * @Author: czy0729
 * @Date: 2020-07-15 11:51:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-04-12 17:04:44
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Loading, Heatmap } from '@components'
import { IconHeader } from '@screens/_'
import { _ } from '@stores'
import { inject, withHeader, obc } from '@utils/decorators'
import IconLayout from './icon-layout'
import List from './list'
import Store from './store'

const title = '找番剧'

export default
@inject(Store)
@withHeader({
  screen: title,
  alias: 'Anime',
  hm: ['anime', 'Anime']
})
@obc
class Anime extends React.Component {
  componentDidMount() {
    const { $, navigation } = this.context
    $.init()

    navigation.setParams({
      extra: (
        <Flex style={_.mr._right}>
          <IconLayout $={$} />
          <IconHeader name='md-vertical-align-top' onPress={$.scrollToTop}>
            <Heatmap id='Anime.到顶' />
          </IconHeader>
        </Flex>
      )
    })
  }

  componentWillUnmount() {
    const { $ } = this.context
    $.scrollToOffset = null
  }

  render() {
    const { $ } = this.context
    const { _loaded } = $.state
    return (
      <View style={_.container.plain}>{!_loaded ? <Loading /> : <List />}</View>
    )
  }
}
