<template>
  <v-toolbar>
    <v-form @submit="handleFiltersSubmit">
      <v-select class="formItem" v-model="selectedSortType" label="Sort By" :items="sortTypesArray">
      </v-select>
      <v-select class="formItem" v-model="selectedGenre" label="Select
      Genre" :items="genresArray"></v-select>
      <v-text-field class="formItem" v-model="filterString" label="Filter By Show Title"></v-text-field>
      <v-btn class="formItem" type="submit" variant="outlined">Apply Filters</v-btn>
    </v-form>
  </v-toolbar>
</template>

<script setup>
import { ref } from 'vue'

let genresArray = [
  "All Genres",
  "Personal Growth",
  "True Crime and Investigative Journalism",
  "History",
  "Comedy",
  "Entertainment",
  "Business",
  "Fiction",
  "News",
  "Kids and Family",
]

let sortTypesArray = ["Unsorted", "Alphabetical (A to Z)", "Alphabetical (Z to A)", "Date updated (earliest first)", "Date updated (latest first)"]
let selectedSortType = ref("Unsorted")
let filterString = ref("")
let selectedGenre = ref("All Genres")

const emit = defineEmits(['filtersApplied'])

const handleFiltersSubmit = (event) => {
  event.preventDefault()
  const filters = {
    sortType: selectedSortType.value,
    filterString: filterString.value,
    selectedGenre: selectedGenre.value,
  }
  emit('filtersApplied', filters)
}

</script>

<style scoped>
.v-toolbar {
  background-color: rgb(18, 18, 18);
  margin-top: 1rem;
}

.v-form {
  display: flex;
  width: 100%;
  align-items: center;
}

.formItem {
  margin: 0 1rem;
  width: 30%;
}

.formInputs {
  margin: 0 1rem;
  width: 30%;
}
</style>
