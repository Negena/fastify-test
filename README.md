
# Fastify-project

Приложение для покупок c использованием технологий fastify, PostgreeSQL,  JWT, Postman


## Установка зависимостей 
Для данного приложения обязательнно предварительнная установка Node.js, npm, nodemon - глобально

## Установка локальных зависимостей 

```bash
  cd .
  npm i
```
   
## Запуск проекта
```bash
 $ npm run dev
```

## Регистрация клиента

```http
  POST /auth/register
```

![App Screenshot](./assests/register.png)

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. g@gmail.com |
| `user_password` | `string` | **Required**. password |
| `username` | `string` | **Required**. username1 |
| `balance` | `number` | **Required**. 200 |

## Логин клиента -  Возвращается токен его надо будет скопировать

```http
  POST /auth/login
```

![App Screenshot](./assests/login.png)

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**. g@gmail.com |
| `user_password` | `string` | **Required**. password |


## Доступные продукты

```http
  GET /products/
```
![App Screenshot](./assests/products.png)


## Клиенты

```http
  GET /products/clients
```
![App Screenshot](./assests/login_token.png)

Для отпраки данного запроса нам потребуется внести bearer token, его надо скопировать по запрос /auth/login

![App Screenshot](./assests/clients.png)

## Покупка продукта

```http
  GET /products/deduct
```

![App Screenshot](./assests/buy_token.png)
![App Screenshot](./assests/buy.png)

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `market_hash_name`      | `string` | **Required**. name of the product |
`tradable`      | `boolean` | **Required**. true |





