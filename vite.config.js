import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        listing: resolve(__dirname, "src/product-listing/index.html"),
        authentication: resolve(__dirname, "src/auth/login.html"),
        registration: resolve(__dirname, "src/auth/signup.html"),
        wishlist: resolve(__dirname, "src/wishlist/index.html"),
        product: resolve(__dirname, "src/product-pages/index.html"),
        order: resolve(__dirname, "src/orders/index.html"), // changed "Order" to "order"
      },
    },
  },
});
