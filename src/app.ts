/* eslint-disable @typescript-eslint/require-await */

import GetCostExplorer from "./GetCostExplorer";
import SlackNotifier from "./SlackNotifier";

export const lambdaHandler = async () => {
  try {
    GetCostExplorer()
    .then((result) => {
      // 今月の請求金額を取得
      const start = result?.ResultsByTime?.slice(-1)[0]?.TimePeriod?.Start;
      const end = result?.ResultsByTime?.slice(-1)[0]?.TimePeriod?.End;
      const cost = result?.ResultsByTime?.slice(-1)[0]?.Total?.BlendedCost?.Amount;
      const costUnit = result?.ResultsByTime?.slice(-1)[0]?.Total?.BlendedCost?.Unit;

      console.log(`請求期間: ${start} ~ ${end}`);
      console.log(`請求金額: ${cost} ${costUnit}`);

      // Slackに通知
      SlackNotifier([
        `🐙🐙🐙🐙🐙 今月のAWS請求金額 🐙🐙🐙🐙🐙`,
        ``,
        `💰💰💰 請求期間: ${start} ~ ${end}`,
        `💰💰💰 請求金額: ${cost} ${costUnit}`,
        ``,
        `🦑🐸🐬🐪🦈🐄🦒🐉🦁🐔🦀🐍🐶😻🐋🐗🐡`
      ].join('\n'))
    })
    .catch((err: unknown) => {
      console.error(err);
    })
  } catch (err) {
    console.error(`[ERROR]: ${err}`)
    return err
  }
}
