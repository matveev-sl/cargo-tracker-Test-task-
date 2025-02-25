

<template>
  <div class="card p-3 mb-4">
    <h5>Добавить новый груз</h5>
    <form @submit.prevent="submitCargo">
      <div class="row">
        <div class="col-md-3">
          <input v-model="cargo.name" type="text" class="form-control" placeholder="Название груза" required />
        </div>
        <div class="col-md-3">
          <select v-model="cargo.origin" class="form-control" required>
            <option disabled value="">Выберите пункт отправления</option>
            <option v-for="city in cities" :key="city">{{ city }}</option>
          </select>
        </div>
        <div class="col-md-3">
          <select v-model="cargo.destination" class="form-control" required>
            <option disabled value="">Выберите пункт назначения</option>
            <option v-for="city in cities" :key="city">{{ city }}</option>
          </select>
        </div>
        <div class="col-md-2">
          <input v-model="cargo.departureDate" type="date" class="form-control" required />
        </div>
        <div class="col-md-1">
          <button type="submit" class="btn btn-primary w-100">Добавить</button>
        </div>
      </div>
    </form>
  </div>
</template>



<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";
import axios from "axios";

const props = defineProps({ cities: Array });
const emit = defineEmits(["add-cargo"]);

const cargo = ref({
  name: "",
  origin: "",
  destination: "",
  departureDate: "",
  status: "Ожидает отправки"
});



const submitCargo = async () => {
  if (!cargo.value.name || !cargo.value.origin || !cargo.value.destination || !cargo.value.departureDate) {
    alert("Пожалуйста, заполните все поля!");
    return;
  }
  console.log("Отправляем груз:", cargo.value); // Отладка
  try {
    const response = await axios.post("http://localhost:5001/api/cargos", {
      name: cargo.value.name,
      origin: cargo.value.origin,
      destination: cargo.value.destination,
      departureDate: cargo.value.departureDate,
      status: cargo.value.status,
    });

    emit("add-cargo", { ...cargo.value }); // Передача данных родителю

    cargo.value = { name: "", origin: "", destination: "", departureDate: "", status: "Ожидает отправки" }; // Очистка формы

  } catch (error) {
    console.error("Ошибка при добавлении груза:", error);
    console.log("Ответ сервера:", error.response?.data); 
    alert("Не удалось добавить груз. Попробуйте еще раз.");
  }
};
</script>
