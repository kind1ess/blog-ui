<template>
  <div>
      <MyNav></MyNav>
      <!-- <el-image :src="url" fit="contain"></el-image> -->
      <img src="../../assets/404.jpg" alt="404" width="100%">
      <MyFooter></MyFooter>
  </div>
</template>

<script>
import MyNav from '../../components/Nav';
import MyFooter from '../../components/Footer';
export default {
    components:{
        MyNav,
        MyFooter
    }
}
</script>

<style scoped>
</style>