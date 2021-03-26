<template>
    <v-col cols="12" sm="4" md="3">
        <v-card class="mx-auto my-12">
            <v-img height="280px" :src="movie.Poster"></v-img>
            <v-card-title class="py-2">
                {{ movie.Title }}
            </v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" persistent max-width="600px">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn color="dark" text @click="getAllDetails()" v-bind="attrs" v-on="on">
                            More Info <v-icon>{{ "mdi-chevron-down" }}</v-icon>
                        </v-btn>
                    </template>
                    <v-card>
                        <v-img height="480" :src="movie.Poster"></v-img>
                        <v-card-title class="py-4">
                            <v-row>
                                <v-chip-group column>
                                    <v-chip v-for="genre in genres" :key="genre">{{ genre }}</v-chip>
                                </v-chip-group>
                                <v-spacer></v-spacer>
                                <div
                                    class="d-flex flex-column justify-center text-right font-weight-light caption mr-4"
                                >
                                    <span>
                                        {{ details.Released }}
                                    </span>
                                    <span> {{ details.Runtime }}" </span>
                                </div>
                            </v-row>
                        </v-card-title>
                        <v-card-title>
                            <span class="headline">{{ movie.Title }}</span>
                        </v-card-title>
                        <v-card-text>
                            <v-row class="mx-1">
                                {{ details.Plot }}
                            </v-row>
                            <v-row justify="space-around" class="mt-8">
                                <v-tooltip bottom v-for="rating in details.Ratings" :key="rating.Source">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-avatar color="indigo" size="60" v-bind="attrs" v-on="on">
                                            <span class="white--text">{{ rating.Value }}</span>
                                        </v-avatar>
                                    </template>
                                    <span>
                                        {{ rating.Source }}
                                    </span>
                                </v-tooltip>
                            </v-row>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="dialog = false">
                                Close
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-card-actions>
        </v-card>
    </v-col>
</template>

<script>
import { ref, getCurrentInstance } from "@vue/composition-api";
import axios from "axios";

export default {
    name: "DetailCard",
    props: ["movie"],

    setup(props) {
        const root = getCurrentInstance().root;
        const dialog = ref(false);
        const details = ref({});
        const genres = ref([]);

        function getAllDetails() {
            const cachedMovies = root.data.getMovie(props.movie.Title);
            if (cachedMovies.length > 0) {
                const targetMovie = cachedMovies[0];
                details.value = { ...targetMovie };
                genres.value = targetMovie.Genre.split(",");
            } else {
                axios.get(`http://www.omdbapi.com/?t=${this.movie.Title}&apikey=3e06b3ae`).then(function(response) {
                    console.log(response.data);
                    details.value = { ...response.data };
                    genres.value = details.value.Genre.split(",");
                    root.data.addNewMovie(response.data);
                });
            }
        }
        return {
            dialog,
            details,
            genres,
            getAllDetails,
        };
    },
};
</script>
