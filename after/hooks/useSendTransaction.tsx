import React from 'react'

const useSendTransaction = ({chainId, method, token,signer, abi , arguments }) => {
    const [isPending,setIsPending]=useState<boolean>(false)
    const [isApproved,setIsApproved]=useState<boolean>(false)
    const [isError,setIsError]=useState<boolean>(false)
    const [data,setData]=useState<any>({})
    const newTokenAddress = fetchAddressForChain(chainId, token);
  const sendTransaction=async(arguments)=>{
    let contract=new MyContract(newTokenAddress,abi,signer)
    setIsPending(true)
    try {
        if (contract) {
           const tx= await contract[method](...arguments)
            setData(tx)
             await tx.wait()
             setIsPending(false)
             setIsApproved(true)

         }
    } catch (error) {
        setIsError(true)
        setIsPending(false)
        setIsApproved(false)
    }
  }
  return { isApproved, isError , isPending , sendTransaction, data}
}

export default useSendTransaction