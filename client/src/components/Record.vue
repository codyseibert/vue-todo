<template>
  <v-layout
    row
    wrap
    :class="{ 'selected': isSelected }"
  >
    <v-flex
      xs9
      class="text-xs-left"
    >
      <v-layout row wrap>
        <v-flex xs1 v-if="isCheckable">
          <v-icon
            class="checkbox mr-2"
            @click="onCheckClicked"
          > {{ completed ? 'check_box' : 'check_box_outline_blank' }}
          </v-icon>
        </v-flex>

        <v-flex xs11>
          <span
            class="text"
            :class="{ 'selectable': isSelectable }"
            @click="onSelect"
            v-if="!isEditMode"
          > {{text}}
          </span>

          <v-text-field
            hide-details
            v-if="isEditMode"
            :value="text"
            autofocus
            @keyup.enter="onUpdate"
            @input="onInput"
          >
          </v-text-field>
        </v-flex>
      </v-layout>
    </v-flex>

    <v-flex xs3 class="text-xs-right">
      <v-icon
        class="mr-2 edit"
        v-if="!isEditMode"
        @click="onEdit"
      >edit
      </v-icon>

      <v-icon
        class="mr-2 edit"
        v-if="isEditMode"
        @click="onUpdate"
      >check
      </v-icon>

      <v-icon
        class="mr-2 delete"
        @click="onDelete"
      >delete
      </v-icon>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: [
    'text',
    'isSelected',
    'isEditMode',
    'isSelectable',
    'isCheckable',
    'completed',
  ],
  methods: {
    onSelect() {
      this.$emit('onSelect');
    },
    onCheckClicked() {
      this.$emit('onCheckClicked');
    },
    onUpdate() {
      this.$emit('onUpdate');
    },
    onInput(text) {
      this.$emit('onInput', text);
    },
    onDelete() {
      this.$emit('onDelete');
    },
    onEdit() {
      this.$emit('onEdit');
    },
  },
};
</script>

<style scoped>

.input-group {
  padding: 0px;
}

.text {
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

.text.selectable {
  cursor: pointer;
}

.text.selectable:hover {
  color: green;
}

.selected .text {
  color: orange;
}

.checkbox {
  cursor: pointer;
}
</style>
