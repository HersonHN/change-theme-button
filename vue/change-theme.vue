<template>
  <section
    ref="parent"
    class="change-theme"
  >
    <a
      href="#"
      :class="iconName"
      @click.prevent="showPopup = !showPopup"
    >{{ iconText }}</a>

    <div
      class="change-theme-popup"
      :class="{ 'show' : showPopup }"
    >
      <div
        v-for="t of themeList"
        :key="t.id"
      >
        <button
          class="theme-entry bg-color"
          :class="[t.id == theme ? 'fg-color-border' : '']"
          @click.prevent="setTheme(t.id)"
        >
          {{ t.name }}
        </button>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  name: 'ChangeTheme',
  props: {
    iconName: {
      type: String,
      default: 'icon-cog'
    },
    iconText: {
      type: String,
      default: ''
    },
    setColorOnLoad: {
      type: Boolean,
      default: true
    },
    target: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      theme: 'system-theme',
      themeList: [
        { id: 'system-theme', name: 'Auto' },
        { id: 'light-theme', name: 'Light' },
        { id: 'dark-theme', name: 'Dark' },
      ],

      showPopup: false,
      hasListener: null,
    };
  },

  watch: {
  },

  mounted() {
    this.hasListener = !!this.$listeners.input;
    this.theme = this.getTheme();

    if (this.setColorOnLoad) {
      this.setDOMTheme(this.theme);
    }

    this.bindBodyEvent();
  },

  methods: {

    bindBodyEvent() {
      let parent = this.$refs.parent;

      document.addEventListener('click', (event) => {
        let clickedElement = event.target;

        if (!parent.contains(clickedElement)) {
          this.showPopup = false;
        }
      })
    },

    setTheme(theme) {
      this.setDOMTheme(theme);
      this.setSavedTheme(theme);
    },

    setSavedTheme(theme) {
      if (!this.hasListener) {
        localStorage.setItem('theme', theme);
      } else {
        this.$emit('input', theme);
        this.$emit('change', theme);
      }
    },

    setDOMTheme(theme) {
      if (!theme) return;

      this.theme = theme;
      let element = this.getTarget();
      let themes = this.themeList.map(t => t.id);
      element.classList.remove(...themes);
      element.classList.add(theme);
    },

    getTheme() {
      let theme = this.getSavedTheme() || this.getDOMTheme();

      let isValid = this.themeList.find(t => theme == t.id);
      if (isValid) {
        return theme;
      }
      return '';
    },

    getSavedTheme() {
      if (!this.hasListener) {
        return localStorage.getItem('theme');
      } else {
        return this.value;
      }
    },

    getDOMTheme() {
      let classes = this.getTarget().classList;

      for (let theme of this.themeList) {
        if (classes.contains(theme.id)) {
          return theme.id;
        }
      }
      return '';
    },

    getTarget() {
      if (this.target) {
        return document.querySelector(this.target);
      }

      return document.body;
    },

  },

};
</script>

<style>
@import './vendor/fontello.css';

.change-theme {
  display: inline-block;
  position: relative;
  width: 2rem;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
}

.change-theme a {
  font-size: 1.5em;
  cursor: pointer;
  text-decoration: none;
}
.change-theme button {
  color: inherit;
}
.change-theme .change-theme-popup {
  display: block;
  width: 3rem;
  line-height: 1rem;
  position: absolute;
  left: -0.5rem;
  transition: visibility 0.2s, opacity 0.2s;
  visibility: hidden;
  opacity: 0;
  z-index: 1;
}
.change-theme .change-theme-popup.show {
  visibility: visible;
  opacity: 1;
}
.change-theme .theme-entry {
  font-family: sans-serif;
  font-size: 0.7rem;
  display: block;
  padding: 0.2rem .5rem;
  line-height: 1rem;
  margin: 0 0 0.25rem 0;
  border: 1px solid rgba(128, 128, 128, 0.5);
  border-radius: 3px;
  cursor: pointer;
  user-select: none;
}
</style>
