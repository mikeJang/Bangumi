/*
 * @Author: czy0729
 * @Date: 2021-01-21 15:47:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-14 06:36:16
 */
import React from 'react'
import { Flex } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import BtnEpNext from './btn-ep-next'
import BtnFavor from './btn-favor'
import BtnOrigin from './btn-origin'

function ToolBar({ index, subjectId, subject, isTop }) {
  return (
    <Flex style={styles.toolBar}>
      <BtnOrigin subjectId={subjectId} isTop={isTop} />
      <BtnEpNext subjectId={subjectId} />
      <BtnFavor index={index} subjectId={subjectId} subject={subject} />
    </Flex>
  )
}

export default ob(ToolBar)

const styles = _.create({
  toolBar: {
    marginRight: -_._wind / 2 - 3
  }
})