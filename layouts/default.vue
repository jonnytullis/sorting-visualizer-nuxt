<template>
  <v-app dark>
    <v-app-bar
      fixed
      app
    >
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-toolbar-items>
        <v-btn :icon="$vuetify.breakpoint.xsOnly" href="https://github.com/jonnytullis/sorting-visualizer">
          <v-icon large>mdi-github</v-icon>
          <div v-if="!$vuetify.breakpoint.xsOnly" class="ms-2">
            Source Code
          </div>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'default',
  data () {
    return {
      fixed: false,
      title: 'Sorting Visualizer'
    }
  }
}
</script>
