const mongoose = require('mongoose');

const cargoSchema = new mongoose.Schema({
  cargoId: { type: String, unique: false, required: false },
  name: { type: String, required: true },
  status: { type: String, default: 'Ожидает отправки' },
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  departureDate: { type: Date, required: true }
});


module.exports = mongoose.model('Cargo', cargoSchema);

const Cargo = mongoose.model("Cargo", cargoSchema);

async function generateCargoId() {
  const lastCargo = await Cargo.findOne({}, { cargoId: 1 }) // Выбираем только cargoId
    .sort({ $natural: -1 }) // Сортируем по порядку добавления (чтобы избежать проблем с лексикографическим порядком)
    .limit(1);

  const lastId = lastCargo?.cargoId
    ? parseInt(lastCargo.cargoId.replace(/\D+/g, ""), 10) || 0
    : 0; // Если записей нет, начинаем с 0

  return `Cargo${String(lastId + 1).padStart(3, "0")}`; // Формируем CargoXXX
}

async function addCargo(cargoData) {
  const cargoId = await generateCargoId();
  const cargo = new Cargo({ ...cargoData, cargoId }); // Автоматически добавляем cargoId
  await cargo.save();
  return cargo;
}

module.exports = { Cargo, addCargo };