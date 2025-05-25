import { InferenceClient } from "@huggingface/inference";

export default defineEventHandler(async (event) => {
    const token = useRuntimeConfig(event).HFToken;
    const client = new InferenceClient(token);
    const body = await readBody(event)

    if (!body.input) {
        throw createError({
            statusCode: 422,
            statusMessage: 'Please insert input',
        })
    }

    const response = await client.chatCompletion({
        model: "meta-llama/Llama-3.1-8B-Instruct",
        messages: [
            {
                role: "user",
                content: "若有病患告訴你他的症狀是 " + body.input + " 請問最有可能的icd診斷代碼是甚麼?請直接回覆我最接近的三個診斷代碼，不需要額外的說明，並且三個代碼之間使用'|'的符號號分隔，例如:6C510|6C511|A000"
            }
        ],
        max_tokens: 512
    });

    return {
        data: response.choices[0].message.content
    }
})
