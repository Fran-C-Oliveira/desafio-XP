<img src="https://i.imgur.com/Zdjqq1K.gif" align="left" width=180px />

# Desafio-XP
#### Versão simplificada do backend de uma corretora de valores

<br />
<br />
<br />

## Iniciando

Clone o projeto

```zsh
git clone git@github.com:Fran-C-Oliveira/desafio-XP.git
```

### Pré-requisitos
- node versão v16.13.2

#### Como instalar o node?
  <b>Observação</b>: Este guia supõe que você esteja usando o Ubuntu 20.04.
    Em função das diversas distribuições do Linux, é recomendado pesquisar as instruções de instalação específicas para sua distribuição. 
  
  Instale o NVM:
  
  Siga [estas instruções](https://github.com/nvm-sh/nvm#installing-and-updating) para instalar o nvm, gerenciador de versões do node.
   
  Instale a versão do NodeJS utilizada neste projeto:
  
  ```zsh
  nvm install 16
  ``` 
  Para confirmar a versão do Node que está sendo utilizada:
  
   ```zsh
  nvm current
   ``` 
  Caso precise alternar entre as versões instaladas: 
  
  ```zsh
  nvm use 16
  ``` 
<br />

- Esta aplicação conta com um banco de dados em <b>MySQL</b>. Portanto, você precisará o <b>MySQL Server</b> instalado em seu computador:
  
```zsh
sudo apt install mysql-server
```
  
  Verifique a versão instalada:
  
  ```zsh
  mysql --version
  ```
  
  Para verificar se o MySql server está ativo:
  ```zsh
  sudo systemctl status mysql
  ```
  
  Para ativá-lo, caso não esteja:
  ```zsh
  sudo service mysql start
   ```  
<br />

- Para visualizar o banco de dados e as alterações feitas nele, você pode utilizar uma interface gráfica, como o [MySQL Workbench](https://dev.mysql.com/downloads/workbench/).
  Após o download da versão compatível com seu sistema, navegue até a pasta onde foi feito o download através do terminal, rode o comando a seguir e aceite a instalação:
  
  ```zsh
  sudo apt install ./nome-do-arquivo 
  ```
  Certifique-se de fazer as configurações de conexão com o MySQL. [Assista a esse vídeo](https://youtu.be/zpssr3u1EO8?t=349), caso tenha dúvidas.
<br />

- Para testar as requisições HTTP, você pode utilizar o Postman ou ferramentas similares.

  Baixe e instale o Postman na versão mais adequada para seu sistema [neste link](https://www.postman.com/downloads/) (É recomendado que você crie uma conta gratuita e faça login).
  Caso precise de ajuda, siga as instruções [neste link](https://atendimento.tecnospeed.com.br/hc/pt-br/articles/360017143594-Como-instalar-e-utilizar-o-Postman-para-enviar-requisi%C3%A7%C3%B5es-HTTP). 
  > Na raiz do projeto, existe o arquivo [xpStocks.postman_collection](https://github.com/Fran-C-Oliveira/desafio-XP/blob/main/xpStocks.postman_collection.json) com a coleção das rotas desta aplicação para você importar diretamente no Postman.
  
  Caso não deseje utilizar ferramentas para testar as requisições, logo abaixo das rotas você encontrará exemplos das requisições para usar diretamente no seu terminal.
  
  Observação: como esta aplicação conta com a geração de um `token` para autorizar o acesso às rotas, lembre-se de que você precisa, antes de tudo, gerar um token fazendo cadastro ou login na aplicação. Ao fazer isso, você pode informar esse `token` nas variáveis globais do Postman ou no campo `<generated_token>` dos exemplos abaixo.
  > O `token` deve ser informado sem as aspas.
  
  Como criar e utilizar variáveis globais no Postman [neste link](https://dev.to/_filipedev/postman-dicas-de-produtividade-4o7b).
  ##
 
### Instalando as dependências da aplicação

No terminal, navegue até a pasta onde você fez o clone da aplicação e rode o comando: 
 ```zsh
 npm install
 ``` 
 
## Rodando a aplicação

```zsh
 npm run dev
```

## Testando a aplicação

```zsh
  npm test
```
##
# Sobre como essa aplicação foi desenvolvida

- Essa aplicação foi desenvolvida em Typescript, onde pode-se aproveitar as vantagens de uma tipagem estática, como, por exemplo, detectar mais rápido erros que podem ocorrer na transferência de dados entre uma camada e outra da aplicação. 

- Foi utilizada a aquitetura MSC (Model, Service, Controller);
- Como mencionado anteriormente, esta aplicação conta com um pequeno banco de dados, que visa trazer algumas possíveis entidades de uma corretora de valores, bem como servir de apoio para o desenvolvimento e a visualização do funcionamento da aplicação. Esse banco, também, serve para mostrar como seria a conexão desta API com um banco de dados.

- Para simplificar, optei por não encriptar a senha do usuário, mas em um ambiente de produção, para garantir a segurança dos dados, isso seria feito utilizando uma biblioteca como, por exemplo, a bcrypt.

- As rotas presentes nessa aplicação são: 
  
   POST `/register` - para cadastros de novos usuários;
   
    ```bash    
   #Exemplo: 
   curl --location --request POST 'http://localhost:3000/register' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "name": "client25",
        "email": "client25@client25.com",
        "password": "client25pass"
    }'
    ```
   
   POST `/login` - para login de usuários já cadastrados;
   
    ```bash 
   #Exemplo:
   curl --location --request POST 'http://localhost:3000/login' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "email": "client05@client04.com",
        "password": "client05pass"
    }'
    ```
   
   GET `/stocks/all` - para listar todas as ações disponíveis na corretora, com suas informações e quantidades;
   
   ```bash 
   #Exemplo: 
   curl --location --request GET 'http://localhost:3000/stocks/all' \
    --header 'Authorization: <generated_token>' \
    --data-raw ''
    ```
   
   POST `/investments/buy` - onde o cliente pode efetuar a compra de ações;
   
   ```bash
   #Exemplo:
   curl --location --request POST 'http://localhost:3000/investments/buy' \
    --header 'Authorization: <generated_token>' \
    --header 'Content-Type: application/json' \
    --data-raw '{
    "assetId": 3,
    "quantity": 10,
    "clientId": 1
    }'
    ```
   
   POST `/investments/sell` - onde o cliente pode efetuar a venda de ações;
   
   ```bash 
   #Exemplo:
     curl --location --request POST 'http://localhost:3000/investments/sell' \
    --header 'Authorization: <generated_token>' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "assetId": 3,
        "quantity": 5,
        "clientId": 1
    }'
    ```
   
   GET `/account/:id` - onde é possível ver as informações da conta do cliente ao informar seu id na rota;
   
   ```bash 
   #Exemplo: 
   curl --location --request GET 'http://localhost:3000/account/4' \
  --header 'Authorization: <generated_token>' \
  --data-raw ''
  ```
   
   POST `/account/deposit` - onde o cliente pode efetuar depósitos em sua conta;
   
   ```bash 
   #Exemplo: 
   curl --location --request POST 'http://localhost:3000/account/deposit' \
    --header 'Authorization: <generated_token>' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "clientId": 1,
        "amount": 50000
    }'
    ```
   
   POST `/account/withdraw` - onde o cliente pode efetuar saques em sua conta;
   
   ```bash 
   #Exemplo: 
   curl --location --request POST 'http://localhost:3000/account/withdraw' \
    --header 'Authorization: <generated_token>' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "clientId": 1,
        "amount": 50
    }'
    ```
   
   GET `/stocks/client/:id` - onde é possível listar todos os ativos de um cliente ao informar seu id na rota;

     ```bash 
     #Exemplo:
     curl --location --request GET 'http://localhost:3000/stocks/client/1' \
      --header 'Authorization: <generated_token>' \
      --data-raw ''
     ```
   
   
   GET `/stocks/asset/:id` - onde é possível buscar por um ativo específico ao informar seu id na rota.
   
   ```bash 
   #Exemplo: 
   curl --location --request GET 'http://localhost:3000/stocks/asset/3' \
    --header 'Authorization: <generated_token>' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "assetId": 2,
        "quantity": 2,
        "clientId": 1
    }'
    ```
   
 - Foi criado um middleware(httpException), que passa por todas as rotas, cuja função é detectar erros de requisição diferentes dos que foram tratados no desenvolvimento;
 - Foi desenvolvida uma autenticação utilizando Json Web Token, necessária para todas as demais rotas além de `register` e `login`;  
 - Os testes foram desenvolvidos unindo Jest e Typescript, através do framework <b>Supertest</b>
 
