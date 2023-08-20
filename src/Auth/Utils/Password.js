import { BcryptHashingStrategy } from "./HashingStrategy.js";

const hashingStrategy = new BcryptHashingStrategy();

class Password {
  plainPassword;

  constructor(plain_password) {
    this.plainPassword = plain_password;
  }

  async createHashPassword() {
    // create a hashed password from plain password
    const hash = await hashingStrategy.hash(this.plainPassword);
    return new HashPassword(hash);
  }
}

class HashPassword {
  #hashedPassword;

  constructor(hashed_password) {
    this.#hashedPassword = hashed_password;
  }

  async verifyPassword(plain_password) {
    return hashingStrategy.verify(plain_password, this.#hashedPassword);
  }

  getHashedPassword() {
    return this.#hashedPassword;
  }
}

export { Password, HashPassword };
