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
                        <v-card-text>{{ details.Plot }} </v-card-text>
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

export default {
    name: "DetailCard",
    props: ["movie"],

    setup(props) {
        console.log(getCurrentInstance())
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
                this.$http
                    .get(`http://www.omdbapi.com/?t=${this.movie.Title}&apikey=3e06b3ae`)
                    .then(function(response) {
                        details.value = { ...response.body };
                        genres.value = this.details.Genre.split(",");
                        root.data.addNewMovie(response.body);
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
