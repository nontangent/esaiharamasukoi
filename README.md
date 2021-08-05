# Esaiharamasukoi
OAuth2で認証してesa.ioにbefore、after画像の記事を作成するアプリ。

↓ こんな感じ
```
# プルリク画像置き場/2021-08-05

|before|after|
|--|--|
|![before](<!-- imageURL -->)|![before](<!-- imageURL -->)|
```

## DEMO
[https://esaiharamasukoi.web.app](https://esaiharamasukoi.web.app)

## Development
```sh
$ npm install
$ export CLIENT_ID=<!-- CLIENT ID-->
$ export CLIENT_SECRET=<!-- CLIENT SECRET -->
$ nx serve api
$ nx serve app
```

[http://localhost:4200](http://localhost:4200)にアクセス;

## Deploy
```sh
$ firebase functions:config:set esa.id=$CLIENT_ID esa.secret=$CLIENT_SECRET
$ nx deploy api
$ nx deploy app
```
