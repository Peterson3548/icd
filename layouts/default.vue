<template>
  <div>
    <div>
      <button @click="navigateTo('/')">
        home
      </button>

      <button @click="navigateTo('get-example')">
        get-examle
      </button>

      <button @click="navigateTo('post-example')">
        post-examle
      </button>
    </div>

    <slot />
  </div>
</template>