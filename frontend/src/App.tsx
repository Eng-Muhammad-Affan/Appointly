import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./Root";

import {
  Categories,
  CreateCategory,
  CreateOrder,
  CreateProduct,
  CreateReview,
  CreateUser,
  EditCategory,
  EditOrder,
  EditProduct,
  EditReview,
  EditUser,
  HelpDesk,
  DashboardHome,
  Notifications,
  Orders,
  Products,
  AdminProfile,
  UserProfile,
  Register,
  Reviews,
  Users,
  DashboardLayout,
  HomePage,
  ProductsPage,
} from "./pages";

import OrdersList from "./components/orders/Orders";
import ProductDetail from "./components/products/ProductDetail";
import FetchProfileData from "./components/profile/Layout/FetchProfileData";
import OrderDetail from "./components/orders/OrderDetails";
import PoliciesPage from "./components/policies/Policies";
import ProductCatalog from "./components/products/ProductCatalog";
import ClaimAccountComponent from "./pages/ClaimAccount";
import ContactComponent from "./components/contact/ContactForm";
import BlogPostComponent from "./components/blogs/BlogsComponent";
import BlogListingComponent from "./components/blogs/BlogsListing";
import { ServicesPage } from "./components/services/ServicesPage";
import SearchPage from "./components/search/SearchPage";
import CartPage from "./components/cart/CartPage";
import WishlistPage from "./components/wishlist/WishlistPage";
import CheckoutPage from "./components/checkout/CheckoutPage";
import Login from "./components/login/Login";
import About from "./components/about/About";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/services",
        element: <ServicesPage />,
      },
            {
        path: "/contact",
        element: <ContactComponent />,
      },
            {
        path: "/blogs",
        element: <BlogListingComponent />,
      },
      {
        path: "/policies",
        element: <PoliciesPage />,
      },
      {
        path: "/products",
        element: <ProductCatalog />,
      },
      {
        path: "/products/:id",
        element: <ProductDetail />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/wishlist",
        element: <WishlistPage />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/profile",
        element: <FetchProfileData />,
        children: [
          {
            index: true,
            element: <UserProfile />,
          },
          {
            path: "orders",
            element: <OrdersList />,
          },
          {
            path: "orders/:id",
            element: <OrderDetail />,
          }
        ],
      },
        {
        path: "/claim-token",
        element: <ClaimAccountComponent />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/admin",
        element: <DashboardLayout />,
        children: [
          {
          index:true,
            element: <DashboardHome />,
          },
          {
            path: "inventory",
            element: <Products />,
          },
          {
            path: "inventory/create-product",
            element: <CreateProduct />,
          },
          {
            path: "inventory/:id",
            element: <EditProduct />,
          },
          {
            path: "categories",
            element: <Categories />,
          },
          {
            path: "categories/create-category",
            element: <CreateCategory />,
          },
          {
            path: "categories/:id",
            element: <EditCategory />,
          },
          {
            path: "orders",
            element: <Orders />,
          },
          {
            path: "orders/create-order",
            element: <CreateOrder />,
          },
          {
            path: "orders/:id",
            element: <EditOrder />,
          },
          {
            path: "reviews",
            element: <Reviews />,
          },
          {
            path: "reviews/:id",
            element: <EditReview />,
          },
          {
            path: "reviews/create-review",
            element: <CreateReview />,
          },
          {
            path: "users",
            element: <Users />,
          },
          {
            path: "users/:id",
            element: <EditUser />,
          },
          {
            path: "users/create-user",
            element: <CreateUser />,
          },
          {
            path: "help-desk",
            element: <HelpDesk />,
          },
          {
            path: "notifications",
            element: <Notifications />,
          },
          {
            path: "profile",
            element: <AdminProfile />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;