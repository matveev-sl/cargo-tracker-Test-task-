const express = require('express');
const router = express.Router();
const {Cargo, addCargo} = require('../models/Cargo');

router.get('/', async (req, res) => {
    try {
      const cargos = await Cargo.find(); // Находим все грузы в базе
      res.json(cargos); // Отправляем массив грузов
    } catch (err) {
      res.status(500).json({ message: err.message }); // Если ошибка — отправляем код 500
    }
  });

// Получение конкретного груза по ID
router.get('/:id', async (req, res) => {
    try {
      const cargo = await Cargo.findById(req.params.id); // Ищем груз по ID
      if (!cargo) return res.status(404).json({ message: 'Груз не найден' }); // Если нет — отправляем 404
      res.json(cargo); // Отправляем найденный груз
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  

// Добавление нового груза
router.post("/", async (req, res) => {
  try {
    const newCargo = await addCargo(req.body); // Используем addCargo
    res.status(201).json(newCargo);
  } catch (err) {
    console.error("Ошибка при создании груза:", err);
    res.status(400).json({ message: err.message });
  }
});

// Обновление статуса груза
router.put('/:id/status', async (req, res) => {
    try {
      const cargo = await Cargo.findById(req.params.id); // Ищем груз
      if (!cargo) return res.status(404).json({ message: 'Груз не найден' });
  
      cargo.status = req.body.status; // Обновляем статус
      await cargo.save(); // Сохраняем изменения
      res.json(cargo); // Отправляем обновленный объект
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const cargo = await Cargo.findById(req.params.id);
      if (!cargo) return res.status(404).json({ message: 'Груз не найден' });
  
      await cargo.deleteOne(); // Удаляем из базы
      res.json({ message: 'Груз удален' }); // Подтверждаем удаление
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  

module.exports = router;
