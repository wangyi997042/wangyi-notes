import { createApp } from 'vue'
import { ActionBar, ActionBarIcon, ActionBarButton, Divider, Popup, Overlay, Loading, Dialog, ContactCard, Form, AddressEdit, AddressList, Field, CellGroup, Cell, SwipeCell, Icon, Stepper, Card, Checkbox, CheckboxGroup, Button, Swipe, SwipeItem, PullRefresh, List, Tab, Tabs, SubmitBar, Toast, Skeleton } from 'vant'

import App from './App.vue'
import router from './router';
import store from './store';

import 'vant/lib/index.css'; // 全局引入样式

const app = createApp(App);

app.use(ActionBarButton)
  .use(ActionBarIcon)
  .use(ActionBar)
  .use(Divider)
  .use(Popup)
  .use(Overlay)
  .use(Loading)
  .use(Dialog)
  .use(Toast)
  .use(ContactCard)
  .use(Form)
  .use(AddressEdit)
  .use(AddressList)
  .use(Field)
  .use(CellGroup)
  .use(Cell)
  .use(SwipeCell)
  .use(Icon)
  .use(Stepper)
  .use(Card)
  .use(Button)
  .use(Swipe)
  .use(SwipeItem)
  .use(PullRefresh)
  .use(List)
  .use(Tab)
  .use(Tabs)
  .use(SubmitBar)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Skeleton)

app.use(router)
app.use(store)
app.mount('#app')

// createApp(App).mount('#app')
