<template>
    <div>
        <div>
            <select v-model="modelIndex" :disabled="status === 'pending'">
                <option :value="0">openai/gpt-4.1</option>
                <option :value="1">openai/gpt-4.1-mini</option>
                <option :value="2">openai/gpt-4.1-nano</option>
            </select>
        </div>

        <div>
            <textarea v-model="input" :disabled="status === 'pending'" style="width:300px;height:100px;"></textarea>
        </div>

        <div>
            <button @click="refresh" :disabled="status === 'pending'">search</button>
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
const modelIndex = 0
const input = ref('若我發燒、喉嚨痛、流鼻水，請問我最有可能的icd診斷代碼是甚麼')

const { status, data, refresh } = useFetch('/api/get-icd', {
    body: {
        modelIndex,
        input
    },
    method: 'post',
    watch: false,
    immediate: false
})
</script>
