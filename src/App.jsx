import CartContainer from "./components/CartContainer";
import Modal from "./components/Modal";
import Navbar from "./components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "./features/cart/cartSlice";
import { useEffect } from "react";


function App() {
  const { isOpen } = useSelector((store) => store.modal);
  const { isLoading } = useSelector(store => store.cart);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCartItems("random"))
  }, [])

  if (isLoading) {
    return <div className="loading">
      <h1>Loading...</h1>
    </div>
  }

  return (<main>
    {isOpen && <Modal></Modal>}
    <Navbar />
    <CartContainer />
  </main>)
}
export default App;
