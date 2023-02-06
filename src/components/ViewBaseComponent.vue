<template>
  <!--
  <div>
    <SidebarComponent />
    <div class="md:pl-64 flex flex-col flex-1">
      <TopBarComponent></TopBarComponent>
      <main>
        <div class="py-6">
          <div class="max-w-12xl mx-auto px-4 sm:px-6 md:px-8">
            <slot name="subpage-header"></slot>
          </div>
          <div class="max-w-12xl mx-auto px-4 sm:px-6 md:px-8">
            <div class="py-4">
              <slot name="subpage-content"></slot>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
  -->
  <div class="w-screen h-screen">
    <div class="flex flex-col justify-between h-full">
      <div>
        <NavbarComponent />
        <slot name="subpage-header"></slot>
        <!-- <BreadcrumbComponent subpageName="Analysis" />-->
      </div>
      <main>
        <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <!--<ScannedHostsComponent></ScannedHostsComponent>-->
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
