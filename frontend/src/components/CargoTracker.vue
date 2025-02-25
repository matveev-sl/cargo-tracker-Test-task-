
<template>
  <div class="container mt-4">
    <CargoForm :cities="cities" @add-cargo="addCargo" />
    <CargoTable :cargoList="cargoList" @update-status="handleUpdateStatus" />
  </div>
</template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import CargoForm from "./CargoForm.vue";
  import CargoTable from "./CargoTable.vue";
  import axios from "axios";

  const cargoList = ref([]);

  const cities = ref(["Москва", "Санкт-Петербург", "Казань", "Екатеринбург"]);
  
  onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:5001/api/cargos");
    console.log("Полученные грузы:", response.data); 
    cargoList.value = response.data;
  } catch (error) {
    console.error("Ошибка загрузки грузов:", error);
  }
});


// Обновление статуса груза
const handleUpdateStatus = async (updatedCargo) => {
  try {
    await axios.put(`http://localhost:5001/api/cargos/${updatedCargo.id}`, {
      status: updatedCargo.status
    });

    // Обновляем локальный массив
    const index = cargoList.value.findIndex(cargo => cargo.id === updatedCargo.id);
    if (index !== -1) {
      cargoList.value[index].status = updatedCargo.status;
    }
  } catch (error) {
    console.error("Ошибка обновления статуса:", error);
  }
};

// Добавление нового груза
const addCargo = async (cargo) => {
  try {
    const response = await axios.post("http://localhost:5001/api/cargos", cargo);
    cargoList.value.push(response.data);
  } catch (error) {
    console.error("Ошибка добавления груза:", error);
  }
};
  </script>
    
