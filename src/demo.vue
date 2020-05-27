<template>
  <section class="demo">
    <h4>Select the type of demo</h4>
    <p>
      <label>
        <input
          v-model="type"
          type="radio"
          name="type"
          value="localstorage"
        >
        <span>Reading / saving from local storage</span>
      </label>
    </p>
    <p>
      <label>
        <input
          v-model="type"
          type="radio"
          name="type"
          value="v-model"
        >
        <span>Reading / saving from a custom model</span>
      </label>
    </p>
    <div v-if="type == 'localstorage'">
      <h2>Example reading / saving from local storage</h2>
      <change-theme />
      <p>On here the value will be "saved" into the localStorage</p>
    </div>
    <div v-if="type == 'v-model'">
      <h2>Example reading / saving from a custom model</h2>
      <p><change-theme v-model="override" /> Value: {{ override }}</p>
      <p>On here the value will be "saved" into the model and not in the localStorage</p>
      <p>This can be usefull if the developer want to store the theme somewhere else.</p>
    </div>
  </section>
</template>

<script>
  import ChangeTheme from '../vue/change-theme.vue';
  export default {
    name: 'Demo',
    components: {
      ChangeTheme
    },
    data() {
      return {
        type: 'localstorage',
        override: 'system-theme'
      }
    }
  }
</script>

<style>
  .demo {
    font-family: sans-serif;
    max-width: 800px;
    margin: auto;
  }
</style>