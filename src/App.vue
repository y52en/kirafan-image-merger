<template lang="pug">
  v-app
    v-main
      HelloWorld.mx-2
    
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
    //
  }),
};
</script>
