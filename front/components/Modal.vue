<template>
  <transition name="modal-fade">
          <slot></slot>
  </transition>
</template>

<style scoped>
.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>