## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## 생성

nest -h

nest g res 이름

## 프리즈마

npm install prisma --save-dev

npx prisma

npx prisma init

## 로컬 db 설치 MySql db

테이블 1개 만들고
npx prisma db pull

npm install @prisma/client
npx prisma generate

model 생성 후 추가

npx prisma migrate dev

## Step. 2 - Prisma Install

```bash
$ prisma format
$ prisma generate
$ prisma migrate dev --preview-feature
```

## class-validator 유효성 검사를 위한 validation pipe

npm i --save class-validator class-transformer

https://github.com/typestack/class-validator
https://docs.nestjs.com/pipes

## swagger

npm install --save @nestjs/swagger

## bcrypt

npm install -D @types/bcrypt

## jwt

npm install @nestjs/jwt @nestjs/passport passport passport-jwt
npm install --save-dev @types/passport-jwt

## s3

npm install aws-sdk
npm install @nestjs/config
npm install @aws-sdk/s3-request-presigner
