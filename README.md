# aws-billing-notifier

💰💰💰 AWSの請求額を定期的にSlackに通知するツールです。  

## 実行方法

下記の情報をGitHub Actionsのシークレットに登録します。  

| シークレット名 | 説明 |
| --- | --- |
| AWS_ACCESS_KEY_ID | AWSのアクセスキーID |
| AWS_SECRET_ACCESS_KEY | AWSのシークレットアクセスキー |
| LAMBDA_DOTENV | Lambdaで使用する環境変数を記述したファイルの内容 |
| PROJECT_NAME | プロジェクト名(CloudFormationのスタック名) |

`.env`ファイルは`.env.example`を参考に作成してください。  
