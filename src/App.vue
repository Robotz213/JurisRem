<script setup lang="ts">
import { BApp } from "bootstrap-vue-next";
import { storeToRefs } from "pinia";
import mainFramePropsStore from "./app/stores/mainFrameStore";
import { MainFrame } from "./assets/styled";
import SidebarView from "./components/SidebarView.vue";
import TitlebarView from "./components/TitlebarView.vue";
const { marginLeft } = storeToRefs(mainFramePropsStore());
</script>

<template>
  <BApp>
    <TitlebarView />
    <div id="ContentApp">
      <RouterView v-slot="{ Component }">
        <MainFrame :margin-left="marginLeft">
          <SidebarView />
          <Transition name="fade" mode="out-in">
            <component :is="Component"></component>
          </Transition>
        </MainFrame>
      </RouterView>
    </div>
  </BApp>
</template>

<style lang="css" scoped>
#ContentApp {
  margin-top: 35px;
  height: calc(100dvh - 35px);
  width: 100dvw;
  overflow: hidden;
}
</style>
