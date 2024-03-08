import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Cart from "./Components/Cart";
import Electronics from "./Components/catogary/Electronics";
import SingleProduct from "./Components/Card/SingleProduct";
import CheckOut from "./Components/CheckOut";
import Login from "./Components/Login/Login";
import Signup from "./Components/Login/Signup";
import Profile from "./Components/Login/Profile";
import PaymentPage from "./Components/PaymentPage";
import Furniture from "./Components/catogary/Furniture";
import Shoes from "./Components/catogary/Shoes";
import Clothes from "./Components/catogary/Clothes";
import Miscellaneous from "./Components/catogary/Miscellaneous";
import ScrollToTop from "./ScrollToTop";

function App() {
  // const [user, setUser] = useState();

  // const getUser = () => {
  //   let responce = localStorage.getItem("user");
  //   let data = JSON.parse(responce);

  //   if (data) {
  //     setUser(data);
  //   }
  // };
  // useEffect(() => {
  //   getUser();
  // }, []);
  // console.log(user);

  // const ProtectedRoute = ({ children }) => {
  //   if (!currentUser) {
  //     return <Navigate to={"/login"} />;
  //   }
  //   return children;
  // };
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route exact path="/profile" element={<Profile />}></Route>

          <Route exact path="/signup" element={<Signup />}></Route>
          <Route exact path="/home" element={<Home />}></Route>
          <Route exact path="/cart" element={<Cart />}></Route>
          <Route exact path="/clothes" element={<Clothes />}></Route>
          <Route exact path="/furniture" element={<Furniture />}></Route>
          <Route exact path="/shoes" element={<Shoes />}></Route>
          <Route exact path="/electronics" element={<Electronics />}></Route>
          <Route
            exact
            path="/miscellaneous"
            element={<Miscellaneous />}
          ></Route>

          <Route
            exact
            path="/singleProduct/:id"
            element={<SingleProduct />}
          ></Route>
          <Route exact path="/cart/checkout" element={<CheckOut />}></Route>
          <Route
            exact
            path="/cart/checkout/payment"
            element={<PaymentPage />}
          ></Route>
          {/* <Route exact path="/admin" element={<Admin />}></Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
