<template>
    <v-app>
        <v-app-bar app dark>
            <div class="d-flex align-center">
                <v-img
                    @click="resetState"
                    alt="Pitcher Logo"
                    class="shrink mr-2"
                    contain
                    src="https://www.pitcher.com/hubfs/identity/logos/anniversary-logo/210114_pitcher_logo_anniversary_white_RGB.svg"
                    transition="scale-transition"
                    width="40"
                />
            </div>
            <v-autocomplete
                class="mt-4 mx-8"
                v-model="model"
                @keyup="filterResults"
                :items="results"
                :search-input.sync="search"
                item-text="Movie Title"
                item-value="Movie Title2"
                label="Search and enter..."
                placeholder="Start typing to Search"
                prepend-icon="mdi-magnify"
                return-object
            ></v-autocomplete>
        </v-app-bar>

        <v-main>
            <HelloWorld v-if="touched" :searchTerm="finalSearchTerm" :reset="resetState" />
            <template v-else>
                <div style="position: relative;">
                    <v-img
                        src="https://cdn.dribbble.com/users/2187949/screenshots/7780753/media/185ccbcc0d1fbec028e867136e5096a3.jpg"
                    >
                    </v-img>
                    <h1 style="position: absolute; top: 128px; left: 128px;">
                        Why don't you start typing already?
                    </h1>
                </div>
            </template>
        </v-main>
    </v-app>
</template>

<script>
import { ref, watch } from "@vue/composition-api";
import HelloWorld from "./components/HelloWorld";
import { moviesOfTwentyTwenty } from "./constants/movies";

export default {
    name: "App",

    components: {
        HelloWorld,
    },

    setup() {
        const finalSearchTerm = ref("");
        const timer = ref({});
        const model = ref("");
        const search = ref("");
        const touched = ref(false);
        let results = ref([]);

        function filterResults() {
            if (search.value != "")
                results.value = moviesOfTwentyTwenty
                    .filter((item) => item.toLowerCase().indexOf(search.value.toLowerCase()) > -1)
                    .splice(0, 5);
            else {
                results.value = [];
            }
            console.log(results)
        }

        watch(search, function() {
            clearTimeout(timer);
            timer.value = setTimeout(() => {
                finalSearchTerm.value = search.value;
            }, 1000);

            if (search.value === "") {
                touched.value = false;
            } else if (search.value == null) {
                search.value = finalSearchTerm.value;
                touched.value = true;
            } else {
                touched.value = true;
            }
        });

        function resetState() {
            finalSearchTerm.value = "";
            timer.value = {};
            results.value = [];
            model.value = null;
            search.value = null;
            touched.value = false;
        }

        return {
            results,
            finalSearchTerm,
            timer,
            model,
            search,
            touched,
            resetState,
            filterResults
        };
    },
};
</script>
