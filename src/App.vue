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
                label="Movies&Stuff"
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
import HelloWorld from "./components/HelloWorld";
import { moviesOfTwentyTwenty } from "./constants/movies";

export default {
    name: "App",

    components: {
        HelloWorld,
    },

    data: () => ({
        finalSearchTerm: "",
        timer: {},
        results: [],
        model: null,
        search: null,
        touched: false,
    }),

    watch: {
        search: function() {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.finalSearchTerm = this.search;
            }, 1000);

            if (this.search === "") {
                this.touched = false;
            } else if (this.search == null) {
                this.search = this.finalSearchTerm;
                this.touched = true;
            } else {
                this.touched = true;
            }
        },
    },

    methods: {
        filterResults() {
            if (this.search != "")
                this.results = moviesOfTwentyTwenty
                    .filter((item) => item.toLowerCase().indexOf(this.search.toLowerCase()) > -1)
                    .splice(0, 5);
            else {
                this.results = [];
            }
        },
        resetState(){
            this.finalSearchTerm= "";
            this.timer= {};
            this.results= [];
            this.model= null;
            this.search= null;
            this.touched= false;
        },
    },
};
</script>
