<template>
  <div>
    <p>{{auth}}</p>
    <p id="dataisi"></p>
  </div>
</template>

<script>
export default {
  name: "App",
  mounted() {
    this.$("#dataisi").html("ISILAH DATANYA BROO");
  },
  data() {
    return {
      auth: this.$CredMng.credentialKeyTake()
    };
  }
};
</script>