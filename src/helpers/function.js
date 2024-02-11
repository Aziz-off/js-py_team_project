import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../components/context/AuthContextProvider";

//! берем данные из хранилища под ключом cart
export const getLocalStorage = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  return cart;
};
//! считаем суммы всех товаров
// export const calcTotalPrice = (products) => {
//   const totalPrice = products.reduce((acc, curr) => (acc += curr.subPrice), 0);
//   return totalPrice;
// };
//! считаем стоимости за одну позицию
// export const calcSubPrice = (product) => {
//   return +product.item.price * product.count;
// };
// export const getProductsCountInCart = () => {
//   let cart = getLocalStorage();
//   return cart ? cart.products.length : 0;
// };

//! для получения данных из хранилища под ключом favorites
export const getFavoritesLocalStorage = () => {
  const favorites = JSON.parse(localStorage.getItem("favorites"));
  return favorites;
};
// //! для подсчета суммы всех товаров в избранном
// export const calcFavoritesTotalPrice = (favorites) => {
//   const totalPrice = favorites.reduce((acc, curr) => (acc += curr.subPrice), 0);
//   return totalPrice;
// };
// ! для подсчета стоимости за одну позицию в избранном
// export const calcFavoritesSubPrice = (favorite) => {
//   return +favorite.item.price * favorite.count;
// };
// ! для получения количества товаров в избранном
export const getProductsCountInFavorites = () => {
  let favorites = getFavoritesLocalStorage();
  return favorites ? favorites.products.length : 0;
};