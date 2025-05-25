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

const input = ref('若我發燒、喉嚨痛、流鼻水，請問我最有可能的icd診斷代碼是甚麼')

const { status, data, refresh } = useFetch('/api/get-icd', {
    query: {
        modelIndex,
        input
    },
    watch: false,
    immediate: false
})
</script>
