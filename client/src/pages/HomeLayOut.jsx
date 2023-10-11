import React, { createContext, useContext, useEffect } from "react";

import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { Footer, Header, Loading, Navbar } from "../components";
import { customFetch, modifyServerData, sendLocalToServer } from "../utils/all";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../features/cart/cartSlice";

const HomeContext = createContext();

export const loader = async () => {
  try {
    const { data: user } = await customFetch.get("/user/showme");
    const {data: serverCartDataRaw} = await customFetch.get('/cart')
    return {user, serverCartDataRaw};
  } catch (error) {
    console.log(error?.response?.data?.msg);
    return null;
  }
};

const HomeLayOut = ({getTheme}) => {
  const response = useLoaderData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const localCartData = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  const isLoading = navigation.state === "loading";

 const user = response?.user
 const serverCartDataRaw = response?.serverCartDataRaw

 const serverCartDataFinal = modifyServerData(serverCartDataRaw)

 const cartData = user ? serverCartDataFinal : localCartData

  const goToTheProductPage = (productId) => {
    navigate(`/products/${productId}`)
  }

  useEffect(() => {
    getTheme()
  },[])

  useEffect(() => {
    const localCartItems = JSON.parse(localStorage.getItem("cart"));
    // console.log(response, localCartItems)
    if (!localCartItems || localCartItems.numItemsInCart < 1) {
      return;
    }
    if (!response) {
      return;
    }
    const connectServer = async () => {
      // console.log(localCartItems)
      const reply = await sendLocalToServer(localCartItems.cartItems);
      return reply;
    };

    connectServer();
    dispatch(clearCart());
    setTimeout(() => {
      navigate('/cart')
    },1000)
  }, []);

  const logout = async () => {
    await customFetch.get("/auth/logout");
    navigate("/login");
  };
  return (
    <HomeContext.Provider value={{ Name: user?.user?.name, Role: user?.user?.role, logout, cartData,getTheme }}>
      <Header />
      <Navbar />
      <section>
        {isLoading ? (
          <Loading />
        ) : (
          <Outlet
            context={{ user: response?.user || null, goToTheProductPage }}
            className="pt-5 px-4 "
          />
        )}
      </section>
      <Footer />
    </HomeContext.Provider>
  );
};

export const homeContextProvider = () => useContext(HomeContext);

export default HomeLayOut;
