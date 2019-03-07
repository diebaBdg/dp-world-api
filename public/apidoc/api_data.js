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
            "type": "Array",
            "optional": false,
            "field": "companies",
            "description": "<p>List of companies</p>"
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
  },
  {
    "type": "get",
    "url": "/document-types",
    "title": "DocumentTypes",
    "group": "Sistema",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "DocumentTypes",
            "description": "<p>List of Document Types</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n\"documentTypes\": [\n      {\n          \"id\": 5,\n          \"description\": \"Empresa\",\n          \"createdAt\": \"2019-03-05T23:21:09.702Z\",\n          \"updatedAt\": \"2019-03-05T23:21:09.702Z\"\n      },\n      {\n          \"id\": 6,\n          \"description\": \"Colaborador\",\n          \"createdAt\": \"2019-03-05T23:21:09.702Z\",\n          \"updatedAt\": \"2019-03-05T23:21:09.702Z\"\n      },\n      {\n          \"id\": 7,\n          \"description\": \"Mensais\",\n          \"createdAt\": \"2019-03-05T23:21:09.702Z\",\n          \"updatedAt\": \"2019-03-05T23:21:09.702Z\"\n      },\n      {\n          \"id\": 8,\n          \"description\": \"Mensais colaborador\",\n          \"createdAt\": \"2019-03-05T23:21:09.702Z\",\n          \"updatedAt\": \"2019-03-05T23:21:09.702Z\"\n      }\n  ]\n  }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/document-type.js",
    "groupTitle": "Sistema",
    "name": "GetDocumentTypes"
  },
  {
    "type": "get",
    "url": "/documents",
    "title": "Documents",
    "group": "Sistema",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "documents",
            "description": "<p>List of documents</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "   HTTP/1.1 200 OK\n    {\n  \"companies\": [\n      {\n          \"id\": 3,\n          \"description\": \"Documento Teste\",\n          \"status\": 1,\n          \"createdAt\": \"2019-03-06T02:29:06.613Z\",\n          \"updatedAt\": \"2019-03-06T02:29:06.613Z\",\n          \"DocumentTypeId\": 5\n      },\n      {\n          \"id\": 4,\n          \"description\": \"Documento Teste\",\n          \"status\": 1,\n          \"createdAt\": \"2019-03-06T22:52:28.186Z\",\n          \"updatedAt\": \"2019-03-06T22:52:28.186Z\",\n          \"DocumentTypeId\": 5\n      }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/document.js",
    "groupTitle": "Sistema",
    "name": "GetDocuments"
  },
  {
    "type": "get",
    "url": "/functions",
    "title": "Functions",
    "group": "Sistema",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "functions",
            "description": "<p>List of functions</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": " HTTP/1.1 200 OK\n {\n \"functions\": [\n       {\n           \"id\": 9,\n           \"description\": \"Soldador\",\n           \"createdAt\": \"2019-03-05T23:21:09.685Z\",\n           \"updatedAt\": \"2019-03-05T23:21:09.685Z\"\n       },\n       {\n           \"id\": 10,\n           \"description\": \"Operador de Máquinas\",\n           \"createdAt\": \"2019-03-05T23:21:09.686Z\",\n           \"updatedAt\": \"2019-03-05T23:21:09.686Z\"\n       }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/function.js",
    "groupTitle": "Sistema",
    "name": "GetFunctions"
  },
  {
    "type": "post",
    "url": "/companies",
    "title": "Companies",
    "group": "Sistema",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "company",
            "description": "<p>Companie inserted</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso",
          "content": "HTTP/1.1 200 OK\n {\n       \"id\": 19,\n       \"cnpj\": \"33333333333333\",\n       \"updatedAt\": \"2019-03-04T20:20:01.453Z\",\n       \"createdAt\": \"2019-03-04T20:20:01.453Z\"\n   }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/company.js",
    "groupTitle": "Sistema",
    "name": "PostCompanies"
  },
  {
    "type": "post",
    "url": "/documents",
    "title": "Documents",
    "group": "Sistema",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "document",
            "description": "<p>Document inserted</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n {\n       \"id\": 19,\n       \"cnpj\": \"33333333333333\",\n       \"updatedAt\": \"2019-03-04T20:20:01.453Z\",\n       \"createdAt\": \"2019-03-04T20:20:01.453Z\"\n   }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/document.js",
    "groupTitle": "Sistema",
    "name": "PostDocuments"
  },
  {
    "type": "post",
    "url": "/functions",
    "title": "Functions",
    "group": "Sistema",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Array",
            "optional": false,
            "field": "description",
            "description": "<p>The function description.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Json",
            "optional": false,
            "field": "function",
            "description": "<p>Function inserted</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 200 OK\n{\n      \"id\": 17,\n      \"description\": \"Mecanico de balão\",\n      \"updatedAt\": \"2019-03-07T00:30:06.478Z\",\n      \"createdAt\": \"2019-03-07T00:30:06.478Z\"\n }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "routes/function.js",
    "groupTitle": "Sistema",
    "name": "PostFunctions"
  }
] });
