import Cart from "../models/cart.model.js";

export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = new Cart(userId);
    const data = await cart.getCart();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addItem = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId, quantity } = req.body;
    const cart = new Cart(userId);
    const result = await cart.addItem(productId, quantity);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeItem = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId, quantity } = req.body;
    const cart = new Cart(userId);
    const result = await cart.removeItem(productId, quantity);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const cart = new Cart(userId);
    const result = await cart.deleteItem(productId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const clearCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = new Cart(userId);
    const result = await cart.clearCart();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
