<template>
    <v-app>
        <v-app-bar app dark>
            <div class="d-flex align-center">
                <v-img
                    alt="Pitcher Logo"
                    class="shrink mr-2"
                    contain
                    src="https://www.pitcher.com/hubfs/identity/logos/anniversary-logo/210114_pitcher_logo_anniversary_white_RGB.svg"
                    transition="scale-transition"
                    width="40"
                />
            </div>

            <div style="position: relative;" class="mx-auto">
                <input
                    v-model="search"
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
            <HelloWorld v-if="touched" :searchTerm="finalSearchTerm" />
            <template v-else>
                    <div style="position: relative; height:1080px;">
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

export default {
    name: "App",

    components: {
        HelloWorld,
    },

    data: () => ({
        search: "",
        touched: false,
        finalSearchTerm: "",
        timer: {},
    }),

    watch: {
        search: function() {
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.finalSearchTerm = this.search;
            }, 1000);

            if (this.search === "") this.touched = false;
            else this.touched = true;
        },
    },
};
</script>
