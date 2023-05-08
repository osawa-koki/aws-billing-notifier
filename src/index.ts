import AWS from "aws-sdk";

AWS.config.getCredentials(function(err) {
  if (err) console.error(err.stack);
  else {
    console.log("Access key:", AWS.config.credentials?.accessKeyId);
  }
});

// リージョンを設定
AWS.config.update({ region: "us-east-1" });

console.log("Region: ", AWS.config.region);

// 請求金額を取得
const getCostExplorer = async () => {
  const costexplorer = new AWS.CostExplorer();
  const params = {
    TimePeriod: {
      Start: "2023-01-01",
      End: "2023-05-01",
    },
    Granularity: "MONTHLY",
    Metrics: ["UnblendedCost"],
  };
  const result = await costexplorer.getCostAndUsage(params).promise();
  console.log(result);
}

getCostExplorer();
