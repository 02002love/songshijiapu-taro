/*
 * @Author: songjinwei1 songjinwei1@yiche.com
 * @Date: 2024-02-08 15:39:18
 * @LastEditors: songjinwei1 songjinwei1@yiche.com
 * @LastEditTime: 2024-02-18 10:40:21
 * @FilePath: /songshijiapu-taro/src/app.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by YICHE, All Rights Reserved. 
 */
import { PropsWithChildren } from 'react'
import { useLaunch } from '@tarojs/taro'
import 'taro-ui/dist/style/index.scss' // 全局引入一次即可
import './app.less'

function App({ children }: PropsWithChildren) {

  useLaunch(() => {
    console.log('App launched.')
  })

  // children 是将要会渲染的页面
  return children
}

export default App
