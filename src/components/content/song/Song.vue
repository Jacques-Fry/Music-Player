<template>
  <div class="song">
    <SongItem v-for="(item, index) in songs" :key="index" :song="item" />
  </div>
</template>

<script type="text/javascript">
import SongItem from "./SongItem";
export default {
  name: "Song",
  props: {
    songs: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    SongItem
  }
};
</script>

<style scoped>
</style>
