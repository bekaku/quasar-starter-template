<script setup lang="ts">
import { useAppMeta } from '@/composables/useAppMeta';
import { useLang } from '@/composables/useLang';
import {
  biArrowsMove,
  biBug,
  biCheck2,
  biClock,
  biFileEarmark,
  biGrid3x3Gap,
} from '@quasar/extras/bootstrap-icons';
import BaseAvatar from 'src/components/base/BaseAvatar.vue';
import BaseButton from 'src/components/base/BaseButton.vue';
import BaseCard from 'src/components/base/BaseCard.vue';
import BasePage from 'src/components/base/BasePage.vue';
import BaseScrollArea from 'src/components/base/BaseScrollArea.vue';
import BaseTextHeader from 'src/components/base/BaseTextHeader.vue';
import { useDevice } from 'src/composables/useDevice';
import { computed, ref } from 'vue';
import draggable from 'vuedraggable';
// https://github.com/SortableJS/vue.draggable.next
const { t } = useLang();
const { setTitle } = useAppMeta();
setTitle(`Drag drop | ${t('app.name')}`);
const { isSmallScreen } = useDevice();
// const drgaGroup = 'people';
const listHeight = '65vh';
const dragingTodo = ref(false);
const dragingInProgress = ref(false);
const dragingTesting = ref(false);
const dragingDone = ref(false);
const todoItems = ref<any[]>([
  {
    id: 1,
    task: 'Task 1',
    description: 'Analyze the new requirements gathered from the customer.',
    chips: ['Meeting'],
    avatar: 'https://cdn.quasar.dev/img/avatar1.jpg',
  },
  {
    id: 2,
    task: 'Task 10',
    description: 'Show the retrieved data from the server in grid control.',
    chips: ['Database', 'SQL'],
    avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
  },
  {
    id: 3,
    task: 'Task 3',
    description: 'Arrange a web meeting with the customer to get new requirements.',
    chips: ['Meeting'],
    avatar: 'https://cdn.quasar.dev/img/avatar3.jpg',
  },
  {
    id: 4,
    task: 'Task 20',
    description: 'Enhance editing functionality.',
    chips: ['Editting'],
    avatar: 'https://cdn.quasar.dev/img/avatar3.jpg',
  },
  {
    id: 5,
    task: 'Task 22',
    description: 'Arrange web meeting with the customer to show editing demo.',
    chips: ['Editting', 'Meeting'],
    avatar: 'https://cdn.quasar.dev/img/avatar3.jpg',
  },
]);
const inProgressItems = ref<any[]>([
  {
    id: 6,
    task: 'Task 2',
    description: 'Improve application performance',
    chips: ['Improvment'],
    avatar: 'https://cdn.quasar.dev/img/avatar4.jpg',
  },
  {
    id: 7,
    task: 'Task 4',
    description: 'Fix the issues reported in the IE browser.',
    chips: ['IE'],
    avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
  },
  {
    id: 8,
    task: 'Task 11',
    description: 'Fix cannot open user’s default database SQL error.',
    chips: ['Database', 'Sql2020'],
    avatar: 'https://cdn.quasar.dev/img/avatar3.jpg',
  },
  {
    id: 9,
    task: 'Task 20',
    description: 'Enhance editing functionality.',
    chips: ['Editting'],
    avatar: 'https://cdn.quasar.dev/img/avatar3.jpg',
  },
  {
    id: 10,
    task: 'Task 21',
    description: 'Improve the performance of the editing functionality.',
    chips: ['Performance'],
    avatar: 'https://cdn.quasar.dev/img/avatar3.jpg',
  },
]);
const testingItems = ref<any[]>([
  {
    id: 11,
    task: 'Task 24',
    description: 'Fix the issues reported by the customer.',
    chips: ['Customer'],
    avatar: 'https://cdn.quasar.dev/img/avatar4.jpg',
  },
  {
    id: 12,
    task: 'Task 25',
    description: 'Fix the issues reported in Safari browser.',
    chips: ['Fix', 'Safari'],
    avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
  },
  {
    id: 13,
    task: 'Task 26',
    description: 'Check Login page validation.',
    chips: ['Testing'],
    avatar: 'https://cdn.quasar.dev/img/avatar3.jpg',
  },
  {
    id: 14,
    task: 'Task 27',
    description: 'Fix the issues reported in data binding.',
    chips: ['Editting', 'Test'],
    avatar: 'https://cdn.quasar.dev/img/avatar3.jpg',
  },
  {
    id: 15,
    task: 'Task 29',
    description: 'Fix editing issues reported in Firefox.',
    chips: ['Fix'],
    avatar: 'https://cdn.quasar.dev/img/avatar3.jpg',
  },
]);
const doneItems = ref<any[]>([
  {
    id: 16,
    task: 'Task 8',
    description: 'Test the application in the IE browser.',
    chips: ['REview', 'IE'],
    avatar: 'https://cdn.quasar.dev/img/avatar4.jpg',
  },
  {
    id: 17,
    task: 'Task 13',
    description: 'Analyze SQL server 2008 connection.',
    chips: ['Analyze'],
    avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
  },
  {
    id: 18,
    task: 'Task 16',
    description: 'Stored procedure for initial data binding of the grid.',
    chips: ['Databinding'],
    avatar: 'https://cdn.quasar.dev/img/avatar3.jpg',
  },
]);
const isDragging = computed(
  () => dragingTodo.value || dragingInProgress.value || dragingTesting.value || dragingDone.value,
);

