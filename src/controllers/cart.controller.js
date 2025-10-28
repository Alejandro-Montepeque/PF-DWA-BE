import { db, FieldValue } from "../config/firebase.js";
import Cart from "../models/cart.model.js";

export const getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const itemsRef = db.collection("carts").doc(userId).collection("items");
    const snapshot = await itemsRef.get();

    if (snapshot.empty) {
        return res.status(200).json({ items: [], total: 0 });
    }

    const items = [];
    let total = 0;

    snapshot.forEach((doc) => {
        const data = doc.data();
        items.push({ id: doc.id, ...data });
        total += data.total ?? 0;
    });

    return res.status(200).json({ items, total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addItem = async (req, res) => {
    try {
    const userId = req.params.userId?.trim();
    const { productId, quantity, name, price, imageUrl  } = req.body;

    const cart = new Cart({userId});
    cart.addItem({productId, name, price, quantity, imageUrl });

    const productRef = db.collection("products").doc(productId);
    const productSnap = await productRef.get();

    if (!productSnap.exists) throw new Error("Producto no encontrado");
    const productData = productSnap.data();

    if (productData.stock < quantity) throw new Error("Stock insuficiente");

    const itemRef = db.collection("carts").doc(userId).collection("items").doc(productId);
    const itemSnap = await itemRef.get();

    if (itemSnap.exists) {
      const current = itemSnap.data();
      const newQuantity = current.quantity + quantity;
      await itemRef.update({
        quantity: newQuantity,
        total: price * newQuantity,
        updatedAt: new Date(),
      });
    } else {
      await itemRef.set({
        productId,
        name,
        price,
        quantity,
        imageUrl,
        total: price * quantity,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Restar stock
    await productRef.update({
      stock: FieldValue.increment(-quantity),
    });

    res.status(200).json({ message: "Producto agregado al carrito correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeItem = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId, quantity } = req.body;

    const itemRef = db.collection("carts").doc(userId).collection("items").doc(productId);
    const itemSnap = await itemRef.get();

    if (!itemSnap.exists) {
      return res.status(404).json({ error: "Producto no encontrado en el carrito" });
    }

    const current = itemSnap.data();
    const newQuantity = current.quantity - quantity;

    if (newQuantity > 0) {
      await itemRef.update({
        quantity: newQuantity,
        total: current.price * newQuantity,
        updatedAt: new Date(),
      });
    } else {
      // si la cantidad queda 0 o negativa, borramos el producto
      await itemRef.delete();
    }

    const productRef = db.collection("products").doc(productId);
    await productRef.update({
        stock: FieldValue.increment(quantity)
    })

    // Devolver el carrito actualizado
    const itemsSnapshot = await db.collection("carts").doc(userId).collection("items").get();
    let items = [], total = 0;
    itemsSnapshot.forEach(doc => {
      const data = doc.data();
      items.push({ id: doc.id, ...data });
      total += data.total ?? 0;
    });

    res.status(200).json({ items, total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const itemRef = db.collection("carts").doc(userId).collection("items").doc(productId);
    const itemSnap = await itemRef.get();
     if (!itemSnap.exists) {
      return res.status(404).json({ error: "Producto no encontrado en el carrito" });
    }

    const current = itemSnap.data();

    // Devolver al stock la cantidad completa del producto eliminado
    const productRef = db.collection("products").doc(productId);
    await productRef.update({
      stock: FieldValue.increment(current.quantity),
    });
    await itemRef.delete();

    // Devolver el carrito actualizado
    const itemsSnapshot = await db.collection("carts").doc(userId).collection("items").get();
    let items = [], total = 0;
    itemsSnapshot.forEach(doc => {
      const data = doc.data();
      items.push({ id: doc.id, ...data });
      total += data.total ?? 0;
    });

    res.status(200).json({ items, total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const clearCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const itemsRef = db.collection("carts").doc(userId).collection("items");
    const snapshot = await itemsRef.get();

    const batch = db.batch();
    snapshot.forEach(doc => {
      const data = doc.data();
      const productRef = db.collection("products").doc(data.productId);

      // Devolver la cantidad al stock
      batch.update(productRef, {
        stock: FieldValue.increment(data.quantity),
      });

      // Borrar el item del carrito
      batch.delete(doc.ref);
    });
    
    await batch.commit();

    res.status(200).json({ items: [], total: 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
