<script setup lang="ts">
import mainFramePropsStore from "@/app/stores/mainFrameStore";
import SideBar from "@/assets/styled/sidebar";
import { storeToRefs } from "pinia";
const { widthSidebar, translateX } = storeToRefs(mainFramePropsStore());
</script>

<template>
  <SideBar :width="widthSidebar" :translatepx="translateX"> teste </SideBar>
</template>
