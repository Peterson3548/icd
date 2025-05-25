<template>
  <div>
    <div>
      <select
        v-model="modelIndex"
        :disabled="status === 'pending'"
      >
        <option
          v-for="(name, index) in models"
          :key="index"
          :value="index"
        >
          {{ name }}
        </option>
      </select>
    </div>

    <div>
      <textarea
        v-model="input"
        :disabled="status === 'pending'"
        style="width:300px;height:100px;"
        required
      />
    </div>

    <div>
      <button
        :disabled="status === 'pending'"
        @click="refresh"
      >
        search
      </button>
    </div>

    <div v-if="status === 'pending'">
      Loading ...
    </div>

    <div v-else>
      {{ data }}
    </div>
  </div>
</template>

<script setup>
const models = useModels()
const modelIndex = ref(0)
const input = ref('')

const { status, data, refresh } = useFetch('/api/get-icd-using-huggingface', {
    body: {
        modelIndex,
        input
    },
    method: 'post',
    watch: false,
    immediate: false
})
</script>
