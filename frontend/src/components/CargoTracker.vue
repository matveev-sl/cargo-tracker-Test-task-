
<template>
  <div class="container mt-4">
    <CargoForm :cities="cities" @add-cargo="addCargo" />
    <CargoTable :cargoList="cargoList" @update-status="handleUpdateStatus" />
  </div>
</template>
  
  <script setup>
  import { ref } from "vue";
  import CargoForm from "./CargoForm.vue";
  import CargoTable from "./CargoTable.vue";
  
  const cities = ref(["Москва", "Санкт-Петербург", "Казань", "Екатеринбург"]);
  
  const cargoList = ref([
    { id: "CARGO001", name: "Строительные материалы", status: "В пути", origin: "Москва", destination: "Казань", departureDate: "2024-11-24" },
    { id: "CARGO002", name: "Хрупкий груз", status: "Ожидает отправки", origin: "Санкт-Петербург", destination: "Екатеринбург", departureDate: "2024-11-26" }
  ]);

const handleUpdateStatus = (updatedCargo) => {
  const index = cargoList.value.findIndex(cargo => cargo.id === updatedCargo.id);
  if (index !== -1) {
    cargoList.value[index].status = updatedCargo.status;
  }
};

  const addCargo = (cargo) => {
    const newId = `CARGO${String(cargoList.value.length + 1).padStart(3, "0")}`;
    cargoList.value.push({ id: newId, ...cargo });
  };
  </script>
    
