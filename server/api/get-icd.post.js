import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import useModels from "~/composables/useModels";

export default defineEventHandler(async (event) => {
    const token = useRuntimeConfig(event).githubToken;
    const endpoint = "https://models.github.ai/inference";
    const body = await readBody(event)

    let modelIndex = 0;

    if (body.modelIndex) {
        modelIndex = body.modelIndex
    }

    const models = useModels()

    const model = models[modelIndex];

    const client = ModelClient(
        endpoint,
        new AzureKeyCredential(token),
    );

    if (!body.input) {
        throw createError({
            statusCode: 422,
            statusMessage: 'Please insert input',
        })
    }


    const response = await client.path("/chat/completions").post({
        body: {
            messages: [
                { role: "system", content: "你是一位醫生" },
                { role: "user", content: "若有病患告訴你他的症狀是 " + body.input + " 請問最有可能的icd診斷代碼是甚麼?請直接回覆我最接近的三個診斷代碼，不需要額外的說明，並且三個代碼之間使用'|'的符號號分隔，例如:6C510|6C511|A000" }
            ],
            temperature: 1.0,
            top_p: 1.0,
            model: model
        }
    });

    if (isUnexpected(response)) {
        throw response.body.error;
    }

    return {
        data: response.body.choices[0].message.content
    }
})
