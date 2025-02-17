

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

const props = defineProps({ cities: Array });
const emit = defineEmits(["add-cargo"]);

const cargo = ref({
  name: "",
  origin: "",
  destination: "",
  departureDate: "",
  status: "Ожидает отправки"
});



const submitCargo = () => {
  if (!cargo.value.name || !cargo.value.origin || !cargo.value.destination || !cargo.value.departureDate) {
    alert("Пожалуйста, заполните все поля!");
    return;
  }
  emit("add-cargo", { ...cargo.value });

  // Очищаем форму
  cargo.value = { name: "", origin: "", destination: "", departureDate: "", status: "Ожидает отправки" };
};
</script>
