import React from 'react'

const useCoinData = () => {
  const [coinData,setCoinData]=useState<any>()
  useEffect(() => {
    CoinGeckoApi.fetchCoinData()
      .then((data: any) => {
        //console.log("coin stats", data);
        setCoinData(data?.market_data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return coinData
}

export default useCoinData