const dragOptions = computed(() => {
  return {
    animation: 0,
    group: 'description',
    disabled: false,
    ghostClass: 'ghost',
  };
});

const log = (ctx: any) => {
  console.log('log', ctx);
};
const onStartDrag = () => {
  dragingTodo.value = true;
};
const onEndDrag = () => {
  dragingTodo.value = false;
};
</script>
<template>
  <BasePage>
    <BaseCard title="Dragdrop" subtitle="https://github.com/SortableJS/vue.draggable.next">
      <q-no-ssr>
        <q-scroll-area :style="{ height: '75vh', maxWidth: '100vw' }">
          <div class="row no-wrap">
            <div class="holder" :class="{ 'holder-draging': isDragging }">
              <div class="holder-header">
                <q-item>
                  <q-item-section>
                    <q-item-label class="text-subtitle1 text-weight-bold"> To do </q-item-label>
                  </q-item-section>
                  <q-item-section side> {{ todoItems.length }} </q-item-section>
                </q-item>
              </div>
              <q-separator />
              <div class="row q-pa-sm">
                <div class="col">
                  <BaseScrollArea :height="listHeight">
                    <draggable
                      v-model="todoItems"
                      item-key="id"
                      class="drag-area"
                      :handle="!isSmallScreen ? '' : '.handle'"
                      v-bind="dragOptions"
                      :component-data="{ name: 'flip-list', type: 'transition' }"
                      @change="log"
                      @start="onStartDrag"
                      @end="onEndDrag"
                    >
                      <template #item="{ element, index }">
                        <BaseCard class="holder-card todo" :margin="false">
                          <q-card-section>
                            <q-item class="q-pl-none" dense>
                              <q-item-section>
                                <q-item-label class="text-subtitle1 text-weight-bold">
                                  {{ element.task }}
                                </q-item-label>
                              </q-item-section>
                              <q-item-section v-if="isSmallScreen" side>
                                <BaseButton class="handle" flat :icon="biGrid3x3Gap" round />
                              </q-item-section>
                            </q-item>
                            <div class="text-body2">{{ element.description }}</div>
                            <div class="q-gutter-sm q-pt-sm">
                              <q-chip
                                v-for="(chip, chipIndex) in element.chips"
                                :key="`${index}-chip-${chipIndex}-${chip}`"
                                class="chip"
                                dense
                              >
                                {{ chip }}
                              </q-chip>
                            </div>
                            <q-item dense>
                              <q-item-section
                                ><q-icon :name="biFileEarmark" size="18px" color="warning"
                              /></q-item-section>
                              <q-item-section side>
                                <BaseAvatar :src="element.avatar" size="24px" />
                              </q-item-section>
                            </q-item>
                          </q-card-section>
                        </BaseCard>
                      </template>
                    </draggable>
                  </BaseScrollArea>
                </div>
              </div>
            </div>
            <!--End List-->
            <div class="holder" :class="{ 'holder-draging': isDragging }">
              <div class="holder-header">
                <q-item>
                  <q-item-section>
                    <q-item-label class="text-subtitle1 text-weight-bold">
                      In Progress</q-item-label
                    >
                  </q-item-section>
                  <q-item-section side> {{ inProgressItems.length }} </q-item-section>
                </q-item>
              </div>
              <q-separator />
              <div class="row q-pa-sm">
                <div class="col">
                  <BaseScrollArea :height="listHeight">
                    <draggable
                      v-model="inProgressItems"
                      item-key="id"
                      class="drag-area"
                       :handle="!isSmallScreen ? '' : '.handle'"
                      v-bind="dragOptions"
                      :component-data="{ name: 'flip-list', type: 'transition' }"
                      @change="log"
                      @start="dragingInProgress = true"
                      @end="dragingInProgress = false"
                    >
                      <template #item="{ element, index }">
                        <BaseCard class="holder-card inprogress" :margin="false">
                          <q-card-section>
                            <q-item class="q-pl-none" dense>
                              <q-item-section>
                                <q-item-label class="text-subtitle1 text-weight-bold">
                                  {{ element.task }}
                                </q-item-label>
                              </q-item-section>
                              <q-item-section v-if="isSmallScreen" side>
                                <BaseButton class="handle" flat :icon="biGrid3x3Gap" round />
                              </q-item-section>
                            </q-item>
                            <div class="text-body2">{{ element.description }}</div>
                            <div class="q-gutter-sm q-pt-sm">
                              <q-chip
                                v-for="(chip, chipIndex) in element.chips"
                                :key="`${index}-chip-${chipIndex}-${chip}`"
                                class="chip"
                                dense
                              >
                                {{ chip }}
                              </q-chip>
                            </div>
                            <q-item dense>
                              <q-item-section
                                ><q-icon :name="biClock" size="18px" color="primary"
                              /></q-item-section>
                              <q-item-section side>
                                <BaseAvatar :src="element.avatar" size="24px" />
                              </q-item-section>
                            </q-item>
                          </q-card-section>
                        </BaseCard>
                      </template>
                    </draggable>
                  </BaseScrollArea>
                </div>
              </div>
            </div>
            <!--End List-->
            <div class="holder" :class="{ 'holder-draging': isDragging }">
              <div class="holder-header">
                <q-item>
                  <q-item-section>
                    <q-item-label class="text-subtitle1 text-weight-bold"> Testing</q-item-label>
                  </q-item-section>
                  <q-item-section side> {{ testingItems.length }} </q-item-section>
                </q-item>
              </div>
              <q-separator />
              <div class="row q-pa-sm">
                <div class="col">
                  <BaseScrollArea :height="listHeight">
                    <draggable
                      v-model="testingItems"
                      item-key="id"
                      class="drag-area"
                       :handle="!isSmallScreen ? '' : '.handle'"
                      v-bind="dragOptions"
                      :component-data="{ name: 'flip-list', type: 'transition' }"
                      @change="log"
                      @start="dragingTesting = true"
                      @end="dragingTesting = false"
                    >
                      <template #item="{ element, index }">
                        <BaseCard class="holder-card testing" :margin="false">
                          <q-card-section>
                            <q-item class="q-pl-none" dense>
                              <q-item-section>
                                <q-item-label class="text-subtitle1 text-weight-bold">
                                  {{ element.task }}
                                </q-item-label>
                              </q-item-section>
                              <q-item-section v-if="isSmallScreen" side>
                                <BaseButton class="handle" flat :icon="biGrid3x3Gap" round />
                              </q-item-section>
                            </q-item>
                            <div class="text-body2">{{ element.description }}</div>
                            <div class="q-gutter-sm q-pt-sm">
                              <q-chip
                                v-for="(chip, chipIndex) in element.chips"
                                :key="`${index}-chip-${chipIndex}-${chip}`"
                                class="chip"
                                dense
                              >
                                {{ chip }}
                              </q-chip>
                            </div>
                            <q-item dense>
                              <q-item-section
                                ><q-icon :name="biBug" size="18px" color="negative"
                              /></q-item-section>
                              <q-item-section side>
                                <BaseAvatar :src="element.avatar" size="24px" />
                              </q-item-section>
                            </q-item>
                          </q-card-section>
                        </BaseCard>
                      </template>
                    </draggable>
                  </BaseScrollArea>
                </div>
              </div>
            </div>
            <!--End List-->
            <div class="holder" :class="{ 'holder-draging': isDragging }">
              <div class="holder-header">
                <q-item>
                  <q-item-section>
                    <q-item-label class="text-subtitle1 text-weight-bold"> Done</q-item-label>
                  </q-item-section>
                  <q-item-section side> {{ doneItems.length }} </q-item-section>
                </q-item>
              </div>
              <q-separator />
              <div class="row q-pa-sm">
                <div class="col">
                  <BaseScrollArea :height="listHeight">
                    <draggable
                      v-model="doneItems"
                      item-key="id"
                      class="drag-area"
                       :handle="!isSmallScreen ? '' : '.handle'"
                      v-bind="dragOptions"
                      :component-data="{ name: 'flip-list', type: 'transition' }"
                      @change="log"
                      @start="dragingTesting = true"
                      @end="dragingTesting = false"
                    >
                      <template #item="{ element, index }">
                        <BaseCard class="holder-card done" :margin="false">
                          <!-- <div class="q-mx-sm" style="border: 4px solid var(--color-success-500);" /> -->
                          <q-card-section>
                            <q-item class="q-pl-none" dense>
                              <q-item-section>
                                <q-item-label class="text-subtitle1 text-weight-bold">
                                  {{ element.task }}
                                </q-item-label>
                              </q-item-section>
                              <q-item-section v-if="isSmallScreen" side>
                                <BaseButton class="handle" flat :icon="biGrid3x3Gap" round />
                              </q-item-section>
                            </q-item>
                            <div class="text-body2">{{ element.description }}</div>
                            <div class="q-gutter-sm q-pt-sm">
                              <q-chip
                                v-for="(chip, chipIndex) in element.chips"
                                :key="`${index}-chip-${chipIndex}-${chip}`"
                                class="chip"
                                dense
                              >
                                {{ chip }}
                              </q-chip>
                            </div>
                            <q-item dense>
                              <q-item-section
                                ><q-icon :name="biCheck2" size="18px" color="positive"
                              /></q-item-section>
                              <q-item-section side>
                                <BaseAvatar :src="element.avatar" size="24px" />
                              </q-item-section>
                            </q-item>
                          </q-card-section>
                        </BaseCard>
                      </template>
                    </draggable>
                  </BaseScrollArea>
                </div>
              </div>
            </div>
            <!--End List-->
          </div>
          <!--End row-->
        </q-scroll-area>
      </q-no-ssr>
    </BaseCard>
  </BasePage>
