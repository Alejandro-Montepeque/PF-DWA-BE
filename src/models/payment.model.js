import { db } from "../config/firebase.js";
import bcrypt from "bcrypt";

export default class Payment {
  constructor({ userId, cartTotal, address, city, cardNumber, expirationDate, cvc }) {
    if (!userId) throw new Error("El pago debe tener un usuario asociado.");
    if (!cartTotal || isNaN(cartTotal)) throw new Error("Monto total inválido.");
    if (!cardNumber || cardNumber.length < 12) throw new Error("Número de tarjeta inválido.");
    if (!expirationDate) throw new Error("Fecha de vencimiento requerida.");
    if (!cvc || cvc.length < 3) throw new Error("CVC inválido.");

    this.userId = userId;
    this.cartTotal = Number(cartTotal);
    this.address = address?.trim();
    this.city = city?.trim();
    this.cardNumber = cardNumber.trim().slice(-4); // Solo guardamos los últimos 4 dígitos
    this.expirationDate = expirationDate;
    this.createdAt = new Date();
    this.status = "pending"; // pending | completed | failed
    this.cvcHash = null;
    this.collection = db.collection("payments");
  }

  async encryptCVC(cvc) {
    const salt = await bcrypt.genSalt(10);
    this.cvcHash = await bcrypt.hash(cvc, salt);
  }

  async save() {
    if (!this.cvcHash) throw new Error("CVC no encriptado.");

    const data = {
      userId: this.userId,
      cartTotal: this.cartTotal,
      address: this.address,
      city: this.city,
      cardNumber: this.cardNumber,
      expirationDate: this.expirationDate,
      cvcHash: this.cvcHash,
      status: this.status,
      createdAt: this.createdAt,
    };

    const docRef = await this.collection.add(data);
    return { id: docRef.id, ...data };
  }
}
