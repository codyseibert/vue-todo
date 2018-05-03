<template>
  <div>
    <Confirm
      @onCancel="setConfirmDisplayed(false)"
      @onConfirm="onConfirm"
      :isVisible="isConfirmDisplayed"
      :name="projectToDelete.title">
    </Confirm>

    <Panel title="Projects">
      <div
        class="project mt-4 text-xs-left"
        :class="{'selected': project === selectedProject}"
        v-for="project in entities"
        :key="project.id"
      >
        <Record
          :text="project.title"
          :isEditMode="project.isEdit"
          :isSelectable="true"
          @onSelect="projectClicked(project)"
          @onUpdate="updateProject(project)"
          @onInput="(text) => setProjectTitle({project, title: text})"
          @onDelete="onDelete(project)"
          @onEdit="setProjectEditMode({project, isEdit: true})"
        >
        </Record>
      </div>

      <CreateRecord
        :value="title"
        placeholder="Your Project Name"
        @onInput="setTitle"
        @onCreate="onCreate">
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
    ...mapState('projects', [
      'entities',
      'title',
      'isConfirmDisplayed',
    ]),
    ...mapGetters('projects', [
      'selectedProject',
      'projectToDelete',
    ]),
  },
  methods: {
    onConfirm() {
      this.deleteProject();
      this.setConfirmDisplayed(false);
    },
    onCreate() {
      this.createProject();
      this.setTitle(null);
    },
    projectClicked(project) {
      this.setSelectedProjectId(project.id);
      this.fetchTasks();
    },
    onDelete(project) {
      this.setConfirmDisplayed(true);
      this.setProjectToDelete(project.id);
    },
    ...mapActions('projects', [
      'createProject',
      'fetchProjects',
      'deleteProject',
      'updateProject',
    ]),
    ...mapActions('tasks', [
      'fetchTasks',
    ]),
    ...mapMutations('projects', [
      'setTitle',
      'setConfirmDisplayed',
      'setProjectToDelete',
      'setSelectedProjectId',
      'setProjectEditMode',
      'setProjectTitle',
      'selectFirstProject',
    ]),
  },
  mounted() {
    this.fetchProjects().then(() => {
      console.log('here');
      this.selectFirstProject();
    });
  },
  components: {
    CreateRecord,
    Record,
  },
};
</script>

<style scoped>
.title {
  font-size: 18px;
  cursor: pointer;
}

.project {
  border-bottom: 1px solid #ddd;
  padding-bottom: 8px;
}

.project.selected .title{
  color: orange;
}

.title:hover {
  color: green;
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
