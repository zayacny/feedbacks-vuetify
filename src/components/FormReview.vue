<template>
<v-container class="ma-auto text-center" style="max-width:1000px">
   <h1 class="ma-3 display-4">Write a Feedback </h1>
   <v-divider class="ma-3"></v-divider>
  <validation-observer
    ref="observer"
    v-slot="{ invalid }"
  >
    <form @submit.prevent="submit">
<v-row>
   <v-col>
      <!-- Place or organization -->
      <validation-provider
        v-slot="{ errors }"
        name="Name place\organization "
        :rules="{
        required: true
        }"
      >
        <v-text-field
          v-model="user.orgName"
          :error-messages="errors"
          label="Exact name of the place\organization"
          required
        ></v-text-field>
      </validation-provider>
   </v-col>
   <v-col>
      <!-- Adress -->
       <validation-provider
        v-slot="{ errors }"
        name="Address location"
       >
        <v-text-field
          v-model="user.address"
          :error-messages="errors"
          label="Address location"
          required
        ></v-text-field>
      </validation-provider>
   </v-col>
</v-row>
<v-row>
  <!-- Feedback text -->
     <v-textarea
       v-model="user.feedbackText"
        filled
        row-height=5
        counter
        maxlength="500"
        label="Write what you want to tell about this place\organization"
      ></v-textarea>
</v-row>

<v-row>
<!-- User name -->
   <v-col>
      <validation-provider
        v-slot="{ errors }"
        name="User name"
        rules="required|max:30"
      >
        <v-text-field
          v-model="user.userName"
          :error-messages="errors"
          label="Your name"
          required
        ></v-text-field>
      </validation-provider>
   </v-col>
<!-- E-mail -->
   <v-col>
     <validation-provider
        v-slot="{ errors }"
        name="email"
        rules="required|email"
      >
        <v-text-field
          v-model="user.email"
          :error-messages="errors"
          label="E-mail"
          required
        ></v-text-field>
      </validation-provider>
   </v-col>
</v-row>

<v-row>
<!-- Upload photo -->
   <v-col>
      <v-file-input
        v-model="user.fileImg"
        placeholder="Click here - add photo"
        accept=".jpg, .png, .gif, jpeg">
      </v-file-input>
   </v-col>

<!-- Date picker -->
   <v-col>
    <v-menu
        v-model="menu2"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="user.date"
            label="When it happend"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="user.date"
          @input="menu2 = false"
        ></v-date-picker>
      </v-menu>
   </v-col>
</v-row>

<!-- Rating -->
<v-row>
   <v-col>
     <v-rating class="mt-3"
        v-model="user.rate"
        size=50
        value=0
        background-color="black"
        color="orange"
        length=10
        aria-label="rate adsfgbsdfgndrhnd">
     </v-rating>
   </v-col>
</v-row>

<!-- Check -->
   <div class="d-flex justify-center">
      <validation-provider
        v-slot="{ errors }"
        rules="required"
        name="checkbox"
      >
        <v-checkbox
          v-model="checkbox"
          :error-messages="errors"
          value="1"
          label="Option"
          type="checkbox"
          required
        ></v-checkbox>
      </validation-provider>
    </div>

<!--submit buttons  -->
      <v-btn
        class="mr-4"
        type="submit"
        :disabled="invalid"
      >
        Save feedback
      </v-btn>
      <v-btn @click="clear">
        Clear
      </v-btn>

    </form>
  </validation-observer>
</v-container>
</template>

<script>
import { required, digits, email, max, regex } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import { mapActions } from 'vuex'

setInteractionMode('eager')
extend('digits', {
  ...digits,
  message: '{_field_} needs to be {length} digits. ({_value_})'
})
extend('required', {
  ...required,
  message: '{_field_} can not be empty'
})
extend('max', {
  ...max,
  message: '{_field_} may not be greater than {length} characters'
})
extend('regex', {
  ...regex,
  message: '{_field_} {_value_} does not match {regex}'
})
extend('email', {
  ...email,
  message: 'Email must be valid'
})

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      menu2: false,
      user: {
        userName: '',
        email: '',
        orgName: '',
        feedbackText: '',
        address: '',
        date: '' || new Date().toISOString().substr(0, 10),
        rate: null,
        fileImg: null
      },
      checkbox: null
    }
  },

  methods: {
    ...mapActions(['saveUser', 'writeFeedback', 'savePhoto', 'saveCompany', 'fetchIdCompany']),

    async submit () {
      this.$refs.observer.validate()
      const fileNameImg = await this.savePhoto(this.user.fileImg)
      const oneFeedback = {
        ...this.user,
        id_company: 0,
        fileNameImg: fileNameImg
      }
      await this.saveUser(oneFeedback)
      oneFeedback.id_company = await this.saveCompany(oneFeedback)
      console.log('returned id_company is :::: ', oneFeedback)
      this.writeFeedback(oneFeedback)
    },
    clear () {
      // this.name = ''
      // this.phoneNumber = ''
      // this.email = ''
      // this.select = null
      // this.checkbox = null
      this.$refs.observer.reset()
    }
  }
}
</script>

<style>
 .container-sm .row{
 margin-top: 12px;
}
</style>
