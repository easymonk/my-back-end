import { Provide, Inject } from '@midwayjs/core';
// import { IUserOptions } from '../interface';
import {
  TableStoreService,
  Condition,
  RowExistenceExpectation,
} from '@midwayjs/tablestore';

@Provide()
export class UserService {
  @Inject()
  tableStoreService: TableStoreService;

  async getUser(options: any) {
    const data = await this.tableStoreService.getRow({
      tableName: 'todos',
      primaryKey: [{ key: 'list66' }],
      // columnFilter: condition,
    });
    let res = [];
    console.log('getRow--', data.row);
    res = JSON.parse(data.row.attributes[0].columnValue);
    // return {
    //   uid: options.uid,
    //   username: 'mockedName',
    //   phone: '12345678901',
    //   email: 'xxx.xxx@xxx.com',
    // };
    return res;
  }
  async putUser(options: any) {
    console.log('putRow--', options);
    const data = await this.tableStoreService.deleteRow({
      tableName: 'todos',
      primaryKey: [{ key: 'list1' }],
      condition: new Condition(RowExistenceExpectation.IGNORE, null),
      // columnFilter: condition,
      // updateOfAttributeColumns: [
      //   {
      //     PUT: [{ data: JSON.stringify([options]) }],
      //   },
      // ],
    });
    // let res = [];
    // res = JSON.parse(data.row.attributes[0].columnValue);

    // return {
    //   uid: options.uid,
    //   username: 'mockedName',
    //   phone: '12345678901',
    //   email: 'xxx.xxx@xxx.com',
    // };
    return data;
  }
  async getTodos(options: any) {
    const data = await this.tableStoreService.getRow({
      tableName: 'todos',
      primaryKey: [{ key: 'listTodo' }],
      // columnFilter: condition,
    });
    let res = [];
    console.log('getRow--', data.row);
    if (data.row.attributes.length < 1) {
      return [];
    }
    res = JSON.parse(data.row.attributes[0].columnValue);
    // return {
    //   uid: options.uid,
    //   username: 'mockedName',
    //   phone: '12345678901',
    //   email: 'xxx.xxx@xxx.com',
    // };
    return res;
  }
  async putTodos(options: any) {
    const list = await this.getTodos({ page: 0 });
    console.log('putRow--', list);
    list.unshift({ ...options, uId: +new Date(), status: 0 });
    await this.tableStoreService.updateRow({
      tableName: 'todos',
      primaryKey: [{ key: 'listTodo' }],
      condition: new Condition(RowExistenceExpectation.IGNORE, null),
      // columnFilter: condition,
      updateOfAttributeColumns: [
        {
          PUT: [{ data: JSON.stringify(list) }],
        },
      ],
    });
    return list;
  }
  async updateTodos(options: any) {
    const list = await this.getTodos({ page: 0 });
    console.log('updateTodos--', list);
    const target = list.findIndex(todo => todo.uId === +options.uId);
    const newRule = {
      ...list[target],
      desc: options.desc,
      title: options.title,
      status: options.status,
    };
    list[target] = newRule;
    await this.tableStoreService.updateRow({
      tableName: 'todos',
      primaryKey: [{ key: 'listTodo' }],
      condition: new Condition(RowExistenceExpectation.IGNORE, null),
      // columnFilter: condition,
      updateOfAttributeColumns: [
        {
          PUT: [{ data: JSON.stringify(list) }],
        },
      ],
    });
    return list;
  }
  async deleteTodos(options: any) {
    let list = await this.getTodos({ page: 0 });
    console.log('deleteTodos--', list);
    list = list.filter(item => +options.uId.indexOf(item.uId) === -1);
    await this.tableStoreService.updateRow({
      tableName: 'todos',
      primaryKey: [{ key: 'listTodo' }],
      condition: new Condition(RowExistenceExpectation.IGNORE, null),
      // columnFilter: condition,
      updateOfAttributeColumns: [
        {
          PUT: [{ data: JSON.stringify(list) }],
        },
      ],
    });
    return list;
  }
}
