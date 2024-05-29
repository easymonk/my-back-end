import {
  Provide,
  Inject,
  ServerlessTrigger,
  ServerlessTriggerType,
  Query,
} from '@midwayjs/core';
import { Context } from '@midwayjs/faas';

@Provide()
export class HelloCopyHTTPService {
  @Inject()
  ctx: Context;

  @ServerlessTrigger(ServerlessTriggerType.HTTP, {
    functionName: 'helloCopy',
    name: 'http',
    path: '/helloCopy',
    method: 'get',
  })
  async handleHTTPEvent(@Query('name') name = 'midwayjs') {
    return `Hello ${name}`;
  }
}
