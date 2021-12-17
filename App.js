import { useState } from "react";
import { ethers } from "ethers";
import ErrorMessage from "./ErrorMessage";
import TxList from "./TxList";
import './App.css';
import Footer from "./components/footer";
import MainText from "./components/middle-text";
import Header from "./components/header";
import FirstFragment from "./components/textplusPay";

const startPayment = async ({ setError, setTxs, ether, addr }) => {
try {
  if (!window.ethereum)
    throw new Error("No crypto wallet found. Please install it.");

  await window.ethereum.send("eth_requestAccounts");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  ethers.utils.getAddress(addr);
  const tx = await signer.sendTransaction({
    to: addr,
    value: ethers.utils.parseEther(ether)
  });
  console.log({ ether, addr });
  console.log("tx", tx);
  setTxs([tx]);
} catch (err) {
  setError(err.message);
}
};

export default function App() {
const [error, setError] = useState();
const [txs, setTxs] = useState([]);

const handleSubmit = async (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  setError();
  await startPayment({
    setError,
    setTxs,
    ether: data.get("ether"),
    addr: data.get("addr")
  });
};

return (
  // <div class = "content">
    
  <div class="footer">
  <Header/>
  <div class = 'footer-up-down'>
  <div class = 'size'>
  <p class="title">
  WELCOME IN OUR EXCLUSIVE
COMMUNITY. YOU ARE THE NFTiST.            </p>
<p class="body-text">
  Support and Grow Together            </p>
  </div>
  <div class = 'size'>
    <form className="m-4" onSubmit={handleSubmit}>
      <div className="credit-card w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
        <main className="mt-4 p-4">
          <h1 className="text-xl font-semibold text-gray-700 text-center">
            Send ETH payment
          </h1>
          <div className="">
            <div className="my-3">
            </div>
            <div className="my-3">
              <input
                name="ether"
                type="text"
                className="input input-bordered block w-full focus:ring focus:outline-none"
                placeholder="Email Address"
              />
            </div>
          </div>
        </main>
        <footer className="p-4">
          <button
            type="submit"
            className="pay-button"
          >
            Pay now
          </button>
          <ErrorMessage message={error} />
          <TxList txs={txs} />
        </footer>
      </div>
    </form>
  </div>

</div>
  <MainText/>
  <Footer/>
  </div>

  // </div>
  
);

}
