<template>
  <Card :title="L('OrganizationUnit:Tree')">
    <template #extra>
      <a-button
        v-if="hasPermission('AbpIdentity.OrganizationUnits.Create')"
        type="primary"
        pre-icon="ant-design:plus-outlined"
        @click="handleAddNew()"
      >
        {{ L('OrganizationUnit:AddRoot') }}
      </a-button>
    </template>
    <BasicTree
      ref="treeElRef"
      :draggable="true"
      :click-row-to-expand="false"
      :tree-data="ouTree"
      :field-names="{
        title: 'displayName',
        key: 'id',
      }"
      :before-right-click="getContentMenus"
      defaultExpandLevel="1"
      @select="handleSelect"
      @drop="handleDrop"
    />
    <OrganizationUnitModal @register="registerModal" @change="loadOuTree" />
  </Card>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Card } from 'ant-design-vue';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { useLocalization } from '/@/hooks/abp/useLocalization';
  import { BasicTree } from '/@/components/Tree';
  import { useModal } from '/@/components/Modal';
  import { useOuTree } from '../hooks/useOuTree';
  import OrganizationUnitModal from './OrganizationUnitModal.vue';

  export default defineComponent({
    name: 'OrganizationUnitTree',
    components: { BasicTree, Card, OrganizationUnitModal },
    emits: ['change', 'select'],
    setup(_props, { emit }) {
      const { L } = useLocalization('AbpIdentity');
      const [registerModal, modalMethods] = useModal();
      const {
        ouTree,
        getContentMenus,
        handleDrop,
        handleAddNew,
        handleSelect,
        loadOuTree,
      } = useOuTree({ emit, modalMethods });
      const { hasPermission } = usePermission();

      return {
        L,
        ouTree,
        loadOuTree,
        registerModal,
        getContentMenus,
        hasPermission,
        handleDrop,
        handleAddNew,
        handleSelect,
      };
    },
  });
</script>
