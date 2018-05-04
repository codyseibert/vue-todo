<template>
  <div>
    <Confirm
      @onCancel="setConfirmDisplayed(false)"
      @onConfirm="onConfirm"
      :isVisible="isConfirmDisplayed"
      :name="selectedTask.description"
    ></Confirm>

    <Panel title="Tasks">
      <div class="task mt-4"
        v-for="task in entities"
        :key="task.id"
      >
        <Record
          :text="task.description"
          :isEditMode="task.isEdit"
          :isCheckable="true"
          :completed="task.completed"
          @onCheckClicked="onCheckClicked(task)"
          @onUpdate="updateTask(task)"
          @onInput="(text) => setTaskDescription({task, description: text})"
          @onDelete="onDeleteTask(task)"
          @onEdit="setTaskEditMode({task, isEdit: true})"
        >
        </Record>
      </div>
      <CreateRecord
        :value="description"
        placeholder="I need to..."
        @onInput="setDescription"
        @onCreate="createClicked">
      </CreateRecord>
    </Panel>
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex';
import CreateRecord from './CreateRecord.vue';
import Record from './Record.vue';

export default {
  computed: {
    ...mapState('tasks', [
      'entities',
      'description',
      'isConfirmDisplayed',
      'taskToDeleteId',
    ]),
    ...mapGetters('tasks', [
      'selectedTask',
    ]),
  },
  methods: {
    ...mapActions('tasks', [
      'createTask',
      'updateTask',
      'deleteSelectedTask',
    ]),
    ...mapMutations('tasks', [
      'setDescription',
      'setTaskToDeleteId',
      'setConfirmDisplayed',
      'setTaskEditMode',
      'setTaskDescription',
      'toggleCompleted',
    ]),
    createClicked() {
      this.createTask();
      this.setDescription(null);
    },
    onDeleteTask(task) {
      this.setTaskToDeleteId(task.id);
      this.setConfirmDisplayed(true);
    },
    onConfirm() {
      this.deleteSelectedTask();
      this.setConfirmDisplayed(false);
    },
    onCheckClicked(task) {
      this.toggleCompleted(task);
      this.updateTask(task);
    },
  },
  mounted() {
  },
  components: {
    CreateRecord,
    Record,
  },
};
</script>

<style scoped>
.input-group {
  padding: 0px;
}

.description {
  font-size: 18px;
}

.edit:hover {
  color: #333;
  cursor: pointer;
}

.delete:hover {
  color: #333;
  cursor: pointer;
}
</style>
