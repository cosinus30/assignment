import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueResource from "vue-resource";
import VueCompositionApi from '@vue/composition-api'

Vue.config.productionTip = false;

Vue.use(VueResource);
Vue.use(VueCompositionApi);

var store = {
    state: {
        movieList: [],
    },
    addNewMovie(newValue) {
        this.state.movieList.push(newValue);
    },
    getMovie(title) {
        return this.state.movieList.filter((el) => el.Title == title);
    },
};

new Vue({
    vuetify,
    data: store,
    render: (h) => h(App),
}).$mount("#app");
