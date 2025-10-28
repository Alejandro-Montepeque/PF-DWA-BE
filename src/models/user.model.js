export default class User {
  constructor({ firstName, lastName, email, address }) {
    if (!firstName || typeof firstName !== "string") {
      throw new Error("Nombre inválido");
    }

    if (!lastName || typeof lastName !== "string") {
      throw new Error("Apellido inválido");
    }

    if (
      !email ||
      typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      throw new Error("Correo electrónico inválido");
    }

    if (!address || typeof address !== "string") {
      throw new Error("Dirección inválida");
    }

    this.firstName = firstName.trim();
    this.lastName = lastName.trim();
    this.email = email.trim().toLowerCase();
    this.address = address.trim();
    this.createdAt = new Date();
  }
}
