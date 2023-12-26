/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "fnx1jxg9zlk67hn",
    "created": "2023-12-26 06:22:28.169Z",
    "updated": "2023-12-26 06:22:28.169Z",
    "name": "cards",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "thncntns",
        "name": "name",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "grzrqb7r",
        "name": "description",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("fnx1jxg9zlk67hn");

  return dao.deleteCollection(collection);
})
