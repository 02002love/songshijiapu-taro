/*
 * @Author: songjinwei1 songjinwei1@yiche.com
 * @Date: 2024-02-07 15:43:24
 * @LastEditors: songjinwei1 songjinwei1@yiche.com
 * @LastEditTime: 2024-02-08 16:56:52
 * @FilePath: /songshijiapu-taro/src/util/toolFunction.ts
 * @Description: 
 * 
 * Copyright (c) 2024 by YICHE, All Rights Reserved. 
 */


export const numberToChinese = (num: number, isGen?: boolean): string => {
  var units = ['', '十', '百', '千', '万', '十万', '百万', '千万', '亿'];
  var digits = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  var generateNum = ['', '长', '次', '三', '四', '五', '六', '七', '八', '九'];

  var result = String(num).replace(/./g, function (digit, index, array) {
    if (isGen) {
      return generateNum[Number(digit)] + units[array.length - index - 1];
    } else {
      return digits[Number(digit)] + units[array.length - index - 1];
    }
  });

  return result;
}