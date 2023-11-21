import { useDispatch } from "react-redux"
import { ChevronDown, ChevronUp } from "../icons"
import { removeItem, increase, decrease } from "../features/cart/cartSlice";

const CartItem = ({ id, img, title, price, amount }) => {
    const dispatch = useDispatch();
    return (
        <article className="cart-item">
            <img src={img} alt={title} />
            <div>
                <h4>{title}</h4>
                <h5 className="item-price">${price}</h5>
                <button className="cart-btn remove-btn" onClick={() => {
                    dispatch(removeItem({ id }))
                }}>remove</button>
            </div>
            <div>
                <button className="cart-btn amount-btn" onClick={() => dispatch(increase(id))}>
                    <ChevronUp />
                </button>
                <p className="amount">{amount}</p>
                <button className="cart-btn amount-btn" onClick={() => {
                    dispatch(decrease(id))
                }}>
                    <ChevronDown />
                </button>
            </div>
        </article>
    )
}
export default CartItem