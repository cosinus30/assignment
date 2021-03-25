<template>
    <v-app>
        <v-app-bar app color="primary" dark>
            <div class="d-flex align-center">
                <v-img
                    alt="Vuetify Logo"
                    class="shrink mr-2"
                    contain
                    src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
                    transition="scale-transition"
                    width="40"
                />

                <v-img
                    alt="Vuetify Name"
                    class="shrink mt-1 hidden-sm-and-down"
                    contain
                    min-width="100"
                    src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
                    width="100"
                />
            </div>

            <div style="position: relative;" class="mx-auto">
                <input
                    v-model="searchTerm"
                    type="text"
                    placeholder="Search..."
                    class=" red lighten-5 rounded-pill px-4 py-2"
                />
                <v-icon style="position: absolute; right: 8px; top: 8px; color: black;">
                    mdi-magnify
                </v-icon>
            </div>
        </v-app-bar>

        <v-main>
            <HelloWorld />
        </v-main>
    </v-app>
</template>

<script>
import HelloWorld from "./components/HelloWorld";

export default {
    name: "App",

    components: {
        HelloWorld,
    },

    data: () => ({
        searchTerm: "",
    }),
};
</script>
