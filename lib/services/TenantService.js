const Tenant = require('../models/Tenant');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports = class TenantService {
  static async create({ name, email, password, ownerId, monthlyCost }) {
    const passwordHash = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS));
    const tenant = await Tenant.insert({ name, email, passwordHash, ownerId, monthlyCost });
    return tenant;
  }

  static async authorize({ email, password }) {
    try {
      const tenant = await Tenant.findByEmail(email);

      const passwordsMatch = await bcrypt.compare(password, tenant.passwordHash);
      if (!passwordsMatch) throw new Error('Invalid Password');

      return tenant;

    } catch (err) {
      err.status = 401;
      throw err;
    }
  }

  static authToken(tenant) {
    return jwt.sign({ tenant: tenant.toJSON() }, process.env.APP_SECRET, {
      expiresIn: '24h'
    });
  }

  static verifyAuthToken(token) {
    const { tenant } = jwt.verify(token, process.env.APP_SECRET);
    return tenant;
  }
};
