const BASE_URL = `https://api.coinpaprika.com/v1`;
const CHANGED_URL = `https://ohlcv-api.nomadcoders.workers.dev`;
export function fetchCoins() {
  return fetch(`https://api.coinpaprika.com/v1/coins`).then((response) =>
    response.json()
  );
}

export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinTickers(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}
export function fetchCoinHistory(coinId: string) {
  return fetch(`${CHANGED_URL}/?coinId=${coinId}`).then((response) =>
    response.json()
  );
}
