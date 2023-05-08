import getCostExplorer from "./CostExplorer";

getCostExplorer()
  .then((result) => {
    // 今月の請求金額を取得
    const start = result?.ResultsByTime?.slice(-1)[0]?.TimePeriod?.Start;
    const end = result?.ResultsByTime?.slice(-1)[0]?.TimePeriod?.End;
    const cost = result?.ResultsByTime?.slice(-1)[0]?.Total?.BlendedCost?.Amount;
    const costUnit = result?.ResultsByTime?.slice(-1)[0]?.Total?.BlendedCost?.Unit;

    console.log(`請求期間: ${start} ~ ${end}`);
    console.log(`請求金額: ${cost} ${costUnit}`);
  })
  .catch((err) => {
    console.error(err);
  })
