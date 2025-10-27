export default class Product {
  constructor({ name, description, price, stock, categoryId, imageUrl }) {
    if (!name || typeof name !== "string") throw new Error("Nombre inválido");
    if (price == null || isNaN(price)) throw new Error("Precio inválido");
    if (stock == null || isNaN(stock)) throw new Error("Stock inválido");

    this.name = name.trim();
    this.description = description?.trim() || "";
    this.price = Number(price);
    this.stock = Number(stock);
    this.categoryId = categoryId || null;
    this.imageUrl = imageUrl || "";
    this.createdAt = new Date();
  }
}
