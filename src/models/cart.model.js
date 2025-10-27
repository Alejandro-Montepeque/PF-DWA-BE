export default class Cart {
  constructor({ userId, items = [] }) {
    if (!userId || typeof userId !== "string") {
      throw new Error("userId inválido");
    }

    this.userId = userId;
    this.items = items.map((item) => this.validateItem(item));
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  // Valida que el producto tenga estructura válida
  validateItem(item) {
    const { productId, name, price, quantity, imageUrl } = item;

    if (!productId || typeof productId !== "string")
      throw new Error("productId inválido");
    if (!name || typeof name !== "string") throw new Error("name inválido");
    if (price == null || isNaN(price)) throw new Error("price inválido");
    if (quantity == null || isNaN(quantity) || quantity < 1)
      throw new Error("quantity inválido");

    return {
      productId,
      name,
      price: Number(price),
      quantity: Number(quantity),
      imageUrl: imageUrl || "",
      total: Number(price) * Number(quantity),
    };
  }

  // Retorna el total del carrito
  getTotal() {
    return this.items.reduce((sum, item) => sum + item.total, 0);
  }

  // Agrega un producto al carrito (o aumenta cantidad si ya existe)
  addItem(product) {
    const existing = this.items.find((i) => i.productId === product.productId);
    if (existing) {
      existing.quantity += product.quantity;
      existing.total = existing.price * existing.quantity;
    } else {
      this.items.push(this.validateItem(product));
    }
    this.updatedAt = new Date();
  }

  // Cambia la cantidad de un producto
  updateItemQuantity(productId, quantity) {
    const item = this.items.find((i) => i.productId === productId);
    if (!item) throw new Error("Producto no encontrado en el carrito");
    if (quantity <= 0) {
      this.removeItem(productId);
    } else {
      item.quantity = quantity;
      item.total = item.price * quantity;
    }
    this.updatedAt = new Date();
  }

  // Elimina un producto del carrito
  removeItem(productId) {
    this.items = this.items.filter((i) => i.productId !== productId);
    this.updatedAt = new Date();
  }
}
