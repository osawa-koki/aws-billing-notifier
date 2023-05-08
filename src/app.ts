/* eslint-disable @typescript-eslint/require-await */

import GetCostExplorer from "./GetCostExplorer";
import SlackNotifier from "./SlackNotifier";

export const lambdaHandler = async () => {
  try {
    GetCostExplorer()
    .then(async (result) => {
      // 今月の請求金額を取得
      const start = result?.ResultsByTime?.slice(-1)[0]?.TimePeriod?.Start;
      const end = result?.ResultsByTime?.slice(-1)[0]?.TimePeriod?.End;
      const cost = result?.ResultsByTime?.slice(-1)[0]?.Total?.BlendedCost?.Amount;
      const costUnit = result?.ResultsByTime?.slice(-1)[0]?.Total?.BlendedCost?.Unit;

      console.log(`請求期間: ${start || 'xxx'} ~ ${end || 'xxx'}`);
      console.log(`請求金額: ${cost || 'xxx'} ${costUnit || 'xxx'}`);

      // Slackに通知
      await SlackNotifier([
        `🐙🐙🐙🐙🐙 今月のAWS請求金額 🐙🐙🐙🐙🐙`,
        ``,
        `💰💰💰 請求期間: ${start || 'xxx'} ~ ${end || 'xxx'}`,
        `💰💰💰 請求金額: ${cost || 'xxx'} ${costUnit || 'xxx'}`,
        ``,
        `🦑🐸🐬🐪🦈🐄🦒🐉🦁🐔🦀🐍🐶😻🐋🐗🐡`
      ].join('\n'))
    })
    .catch((err: unknown) => {
      if (err instanceof Error) {
        console.error(`[ERROR]: ${err.message || 'xxx'}`)
      }
    })
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(`[ERROR]: ${err.message || 'xxx'}`)
    }
  }
}
