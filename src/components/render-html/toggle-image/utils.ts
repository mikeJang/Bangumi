/*
 * @Author: czy0729
 * @Date: 2022-09-27 16:47:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-11 10:00:46
 */
import axios from '@utils/thirdParty/axios'

const CACHE = {}

/** 获取远程图片的大小 */
export function getSize(url: string): Promise<number> {
  return new Promise(resolve => {
    if (url in CACHE) {
      resolve(CACHE[url])
      return
    }

    axios
      // @ts-expect-error
      .head(url)
      .then((response: { status: number; headers: { [x: string]: any } }) => {
        if (response?.status !== 200) {
          CACHE[url] = 0
          resolve(CACHE[url])
          return
        }

        const length = response?.headers?.['content-length']
        CACHE[url] = parseInt(String(length / 1024))
        resolve(CACHE[url])
      })
      .catch(() => {
        CACHE[url] = 0
        resolve(CACHE[url])
      })
  })
}
