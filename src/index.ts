import AWS from "aws-sdk";
import dayjs from "dayjs";

type CostExplorer = {
  ResultsByTime: {
    TimePeriod: {
      Start: string;
      End: string;
    };
    Total: {
      UnblendedCost: {
        Amount: string;
        Unit: string;
      };
    };
    Groups: [];
    Estimated: boolean;
  }[];
  DimensionValueAttributes: [];
};

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
    Metrics: ["UnblendedCost"],
  };
  const result = await costexplorer.getCostAndUsage(params).promise();

  if ((result?.ResultsByTime?.length || 0) === 0) {
    console.error("No data.");
    return;
  }

  // 今月の請求金額を取得
  const start = result?.ResultsByTime?.slice(-1)[0]?.TimePeriod?.Start;
  const end = result?.ResultsByTime?.slice(-1)[0]?.TimePeriod?.End;
  const cost = result?.ResultsByTime?.slice(-1)[0]?.Total?.UnblendedCost?.Amount;
  const costUnit = result?.ResultsByTime?.slice(-1)[0]?.Total?.UnblendedCost?.Unit;

  console.log(`請求期間: ${start} ~ ${end}`);
  console.log(`請求金額: ${cost} ${costUnit}`);
}

getCostExplorer();
