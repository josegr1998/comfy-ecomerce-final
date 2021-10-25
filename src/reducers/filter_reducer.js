import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    // console.log(action.payload);
    let maxPrice = action.payload.map((product) => {
      return product.price;
    });
    // console.log(maxPrice);

    maxPrice = Math.max(...maxPrice);
    // console.log(maxPrice);

    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
    };
  }
  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true };
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false };
  }

  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }

  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    let newProducts = [...filtered_products];

    if (sort === "price-lowest") {
      newProducts = newProducts.sort((a, b) => {
        return a.price - b.price;
      });
    }

    if (sort === "price-highest") {
      newProducts = newProducts.sort((a, b) => {
        return b.price - a.price;
      });
    }
    if (sort === "name-a") {
      newProducts = newProducts.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }
    if (sort === "name-z") {
      newProducts = newProducts.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }
    return { ...state, filtered_products: newProducts };
  }

  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return { ...state, filters: { ...state.filters, [name]: value } };
  }

  if (action.type === FILTER_PRODUCTS) {
    const { all_products } = state;
    const { text, category, company, color, price, shipping } = state.filters;

    let tempProducts = [...all_products];
    // console.log(all_products);

    //filtering
    //text
    if (text) {
      tempProducts = tempProducts.filter((product) => {
        if (product.name.includes(text.toLowerCase())) {
          return product;
        }
      });
    }
    // console.log(tempProducts);
    //category
    if (category !== "all") {
      tempProducts = tempProducts.filter((product) => {
        if (product.category === category) {
          return product;
        }
      });
    }
    // console.log(tempProducts);

    //company
    if (company !== "all") {
      tempProducts = tempProducts.filter((product) => {
        if (product.company === company) {
          return product;
        }
      });
    }

    //colors

    if (color !== "all") {
      tempProducts = tempProducts.filter((product) => {
        if (product.colors.includes(color)) {
          return product;
        }
      });
    }

    //price

    tempProducts = tempProducts.filter((product) => {
      if (product.price <= price) {
        return product;
      }
    });

    //shipping
    if (shipping === true) {
      tempProducts = tempProducts.filter((product) => {
        if (product.shipping === true) {
          return product;
        }
      });
    }

    // console.log(tempProducts);
    return { ...state, filtered_products: tempProducts };
  }
  if (action.type === CLEAR_FILTERS) {
    const maxPrice = state.filters.max_price;
    return {
      ...state,
      filters: {
        ...state.filters,
        text: "",
        company: "all",
        category: "all",
        color: "all",
        shipping: false,
        price: maxPrice,
      },
    };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
