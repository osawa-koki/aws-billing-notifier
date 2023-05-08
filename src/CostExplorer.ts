import AWS from "aws-sdk";
import dayjs from "dayjs";

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
      Start: dayjs().subtract(1, "month").format("YYYY-MM-DD"),
      End: dayjs().format("YYYY-MM-DD"),
    },
    Granularity: "MONTHLY",
    Metrics: ["BlendedCost", "UnblendedCost"],
  };
  const result = await costexplorer.getCostAndUsage(params).promise();

  if ((result?.ResultsByTime?.length || 0) === 0) {
    console.error("No data.");
    return null;
  }

  return result;
}

export default getCostExplorer;
