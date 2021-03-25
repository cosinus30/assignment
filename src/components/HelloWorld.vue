<template>
    <v-container>
        <v-row>
            <template v-if="!success">
                <h1>
                    Uuups seems like there is no result
                </h1>
            </template>
            <template v-else-if="!loading">
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

export default {
    name: "HelloWorld",
    components: { Card },
    props: ["searchTerm"],
    data: () => ({
        success: true,
        movies: [],
        loading: false,
    }),

    watch: {
        searchTerm: function() {
            this.loading = true;
            this.$http
                .get(`http://www.omdbapi.com/?s=${this.searchTerm}&apikey=3e06b3ae&y=2020&plot=full`)
                .then(function(response) {
                    if (response.body.Response === "True") {
                        this.movies = [...response.body.Search];
                        this.success = true;
                    } else this.success = false;
                    this.loading = false;
                });
        },
    },
};
</script>
