<template>
  <v-app id="inspire">
    <v-app-bar app color="white" class="d-flex justify-center" flat>
      <v-container class="py-0 fill-height ">
        <v-btn text to="/write-review">Write feedback</v-btn>
        <v-btn text to="/allfeedbacks">All feedbacks</v-btn>
        <v-btn text to="/about">About</v-btn>
        <v-btn text to="/rating">Rating</v-btn>
        <v-spacer></v-spacer>
        <v-responsive max-width="260" class="ml-10">
          <v-text-field dense flat hide-details rounded solo-inverted></v-text-field>
        </v-responsive>
        <v-avatar class="mx-10" color="green darken-1" size="32"></v-avatar>

        <!-- Profile   -->
        <v-menu
          offset-y
          bottom
          origin="center center"
          transition="scrole-y-transition">
          <template v-slot:activator="{ on, attrs }">
            <v-btn text to="/authentication" v-bind="attrs" v-on="on">
              <v-icon left>mdi-login</v-icon>
              <span class="material-icons">Profile</span>
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="(item, i) in items" :key="i">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-container>
    </v-app-bar>

    <v-main class="yellow lighten-4">
      <v-container style="max-width: 1185px;">
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    items: [{
      title: 'Registration'
    },
    {
      title: 'Log in'
    },
    {
      title: 'Log out'
    }]
  })
}
</script>
