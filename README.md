
# Change Theme Button

A button to change the theme for the current website

It:

- Is build in Vue.js v3
- Includes a compiled version to use in the website without running Vue's server
- Saves the selected theme in the `localStorage`.
- Alternatively you cand bind `v-model` to save it somewhere else.
- Show 3 options: Light Theme, Dark Theme and System Theme (this one being dynamic according to your configurations)
- Includes an SCSS file as a base for the theme configuration.


## Before use

1. Include on your website the `scss/colors.scss` style.

    ```css
    @import "change-theme-button/scss/colors";
    ```

    If you're not using sass, you can use `public/style.css` instead.

2. Set on your page's `<body>` the theme of the website, you can use the system-theme to make it dynamic.

    ```html
    <body class="system-theme">
    ```


## Installing

```bash
npm install --save change-theme-button
```


## Calling the Library

```javascript
import { ChangeTheme } from 'change-theme-button';
```


## Calling it on Project Without Vue

```javascript
import { Vue, ChangeTheme } from 'change-theme-button';

new Vue({
  components: { ChangeTheme }
}).$mount('#global-content');
```


## Available Themes

There's 3 themes you can use on your website

- `system-theme`
- `light-theme`
- `dark-theme`

## Options

You can add different options to the `<chage-theme>`:

- `icon-name`: change the class of the icon, you can use that to chage the icon to match your site's theme.
- `set-color-on-load`: (true by default) loads the theme on page load
- `v-model`: binds the name of the theme to a variable instead of saving it to the localStorage.