import { Inject, Controller, Get, Query } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';

@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Get('/get_user')
  async getUser(@Query('uid') uid) {
    const user = await this.userService.getUser({ uid });
    return { success: true, message: 'OK', data: user };
  }
  @Get('/put_user')
  async putUser() {
    const params = {
      status: 0,
      ...this.ctx.query,
      key: +new Date(),
    };
    // return params;
    const user = await this.userService.putUser(params);
    return { success: true, message: 'OK', data: user };
  }
  @Get('/get_todos')
  async getTodos(@Query('page') page) {
    const todos = await this.userService.getTodos({ page });
    return { success: true, message: 'OK', data: todos };
  }

  @Get('/put_todos')
  async putTodos(@Query('title') title, @Query('desc') desc) {
    const todos = await this.userService.putTodos({ title, desc });
    return { success: true, message: 'OK', data: todos };
  }

  @Get('/update_todos')
  async updateTodos() {
    const todos = await this.userService.updateTodos(this.ctx.query);
    return { success: true, message: 'OK', data: todos };
  }

  @Get('/delete_todos')
  async deleteTodos() {
    const todos = await this.userService.deleteTodos({
      uId: this.ctx.query.uId,
    });
    return { success: true, message: 'OK', data: todos };
  }
}
