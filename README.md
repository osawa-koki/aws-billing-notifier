# aws-billing-notifier

💰💰💰 AWSの請求額を定期的にSlackに通知するツールです。  

```slack
# Slack

🐙🐙🐙🐙🐙 今月のAWS請求金額 🐙🐙🐙🐙🐙
💰💰💰 請求期間: 2023-05-01 ~ 2023-05-08
💰💰💰 請求金額: 2.4124042448 USD
🦑🐸🐬🐪🦈🐄🦒🐉🦁🐔🦀🐍🐶😻🐋🐗🐡
```

## 実行方法

下記の情報をGitHub Actionsのシークレットに登録します。  

| シークレット名 | 説明 |
| --- | --- |
| AWS_ACCESS_KEY_ID | AWSのアクセスキーID |
| AWS_SECRET_ACCESS_KEY | AWSのシークレットアクセスキー |
| LAMBDA_DOTENV | Lambdaで使用する環境変数を記述したファイルの内容 |
| PROJECT_NAME | プロジェクト名(CloudFormationのスタック名) |

`.env`ファイルは`.env.example`を参考に作成してください。  

## デプロイ方法

`main`ブランチにpushするとGitHub Actionsが実行され、Lambdaにデプロイされます。  

## ローカルでの開発

```shell
sam build --use-container
sam local start-api
```

また、`src`ディレクトリで`yarn start`を実行するとLambdaに模したプログラムが起動します。  

## 環境の準備

最初にAWS CLIをインストールします。  
<https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/install-cliv2.html>  

以下のコマンドを実行して、AWS CLIのバージョンが表示されればOKです。  

```shell
aws --version
```

認証情報を設定します。  

```shell
aws configure
```

以下のように聞かれるので、適宜入力してください。

```shell
AWS Access Key ID [None]: アクセスキーID
AWS Secret Access Key [None]: シークレットアクセスキー
Default region name [None]: リージョン名
Default output format [None]: json
```

これらの情報は、AWSのコンソール画面から確認できます。  
IAMのページから指定のユーザを選択肢、アクセスキーを発行してください。  

続いて、AWS SAMをインストールします。  
こちらはサーバレスアプリケーションを構築するためのツールです。  
<https://docs.aws.amazon.com/ja_jp/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html>  

以下のコマンドを実行して、AWS SAMのバージョンが表示されればOKです。  

```shell
sam --version
```

---

AWS上に作成した環境を削除するためには、以下のコマンドを実行します。  

```shell
sam delete --stack-name <プロジェクト名>
```
