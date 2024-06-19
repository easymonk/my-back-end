import { Client } from "@notionhq/client";

const auth = process.env.NOTION_ACCESS_TOKEN;

const database = process.env.NOTION_DATABASE_QUESTION_ID ?? "";

type Question = any;

export default class NotionService {
  client: Client;

  constructor() {
    this.client = new Client({ auth });
  }

  async query(): Promise<Question[]> {
    const response = await this.client.databases.query({
      database_id: database,
    });

    // return response.results.map((item) => NotionService.transformer(item));
    return response.results
  }

  private static transformer(page: any): Question {
    let data: any = {};

    for (const key in page.properties) {
      switch (page.properties[key].type) {
        case "relation":
          data[key] = page.properties[key].relation[0].id;
          break;

        case "title":
        case "rich_text":
          data[key] =
            page.properties[key][page.properties[key].type][0].text.content;
          break;

        default:
          data[key] = page.properties[key];
          break;
      }
    }

    return data;
  }
  async detail(id: string): Promise<Question> {
    const response = await this.client.pages.retrieve({
      page_id: id,
    });
  
    // return NotionService.transformer(response);
    return response
  }
  async create (): Promise<Question> {
    const response = await this.client.pages.create({
      "cover": null,
      "icon": null,
      "parent": {
        "type": "database_id",
        "database_id": "74bcd939-36bd-4a29-91ad-0c167c717821"
      },
      "properties": {
        "desc": {
          "type": "rich_text",
          "rich_text": [
            {
              "type": "text",
              "text": {
                "content": "我是zheng",
                "link": null
              },
              "annotations": {
                "bold": false,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
            }
          ]
        },
        "prop": {
          "type": "rich_text",
          "rich_text": [
            {
              "type": "text",
              "text": {
                "content": "位置",
                "link": null
              },
              "annotations": {
                "bold": false,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
            }
          ]
        },
        "title": {
          "type": "title",
          "title": [
            {
              "type": "text",
              "text": {
                "content": "成都",
                "link": null
              },
              "annotations": {
                "bold": false,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
            }
          ]
        }
      },
    });
  
    // return NotionService.transformer(response);
    return response
  }
  async update (id: string): Promise<Question> {
    const response = await this.client.pages.update({
      page_id: id,
      "cover": null,
      "icon": null,
      "properties": {
        "desc": {
          "type": "rich_text",
          "rich_text": [
            {
              "type": "text",
              "text": {
                "content": "新描述",
                "link": null
              },
              "annotations": {
                "bold": false,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
            }
          ]
        },
        "prop": {
          "type": "rich_text",
          "rich_text": [
            {
              "type": "text",
              "text": {
                "content": "新性别",
                "link": null
              },
              "annotations": {
                "bold": false,
                "italic": false,
                "strikethrough": false,
                "underline": false,
                "code": false,
                "color": "default"
              },
            }
          ]
        },
      },
    });
  
    // return NotionService.transformer(response);
    return response
  }
}