<script setup lang="ts" generic="T">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PropType, computed } from 'vue';
import { useLang } from '@/composables/useLang';
import { ISortMode, LabelValue } from '@/types/common';
import { biFile } from '@quasar/extras/bootstrap-icons';
/* option 1
const props = defineProps({
  overlay: {
    type: Boolean,
    default: false,
  },
  meta: {
    type: Object as PropType<ISortMode>,
    default: undefined,
    required: true,
  },
  todos: {
    type: Array as PropType<ISortMode[]>,
    default: () => [],
  },
  modelValue: {
    type: String,
    default: '',
  },
});
*/
/* option 2
const props = defineProps<{
  modelValue: string;
  overlay?: boolean;
  meta: ISortMode;
  todos: ISortMode[];
}>();

const props = withDefaults(defineProps<{
  exceptItems: number[];
  height?: number;
}>(), {
  height: 450
});

*/

// interface Props {
//   modelValue: string;
//   overlay?: boolean;
//   meta: ISortMode;
//   todos: ISortMode[];
//   items: LabelValue<T>[];
// }

// const props = defineProps<Props>();
/*
const modeDefault: ISortMode = {
  label: 'Test',
  value: 'asc',
};
const props = withDefaults(defineProps<Props>(), {
  overlay: false,
  todos: () => [],
  meta: () => modeDefault,
});
*/
// const { count = 0, message = 'hello' } = defineProps<{
//   count?: number
//   message?: string
// }>();
const props = withDefaults(
  defineProps<{
    height?: number;
    autofocus?: boolean;
  }>(),
  {
    height: 450,
    autofocus: false
  }
);
/*
const email = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

// runtime
const emit = defineEmits(['change', 'update'])
// type-based
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()

// 3.3+: alternative, more succinct syntax
const emit = defineEmits<{
  change: [id: number]
  update: [value: string]
}>()
*/

// const emit = defineEmits(['on-close', 'update:modelValue']);

// <comp-use-model v-model="testModel" v-model:count="count"></comp-use-model>
// const count = defineModel('count', { type: Number, default: 0 });
// const count = defineModel('count', { type: Object as PropType<ISortMode>, default: {} });
//const count = defineModel('count',{default: 0});
// const modelValue = defineModel<number>();
// const modelValue = defineModel<number[]>({ default: [] });
//const count = defineModel<number>('count',{default: 0});

const emit = defineEmits<{
  'update:modelValue': [val: string | undefined];
  onClose: [void];
}>();
// const emit = defineEmits(['on-close', 'update:modelValue']);
// const emit = defineEmits<{
//   (e: 'on:remove', index: number): void;
// }>();
const { t } = useLang();
const onCLose = () => {
  emit('onClose');
};

const onRemove = async (index: number, event: any) => {
  if (event) {
    // event.stopPropagation();
    event.preventDefault();
    // event.stopImmediatePropagation();
  }
  console.log('onRemove', index);
};
/*
How to access to a child method from the parent

//call from parent
const childComponentRef = ref()
const childComponentRef = useTemplateRef<InstanceType<typeof ChildComponent>>('childComponentRef')
 childComponentRef.value.onTestClickFromParent()
<template>
    <ChildComponent ref="childComponentRef" />
</template>
 */
const onTestClickFromParent = (from: string) => {
  console.log('onTestClickFromParent', from);
};
defineExpose({
  onTestClickFromParent
});
</script>
<template>
  <q-card v-bind="$attrs" flat class="full-height">
    <p>{{ t('app.name') }}</p>
    <q-icon :name="biFile" />
    <q-btn @click="onCLose" label="Submit" />

    <div
      v-ripple
      class="relative-position cursor-pointer q-hoverable"
    >
      <span class="q-focus-helper"></span>
    </div>

    <!-- 
    <slot name="additionalBaseTool" v-bind="{ item: item, index: index }">
    </slot> 
    
     <template #additionalBaseTool="{ item, index }">
     </template>
    -->

    <q-scroll-area style="height: 70vh;" content-active-style="width: 100%;" content-style="width: 100%;">

    </q-scroll-area>
  </q-card>
</template>
<style scoped lang="scss">
.text-holder-fitcontent {
  background-color: var(--dark-100);
  // line-clamp: v-bind(lines);
}

body.body--dark {
  .text-holder-fitcontent {
    background-color: var(--dark-900);
  }
}
</style>
