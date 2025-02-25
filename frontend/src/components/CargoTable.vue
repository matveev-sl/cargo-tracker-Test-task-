<template>
  <table class="table table-bordered">
    <thead class="thead-dark">
      <tr>
        <th>Номер груза</th>
        <th>Название</th>
        <th>Статус</th>
        <th>Маршрут</th>
        <th>Дата отправления</th>
        <th>Изменить статус</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="cargo in cargoList" :key="cargo.id" :class="getStatusClass(cargo.status)">
        <td>{{ cargo.cargoId }}</td>
        <td>{{ cargo.name }}</td>
        <td>{{ cargo.status }}</td>
        <td>{{ cargo.origin }} → {{ cargo.destination }}</td>
        <td>{{ cargo.departureDate }}</td>
        <td>
          <select v-model="cargo.status" @change="updateStatus(cargo)">
            <option value="Ожидает отправки">Ожидает отправки</option>
            <option value="В пути">В пути</option>
            <option value="Доставлен">Доставлен</option>
          </select>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, onMounted } from "vue";
import axios from "axios";

// Определяем интерфейс Cargo
interface Cargo {
  cargoId: string;
  name: string;
  status: string;
  origin: string;
  destination: string;
  departureDate: string;
}
onMounted(() => {
   console.log('Cargo');
});

// Ожидаем список грузов в `props`
const props = defineProps<{ cargoList: Cargo[] }>();

// Определяем событие для обновления статуса
const emit = defineEmits<{
  (event: "update-status", updatedCargo: Cargo): void;
}>();

// Функция для добавления классов в зависимости от статуса
const getStatusClass = (status: string) => {
  switch (status) {
    case "Ожидает отправки":
      return "table-warning";
    case "В пути":
      return "table-primary";
    case "Доставлен":
      return "table-success";
    default:
      return "";
  }
};

// Функция обновления статуса
const updateStatus = async (cargo: Cargo) => {
  const currentDate = new Date();
  const departureDate = new Date(cargo.departureDate);

  // Проверяем, если статус "Доставлен", но дата отправления в будущем
  if (cargo.status === "Доставлен" && departureDate > currentDate) {
    alert("Ошибка: Невозможно изменить статус на 'Доставлен', так как дата отправления в будущем.");
    return;
  }

  try {
    // Отправляем новый статус на сервер
    await axios.put(`http://localhost:5001/api/cargos/${cargo.id}`, {
      status: cargo.status
    });

    // Если успешно — обновляем данные через emit
    emit("update-status", cargo);
  } catch (error) {
    console.error("Ошибка при обновлении статуса груза:", error);
    alert("Не удалось обновить статус груза.");
  }
};
</script>
