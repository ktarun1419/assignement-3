import BurnButtonBar from "./components/BurnButtonBar";
import BurnStatscontainer from "./components/BurnStatscontainer";
import useCoinData from "./hooks/useCoinData";
import useRefetchTransaction from "./hooks/useRefetchTransaction";
import useSendTransaction from "./hooks/useSendTransaction";

const BurnPageStyled = styled.div``;

enum BurnTxProgress {
  default = "Burn App Tokens",
  burning = "Burning...",
}

export const BurnPage = () => {
  const {
    walletAddress,
    isWalletConnected,
    walletBalance,
    isBalanceError,
    openChainModal,
    walletChain,
    chains,
    openConnectModal,
  } = useWallet();
  const { openChainSelector, setOpenChainSelector, openChainSelectorModal } =
    useChainSelector();
  const { chains: receiveChains } = useWallet();
  const {
    supplies,
    allSupplies,
    setSuppliesChain,
    suppliesChain,
    fetchSupplies,
  } = useAppSupplies(true);
  const burnTransaction=useSendTransaction(ethersSigner,"newToken",oftAbi , burn    )
  const [isOldToken, setIsOldToken] = useState(false);
  const [burnAmount, setBurnAmount] = useState("");
  const { toastMsg, toastSev, showToast } = useAppToast();
  const ethersSigner = useEthersSigner({
    chainId: walletChain?.id ?? chainEnum.mainnet,
  });
  const [txButton, setTxButton] = useState<BurnTxProgress>(
    BurnTxProgress.default
  );
  const statsSupplies = supplies;
  const tokenAddress = fetchAddressForChain(
    suppliesChain?.id,
    isOldToken ? "oldToken" : "newToken"
  );
const coinData=useCoinData()
const refetch=useRefetchTransaction()

 

  const executeBurn = async (burnAmount) => {
    if (!isWalletConnected) {
      openConnectModal();
    }
    if (burnAmount === "") {
      console.log("Enter amount to migrate");
      showToast("Enter amount to migrate", ToastSeverity.warning);
      return;
    }
    let amount = parseEther(burnAmount);
   await burnTransaction.sendTransaction([amount])
   refetch.refetch(walletChain?.id)
   fetchSupplies();
  };
useEffect(() => {
  if (burnTransaction.isError) {
    showToast("Burn Failed!", ToastSeverity.error);
  }
}, [burnTransaction.isError])

  useEffect(() => {
    if (!walletChain) return;
    //console.log(suppliesChain);
    let isSubscribed = true;
    // const newTokenAddress = fetchAddressForChain(
    //   walletChain?.id,
    //   isOldToken ? "oldToken" : "newToken"
    // );
    if (isSubscribed) refetch.setRefectedTransaction([]);
    // const isTestnet = isChainTestnet(walletChain?.id);
    // let _chainObjects: any[] = [mainnet, avalanche, fantom];
    // if (isTestnet) _chainObjects = [sepolia, avalancheFuji, fantomTestnet];
    refetch.refetch(walletChain?.id)
    return () => {
      isSubscribed = false;
    };
  }, [walletChain, isOldToken]);

  return (
    <div>
      <DashboardLayoutStyled className="burnpage">
        <div
          className="top_conatiner burnpage"
          style={{ alignItems: "flex-start" }}
        >
          <div className="info_box filled">
            <h1 className="title">App TOKEN BURN</h1>
            <p className="description medium"></p>

           <BurnButtonBar executeBurn={executeBurn} burnTransaction={burnTransaction} />
          </div>
          <BurnStatscontainer openChainModal={openChainModal} statsSupplies={statsSupplies} allSupplies={allSupplies} />
        </div>
      </DashboardLayoutStyled>
      <TransactionTableStyled>
        <div className="header">
          <p className="header_label">Burn Transactions</p>
        </div>
        <BurnTxTable
          data={refetch?.refetchTransactions}
          priceUSD={coinData?.current_price?.usd}
        />
      </TransactionTableStyled>
      <ChainSelector
        title={"Switch Token Chain"}
        openChainSelector={openChainSelector}
        setOpenChainSelector={setOpenChainSelector}
        chains={receiveChains}
        selectedChain={suppliesChain}
        setSelectedChain={setSuppliesChain}
      />
      <AppToast
        position={{ vertical: "bottom", horizontal: "center" }}
        message={toastMsg}
        severity={toastSev}
      />
    </div>
  );
};