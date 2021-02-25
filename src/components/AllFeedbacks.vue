<template>
  <v-container>
    <v-hover v-slot="{ hover }" v-for="feedback in $store.getters.getFeedbacks" :key="feedback.id">
      <v-card
         class="mb-3"
        :elevation="hover ? 16 : 2"
        :class="{ 'on-hover': hover }"
        outlined
        >
      <v-row class="ma-auto">
        <v-col cols="sm-3" class="my-auto">
          <v-img aspect-ratio="1.4" :src="'http://localhost:3000/'+feedback.name_img" alt="Image of company"></v-img>
        </v-col>
        <v-col cols="sm-9">
          <v-card-title>{{feedback.company.name_company}}</v-card-title>
          <v-card-subtitle>{{feedback.company.address}}<br>{{feedback.date.slice(0, 10)}}</v-card-subtitle>
          <v-rating
            size=25
            :value="feedback.rate"
            dense
            readonly
            background-color="black"
            color="orange"
            length=10
            aria-label="rate adsfgbsdfgndrhnd"
            class=ml-2>
          </v-rating>
          <v-card-subtitle class="pt-0">{{feedback.rate}}/10</v-card-subtitle>
          <v-card-text>{{feedback.review}}<br>{{feedback.username}}</v-card-text>
        </v-col>
      </v-row>
    </v-card>
    </v-hover>

  </v-container>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: mapState([
    'rowsFeedbacks'
  ]),
  async created () {
    await this.$store.dispatch('getFeedbacks')
  }
}
</script>
<style>
</style>
