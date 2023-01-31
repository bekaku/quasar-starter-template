<template>
  <div>
    <p>{{ title }}</p>
    <ul>
      <li v-for="todo in todos" :key="todo.id" @click="increment">
        {{ todo.id }} - {{ todo.content }}
      </li>
    </ul>
    <p>Count: {{ todoCount }} / {{ meta.totalCount }}</p>
    <p>Active: {{ active ? 'yes' : 'no' }}</p>
    <p>Clicks on todos: {{ clickCount }}</p>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed, ref } from 'vue';
import { Todo, Meta } from '@/types/models';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  todos: {
    type: Array as PropType<Todo[]>,
    default: () => [],
  },
  meta: {
    type: Object as PropType<Meta>,
    required: true,
  },
  active: {
    type: Boolean,
  },
});
const clickCount = ref(0);
function increment() {
  clickCount.value += 1;
  return clickCount.value;
}
const todoCount = computed(() => props.todos.length);
</script>
