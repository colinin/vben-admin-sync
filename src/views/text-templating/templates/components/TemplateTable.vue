<template>
  <div>
    <BasicTable @register="registerTable">
      <template #inline="{ record }">
        <Switch readonly :checked="record.isInlineLocalized" />
      </template>
      <template #layout="{ record }">
        <Switch readonly :checked="record.isLayout" />
      </template>
      <template #action="{ record }">
        <TableAction
          :stop-button-propagation="true"
          :actions="[
            {
              label: L('EditContents'),
              icon: 'ant-design:edit-outlined',
              onClick: handleEditContent.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <TemplateContentModal @register="registerModal" />
  </div>
</template>

<script lang="ts" setup>
  import { Switch } from 'ant-design-vue';
  import { useModal } from '/@/components/Modal';
  import { BasicTable, TableAction, useTable } from '/@/components/Table';
  import { getDataColumns } from '../datas/TableData';
  import { useLocalization } from '/@/hooks/abp/useLocalization';
  import { getList } from '/@/api/text-templating/templates';
  import { TextTemplateDefinition } from '/@/api/text-templating/templates/model';
  import { formatPagedRequest } from '/@/utils/http/abp/helper';
  import TemplateContentModal from './TemplateContentModal.vue';

  const { L } = useLocalization('AbpTextTemplating');

  const [registerModal, { openModal }] = useModal();
  const [registerTable] = useTable({
    rowKey: 'id',
    title: L('TextTemplates'),
    columns: getDataColumns(),
    api: getList,
    beforeFetch: formatPagedRequest,
    pagination: true,
    striped: false,
    useSearchForm: false,
    showIndexColumn: false,
    showTableSetting: true,
    bordered: true,
    canResize: true,
    immediate: true,
    actionColumn: {
      width: 150,
      title: L('Actions'),
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });

  function handleEditContent(record: TextTemplateDefinition) {
    openModal(true, record);
  }
</script>
