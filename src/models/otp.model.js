import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Otp = sequelize.define('Otp', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING(6),
    allowNull: false,
  },
  purpose: {
    type: DataTypes.ENUM('activation', 'password_reset'),
    allowNull: false,
    defaultValue: 'activation',
  },
  expiry: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  isUsed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'otps',
  timestamps: false,
  underscored: false,
});

export default Otp;