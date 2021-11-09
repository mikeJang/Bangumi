/*
 * @Author: czy0729
 * @Date: 2021-11-09 14:53:02
 * @Last Modified by:   czy0729
 * @Last Modified time: 2021-11-09 14:53:02
 */
import { IOS } from '@constants'

let RNFetchBlob
if (IOS) {
  RNFetchBlob = {}
} else {
  RNFetchBlob = require('rn-fetch-blob')
}

export default RNFetchBlob