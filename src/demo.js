import './style.css';
import './colors.css';
import 'change-theme-button/dist/changeTheme.css';

import { Vue, ChangeTheme } from 'change-theme-button';

new Vue({
  components: { ChangeTheme }
}).$mount('.global-content');