// Models.js - Generated from OpenAPI schemas (JavaScript classes with validation)

// RegisterDto Model
export class RegisterData {
  constructor(data = {}) {
    this.username = data.username || '';
    this.email = data.email || '';
    this.password = data.password || '';
    this.confirmPassword = data.confirmPassword || '';
  }

  validate() {
    const errors = {};

    if (!this.username || this.username.length < 3 || this.username.length > 20) {
      errors.username = 'Username must be 3-20 characters';
    }

    if (!this.email || !this.isValidEmail(this.email)) {
      errors.email = 'Valid email required';
    }

    if (!this.password || this.password.length < 8 || this.password.length > 100) {
      errors.password = 'Password must be 8-100 characters';
    }

    if (this.password !== this.confirmPassword) {
      errors.confirmPassword = 'Passwords must match';
    }

    return errors;
  }

  isValidEmail(email) {
    return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
  }

  isValid() {
    return Object.keys(this.validate()).length === 0;
  }

  toApiFormat() {
    return {
      username: this.username,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    };
  }

  clone() {
    return new RegisterData({ ...this });
  }
}

// LoginDto Model
export class LoginData {
  constructor(data = {}) {
    this.username = data.username || '';
    this.password = data.password || '';
  }

  validate() {
    const errors = {};

    if (!this.username) {
      errors.username = 'Username required';
    }
    if (!this.password) {
      errors.password = 'Password required';
    }

    return errors;
  }

  isValid() {
    return Object.keys(this.validate()).length === 0;
  }

  toApiFormat() {
    return {
      username: this.username,
      password: this.password
    };
  }

  clone() {
    return new LoginData({ ...this });
  }
}

// CreateProductDto Model
export class CreateProductData {
  constructor(data = {}) {
    this.productName = data.productName || '';
    this.productDescription = data.productDescription || '';
    this.productPrice = data.productPrice || 0;
    this.stock = data.stock || 0;
    this.imageUrl = data.imageUrl || '';
  }

  validate() {
    const errors = {};

    if (!this.productName || this.productName.length < 5 || this.productName.length > 100) {
      errors.productName = 'Product name must be 5-100 characters';
    }

    if (this.productDescription.length > 1000) {
      errors.productDescription = 'Description max 1000 characters';
    }

    if (this.productPrice < 1) {
      errors.productPrice = 'Price must be at least 1';
    }

    if (this.stock < 1) {
      errors.stock = 'Stock must be at least 1';
    }

    if (this.imageUrl && !this.isValidUrl(this.imageUrl)) {
      errors.imageUrl = 'Invalid image URL';
    }

    return errors;
  }

  isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  isValid() {
    return Object.keys(this.validate()).length === 0;
  }

  toApiFormat() {
    return {
      productName: this.productName,
      productDescription: this.productDescription,
      productPrice: parseInt(this.productPrice),
      stock: parseInt(this.stock),
      imageUrl: this.imageUrl || null
    };
  }

  clone() {
    return new CreateProductData({ ...this });
  }
}

export class UpdateProductData extends CreateProductData {
  constructor(data = {}) {
    super(data);
    this.id = data.id || 0;
  }

  validate() {
    const errors = super.validate();
    if (this.id <= 0) {
      errors.id = 'Valid product ID required';
    }
    return errors;
  }

  toApiFormat() {
    return {
      ...super.toApiFormat(),
      id: parseInt(this.id)
    };
  }
}

export class CreateCartItemData {
  constructor(data = {}) {
    this.productId = data.productId || 0;
    this.quantity = data.quantity || 1;
  }

  validate() {
    const errors = {};

    if (this.productId <= 0) {
      errors.productId = 'Valid product ID required';
    }

    if (this.quantity < 1) {
      errors.quantity = 'Quantity must be at least 1';
    }

    return errors;
  }

  isValid() {
    return Object.keys(this.validate()).length === 0;
  }

  toApiFormat() {
    return {
      productId: parseInt(this.productId),
      quantity: parseInt(this.quantity)
    };
  }

  clone() {
    return new CreateCartItemData({ ...this });
  }
}

export class ProductListFiltersData {
  constructor(data = {}) {
    this.searchTerm = data.searchTerm || '';
    this.minPrice = data.minPrice || 0;
    this.maxPrice = data.maxPrice || 0;
  }

  toApiFormat() {
    return {
      searchTerm: this.searchTerm || null,
      minPrice: parseInt(this.minPrice),
      maxPrice: parseInt(this.maxPrice)
    };
  }
}
