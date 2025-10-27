export default class Category {
  constructor({ name, description }) {
    if (!name || typeof name !== "string") throw new Error("Nombre inválido");
    this.name = name.trim();
    this.description = description?.trim() || "";
    this.createdAt = new Date();
  }
}
