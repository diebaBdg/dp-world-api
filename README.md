# KINTEGRADO (API)

Kintegrado é uma aplicação web que facilita a integração de colaboradores proprios ou terceiros em empresas, automatizando o processo desde o envio de documentos até a integração.

Este projeto contém o back-end da aplicação em formato de API RestFull.

Acesse o font-end em: https://github.com/cleytonlang/dp-world-front.

## Getting Started

### Requisitos

Git

Node JS 8.x ou superior

Postgres

### Baixar projeto e suas bibliotecas

Clone o projeto com o comando:

```
git clone https://github.com/velosojonathan5/dp-world-api.git
```

Na raiz do projeto baixe as bibliotecas com o comando:
```
npm install
```
### Configurar banco de dados

No Postgres crie um banco de dados chamado dp_world.

Insira as configurações de acesso ao banco de dados no arquivo ./config/database.json no item "development".

Crie as tabelas com o comando:
```
sequelize db:migrate
```
Popule as tabelas com o comando:
```
sequelize db:seed:all
```

### Rodar a aplicação

Rode a aplicação com o comando:
```
node index.js
```

### Documentação da API

Baixe a biblioteca de documentação com o script:
```
npm install apidoc -g
```

Gere a documentação da API com o comando:
```
npm run doc
```

Acesse no browser o endereço http://localhost:3000/apidoc
