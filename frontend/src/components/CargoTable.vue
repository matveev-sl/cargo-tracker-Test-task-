  
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
        <td>{{ cargo.id }}</td>
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
  import { defineProps, defineEmits } from "vue";

  const props = defineProps({ cargoList: Array });
  const emit = defineEmits<{
  (event: "update-status", updatedCargo: { id: string; status: string }): void;
}>();


  const getStatusClass = (status) => {
    switch (status) {
      case "Ожидает отправки": return "table-warning";
      case "В пути": return "table-primary";
      case "Доставлен": return "table-success";
      default: return "";
    }
  };

  const updateStatus = (cargo: { id: string; status: string }) => {
  const currentDate = new Date(); // Получаем текущую дату
  const departureDate = new Date(cargo.departureDate); // Преобразуем строку даты отправления в объект Date

  // Проверяем, если статус "Доставлен" и дата отправления в будущем
  if (cargo.status === "Доставлен" && departureDate > currentDate) {
    alert("Ошибка: Невозможно изменить статус на 'Доставлен', так как дата отправления в будущем.");
    return; // Прерываем выполнение функции, если ошибка
  }

  // Отправляем обновленный статус через событие
  emit("update-status", cargo);
  };
  </script>

  