</template>
<style lang="scss" scoped>
// .drag-area {
//   height: 325px;
//   overflow: auto;
//   border: 1px dashed #ccc;
// }

// .drag-area-2 {
//   height: 425px;
//   overflow: auto;
//   border: 1px dashed #ccc;
// }

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: var(--color-primary-100);
  border: 1px dashed var(--color-primary-500) !important;
}

.holder {
  min-width: 350px !important;
  max-width: 350px !important;
  min-height: 70vh;
  margin: 0 10px;
  border: 1px solid var(--color-zinc-200);
  border-radius: 10px;
  background-color: var(--color-zinc-100);
}
.drag-area {
  min-height: 70vh;
}
.holder-draging {
  border: 1px dashed var(--color-primary-500) !important;
}

.holder-header {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background-color: #fff;
}

.holder-card {
  cursor: grab;
  margin-bottom: 10px;
}
.holder-card .chip {
  background-color: var(--color-zinc-200);
}

// .holder-card.todo {
//   border-left: 2px solid var(--color-warning-400);
// }
// .holder-card.inprogress {
//   border-left: 2px solid var(--color-primary-400);
// }
// .holder-card.testing {
//   border-left: 2px solid var(--color-danger-400);
// }
// .holder-card.done {
//   border-left: 2px solid var(--color-success-400);
// }

body.body--dark {
  .holder {
    border: 1px solid var(--color-zinc-600);
    background-color: var(--color-zinc-600);
  }
  .holder-header {
    background-color: var(--color-zinc-700);
  }
  .holder-card .chip {
    background-color: var(--color-zinc-600);
  }
  .ghost {
    opacity: 0.5;
    background: var(--color-zinc-600);
  }
}
</style>
