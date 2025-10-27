import Payment from "../models/payment.model.js";

export const createPayment = async (req, res) => {
  try {
    const { userId, cartTotal, address, city, cardNumber, expirationDate, cvc } = req.body;

    const payment = new Payment({
      userId,
      cartTotal,
      address,
      city,
      cardNumber,
      expirationDate,
      cvc,
    });

    await payment.encryptCVC(cvc); // Hashear el CVC
    const savedPayment = await payment.save();

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
    const snapshot = await Payment.prototype.collection
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
