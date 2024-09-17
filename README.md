
# Fastify-project

Приложение для покупок c использованием технологий fastify, PostgreeSQL,  JWT, Postman


## Установка зависимостей 
Для данного приложения обязательнно предварительнно установить глобально Node.js, npm, nodemon 

## Установка локальных зависимостей 

```bash
  cd .
  npm i
```

### ENV переменные
USERNAME=db_user
PASSWORD=password
HOST=localhost
PORT=5432
DB=fastify
SECRET=somesecret
   
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

![App Screenshot](./assests/login_token.png)
#### Нам возвращается токен, который нам нужно будет скопировать

## Личный кабинет

```http
  GET /products/profile
  Authorization: Bearer <your-token>
```


![App Screenshot](./assests/profile.png)
#### !Обязательно внести токен


## Доступные продукты

```http
  GET /products/
```
![App Screenshot](./assests/products.png)


## Клиенты

```http
  GET /products/clients
  Authorization: Bearer <your-token>
```
![App Screenshot](./assests/login_token.png)

Для отпраки данного запроса нам потребуется внести bearer token, его надо скопировать по запрос /auth/login

![App Screenshot](./assests/clients.png)

## Покупка продукта

```http
  PUT /products/deduct
  Authorization: Bearer <your-token>
```

![App Screenshot](./assests/buy_token.png)
![App Screenshot](./assests/buy.png)

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `market_hash_name`      | `string` | **Required**. name of the product |
`tradable`      | `boolean` | **Required**. true |





