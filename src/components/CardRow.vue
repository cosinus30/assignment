<template>
    <v-container>
        <v-row class="text-center">
            <template v-if="!success">
                <v-col cols="12">
                    <h1>
                        Uuups seems like there is no result
                    </h1>
                </v-col>
            </template>
            <template v-else-if="!loading">
                <v-col cols="6">
                    <h1>
                        You searched for <em>{{ searchTerm }}</em>
                    </h1>
                </v-col>
                <v-col cols="6">
                    <v-btn @click="reset">
                        Clear Search
                    </v-btn>
                </v-col>
                <card v-for="movie in movies" v-bind:key="movie.title" v-bind:movie="movie" />
            </template>
            <template v-else class="py-8">
                <v-sheet
                    v-for="(item, index) in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
                    :key="index"
                    class="pa-3 ma-2 grey lighten-5"
                >
                    <v-skeleton-loader class="mx-auto" width="300" type="card"></v-skeleton-loader>
                </v-sheet>
            </template>
        </v-row>
    </v-container>
</template>

<script>
import Card from "./DetailCard";
import { ref, watch } from "@vue/composition-api";
import axios from "axios";

export default {
    name: "CardRow",
    components: { Card },
    props: ["searchTerm", "reset"],

    setup(props) {
        const success = ref(false);
        const movies = ref([]);
        const loading = ref(false);

        watch(
            () => props.searchTerm,
            function() {
                console.log("I worked");
                loading.value = true;
                axios
                    .get(`http://www.omdbapi.com/?s=${props.searchTerm}&apikey=3e06b3ae&y=2020&plot=full`)
                    .then(function(response) {
                        const data = response.data;
                        if (data.Response === "True") {
                            movies.value = [...data.Search];
                            success.value = true;
                        } else success.value = false;
                        loading.value = false;
                    });
            }
        );

        return {
            success,
            movies,
            loading,
        };
    },
};
</script>
