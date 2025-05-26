import { InferenceClient } from "@huggingface/inference";
import { z } from "zod/v4";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const validator = z.object({
        input: z.string().max(300).min(2),
    });

    try {
        validator.parse({ input: body.input })
    } catch (err) {
        if (err instanceof z.ZodError) {
            throw createError({
                statusCode: 422,
                statusMessages: z.prettifyError(err),
            })
        }
    }

    const token = useRuntimeConfig(event).HFToken;
    const client = new InferenceClient(token);

    const response = await client.chatCompletion({
        model: "CohereLabs/aya-expanse-8b",
        messages: [
            {
                role: "user",
                content: "若有病患告訴你他的症狀是 " + body.input + " 請問最有可能的icd-10診斷代碼是甚麼?請直接回覆我最接近的三個診斷代碼，不需要額外的說明，並且三個代碼之間使用'|'的符號號分隔，例如:6C510|6C511|A000"
            }
        ],
        max_tokens: 512
    });

    return {
        data: response.choices[0].message.content
    }
})
