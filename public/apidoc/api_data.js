define({ "api": [
  {
    "type": "get",
    "url": "/companies",
    "title": "Companies",
    "group": "Sistema",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Mensagem de acesso autorizado</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n {\n       \"companies\": [\n           {\n               \"id\": 3,\n               \"cnpj\": \"22222222222222\",\n               \"createdAt\": \"2019-02-26T01:26:30.065Z\",\n               \"updatedAt\": \"2019-02-26T01:26:30.065Z\"\n           },\n           {\n               \"id\": 4,\n               \"cnpj\": \"11111111111111\",\n               \"createdAt\": \"2019-02-26T01:33:42.295Z\",\n               \"updatedAt\": \"2019-02-26T01:33:42.295Z\"\n           }\n       ]\n   }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/company.js",
    "groupTitle": "Sistema",
    "name": "GetCompanies"
  }
] });
