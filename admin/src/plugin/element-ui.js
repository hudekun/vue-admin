import Vue from 'vue'
import {
    Button,
    Form,
    Upload,
    FormItem,
    Input,
    Message,
    Avatar,
    Link,
    Container,
    Header,
    Aside,
    Main,
    Menu,
    Submenu,
    MenuItem,
    Breadcrumb,
    BreadcrumbItem,
    MessageBox,
    Col,
    Card
} from 'element-ui'


Vue.use(Button)
Vue.use(Upload)
Vue.use(Avatar)
Vue.use(Card)
Vue.use(Col)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Button)
Vue.use(Input)
Vue.use(Form)
Vue.use(FormItem)
Vue.component(Message.name, Message)
Vue.component(MessageBox.name, MessageBox)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Link)


Vue.prototype.$message = Message
Vue.prototype.$MessageBox = MessageBox