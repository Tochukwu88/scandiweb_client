import fetch from "isomorphic-fetch";
const API = "https://scantiweb-task.000webhostapp.com/products";

export const saveProduct = async (data) => {
  try {
    const response = await fetch(`${API}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
export const deleteProduct = async (data) => {
  try {
    const response = await fetch(`${API}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
export const getProduct = async (hash) => {
  try {
    const response = await fetch(`${API}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
