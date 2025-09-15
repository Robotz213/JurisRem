import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

const mainFramePropsStore = defineStore("mainFramePropsStore", () => {
  const route = useRoute();

  const toggleSidebar = ref(false);
  const widthSidebar = computed(() => (!toggleSidebar.value ? "75px" : "250px"));
  const translateX = computed(() => (!route.meta.isLogged ? `-${widthSidebar.value}` : "0px"));
  const marginLeft = computed(() => (!route.meta.isLogged ? "0px" : widthSidebar.value));

  return { marginLeft, widthSidebar, toggleSidebar, translateX };
});

export default mainFramePropsStore;
