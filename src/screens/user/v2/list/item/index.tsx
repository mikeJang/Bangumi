/*
 * @Author: czy0729
 * @Date: 2023-03-21 17:22:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-19 20:26:16
 */
import React from 'react'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import ItemList from '../item-list'
import ItemGrid from '../item-grid'

function Item({ item, index, page, numColumns }, { $ }: Ctx) {
  const { list } = $.state
  if (list) return <ItemList item={item} index={index} page={page} />

  return <ItemGrid item={item} numColumns={numColumns} />
}

export default obc(Item)
