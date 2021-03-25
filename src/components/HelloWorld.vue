<template>
    <v-container>
        <v-row>
            <card v-for="movie in movies" v-bind:key="movie.title" v-bind:movie="movie"/>
        </v-row>
    </v-container>
</template>

<script>
import Card from "./DetailCard";

export default {
    name: "HelloWorld",
    components: { Card },
    data: () => ({
      success: true,
      movies: [],
    }),

    mounted() {
        this.$http.get("http://www.omdbapi.com/?s=lord&apikey=3e06b3ae&y=2020").then(function(response) {
            console.log(response.body.Response)
            if(response.body.Response === "True"){
              this.movies = [...response.body.Search]
              console.log(this.movies)
            }else
              this.success = false;
        });
    },
};
</script>
