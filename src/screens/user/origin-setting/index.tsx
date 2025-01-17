/*
 * @Author: czy0729
 * @Date: 2022-03-22 16:58:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-19 07:24:23
 */
import React from 'react'
import { Page, ScrollView } from '@components'
import { ic } from '@utils/decorators'
import { useRunAfter, useObserver } from '@utils/hooks'
import Header from './header'
import Cloud from './cloud'
import List from './list'
import Store from './store'
import { memoStyles } from './styles'
import { Ctx } from './types'

const OriginSetting = (props, { $ }: Ctx) => {
  useRunAfter(() => {
    $.init()
  })

  return useObserver(() => {
    const styles = memoStyles()
    const { _loaded, active } = $.state
    return (
      <>
        <Header />
        <Page loaded={_loaded}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <Cloud active={active} onToggle={$.onToggle} onDownloaded={$.init} />
            <List />
          </ScrollView>
        </Page>
      </>
    )
  })
}

export default ic(Store, OriginSetting)
