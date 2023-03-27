<template>
  <div class="w-screen h-screen">
    <div class="flex flex-col justify-between h-full">
      <div>
        <NavbarComponent />
        <slot name="subpage-header"></slot>
      </div>
      <main>
        <div class="max-w-8xl mx-auto py-6 sm:px-6 lg:px-8 p-4">
          <slot name="subpage-content"></slot>
        </div>
      </main>
      <div class="bg-black">
        <BottomTabsComponent></BottomTabsComponent>
        <div class="h-80 min-h-80 overflow-y-auto">
          <TerminalComponent class="overflow-hidden"></TerminalComponent>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import BottomTabsComponent from "./BottomTabsComponent.vue";
import TerminalComponent from "../components/TerminalComponent.vue";
import NavbarComponent from "../components/NavbarComponent.vue";
</script>
