import { chapters, investTicker, type Chapter } from "../content";

export interface TickerPoint {
  price: number;
  /** The Story stop that moved the price here. Null for the starting point. */
  chapter: Chapter | null;
  change: number;
}

/**
 * Rebuilds the $RICH price history from the Story stops, in road-map order. Pure data,
 * computed once at import, so the navbar pill and the Home chart always agree.
 */
function buildHistory(): TickerPoint[] {
  const history: TickerPoint[] = [{ price: investTicker.startPrice, chapter: null, change: 0 }];
  for (const chapter of chapters) {
    const change = investTicker.moves[chapter.status];
    history.push({ price: history[history.length - 1].price + change, chapter, change });
  }
  return history;
}

export const tickerHistory = buildHistory();
export const tickerPrice = tickerHistory[tickerHistory.length - 1].price;
export const tickerGrowthPercent = Math.round(
  ((tickerPrice - investTicker.startPrice) / investTicker.startPrice) * 100,
);

export function formatPrice(price: number): string {
  return price.toFixed(2);
}
