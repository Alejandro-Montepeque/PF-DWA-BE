import Payment from "../models/payment.model.js";
import { db, FieldValue } from "../config/firebase.js";

export const createPayment = async (req, res) => {
  try {
    const { userId, address, city, cardNumber, expirationDate, cvc } = req.body;

    const cartSnap = await db.collection("carts").doc(userId).collection("items").get();
    if (cartSnap.empty) return res.status(400).json({ error: "El carrito está vacío." });

    const cartItems = [];
    console.log("🚀 ~ createPayment ~ cartItems:", cartItems)
    
    let cartTotal = 0;

    cartSnap.forEach(doc => {
      const data = doc.data();
      cartItems.push({ productId: doc.id, ...data });
      cartTotal += data.total ?? 0;
    });

    // Crear pago
    const payment = new Payment({ userId, cartItems, cartTotal, address, city, cardNumber, expirationDate, cvc });
    await payment.encryptCVC(cvc);
    const savedPayment = await payment.save();

    // Vaciar carrito después del pago
    const batch = db.batch();
    cartSnap.forEach(doc => batch.delete(doc.ref));
    await batch.commit();

    res.status(201).json({
      message: "Pago procesado correctamente.",
      payment: savedPayment,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getPaymentsByUser = async (req, res) => {
   try {
    const { userId } = req.params;
    const snapshot = await db.collection("payments")
      .where("userId", "==", userId)
      .get();

    const payments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Payment.prototype.collection.doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Pago no encontrado." });
    }

    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
