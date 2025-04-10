<script setup lang="ts">
const {
  name = 'fade',
  appear = true,
  duration = 500,
  mode='default',
  transitionTime='0.3s'
} = defineProps<{
  name?:
    | 'fade'
    | 'slide-left'
    | 'slide-right'
    | 'slide-up'
    | 'slide-down'
    | 'zoom'
    | 'bounce'
  mode?: 'in-out' | 'out-in' | 'default'
  appear?: boolean
  duration?: number
  transitionTime?: string
}>()
const emit = defineEmits<{
  'on-enter': [e: any]
  'on-leave': [e: any]
}>()
const onEnter = (e: any) => {
  emit('on-enter', e)
}
const onLeave = (e: any) => {
  emit('on-leave', e)
}
</script>
<template>
  <transition
    :name
    :mode
    :appear
    :duration
    v-bind="$attrs"
    @enter="onEnter"
    @leave="onLeave"
  >
    <slot />
  </transition>
</template>
<style scoped>
/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity v-bind(transitionTime) ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slide transition */
.slide-left-enter-active,
.slide-left-leave-active {
  transition:
    transform v-bind(transitionTime) ease,
    opacity v-bind(transitionTime) ease;
}
.slide-left-enter-from {
  transform: translateX(100%);
}
.slide-left-leave-to {
  transform: translateX(-100%);
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition:
    transform v-bind(transitionTime) ease,
    opacity v-bind(transitionTime) ease;
}
.slide-right-enter-from {
  transform: translateX(-100%);
}
.slide-right-leave-to {
  transform: translateX(100%);
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition:
    transform v-bind(transitionTime) ease,
    opacity v-bind(transitionTime) ease;
}
.slide-up-enter-from {
  transform: translateY(20px);
  opacity: 0;
}
.slide-up-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition:
    transform v-bind(transitionTime) ease,
    opacity v-bind(transitionTime) ease;
}
.slide-down-enter-from {
  transform: translateY(-20px);
  opacity: 0;
}
.slide-down-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

/* Zoom transition */
.zoom-enter-active,
.zoom-leave-active {
  transition: transform v-bind(transitionTime) ease;
}
.zoom-enter-from,
.zoom-leave-to {
  transform: scale(0.5);
}

/* Bounce transition */
.bounce-enter-active {
  animation: bounce-in v-bind(transitionTime);
}
.bounce-leave-active {
  animation: bounce-in v-bind(transitionTime) reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
