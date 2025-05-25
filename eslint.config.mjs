// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import pluginVue from 'eslint-plugin-vue'


export default withNuxt(
  ...pluginVue.configs['flat/recommended'],
  {
    files: ["**/*.{js,mjs,cjs,ts,vue}"],
    rules: {
      "vue/multi-word-component-names": ["error", {
        "ignores": ['index', 'default']
      }]
    }
    // },
    // {
    //   ...
  }
)
