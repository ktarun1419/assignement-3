import React from 'react'

const useRefetchTransaction = () => {
  const [refetchTransactions,setRefectedTransaction]=useState<any>()
  const refetch=(chainId)=>{
    Promise.all(
        ChainScanner.fetchAllTxPromises(isChainTestnet(chainId))
      )
        .then((results: any) => {
          //console.log(res);
          let res = results.flat();
          res = ChainScanner.sortOnlyBurnTransactions(res);
          res = res.sort((a: any, b: any) => b.timeStamp - a.timeStamp);
          setRefectedTransaction(res);
        })
        .catch((err) => {
          console.log(err);
        });
  }
  return {refetchTransactions, refetch, setRefectedTransaction}

}

export default useRefetchTransaction