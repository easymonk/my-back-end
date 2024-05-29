import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1716970097749_2936',
  koa: {
    port: 7001,
  },
  tableStore: {
    client: {
      accessKeyId: process.env.accessKeyId,
      secretAccessKey: process.env.secretAccessKey,
      endpoint: 'https://easymonkOTS.cn-beijing.ots.aliyuncs.com',
      instancename: 'easymonkOTS',
    },
  },
} as MidwayConfig;
