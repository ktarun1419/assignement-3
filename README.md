# Fragmentation
## useCoinData
firstly i have made a hook to retrive coin data because that data will be used many times so it will be quick and will save a lot of time to create a hook and use it
## useSendTransaction
in this i have created a hook because sendTransaction will be used too many time every time rewriting same code will be a headache .It  that will take parameters like tokenaddress, abi, method , arguments and signer and it will return the function sendTrnasaction , variables like isPending, isApproved which can be used for further UI enhancements and it can be reused for many transactions 
##usefetchTransaction 
i have used this also as a hook because this was used twice in the component and maybe it will reuse in further more component so thats why
## Components 
rest i have also changed the UI into further components to stable divide the code into fragments
## FYI
there may be errors because for testing there was no time and i can assure you i can create better than this with woring model
