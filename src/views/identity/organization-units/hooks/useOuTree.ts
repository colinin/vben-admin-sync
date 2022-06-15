import { computed, onMounted, ref } from 'vue';
import { Modal } from 'ant-design-vue';
import { useMessage } from '/@/hooks/web/useMessage';
import { useLocalization } from '/@/hooks/abp/useLocalization';
import { deleteById, getAll, move } from '/@/api/identity/organization-units';
import { listToTree } from '/@/utils/helper/treeHelper';
import { ReturnMethods } from '/@/components/Modal';

export function useOuTree({ emit, modalMethods }: { emit: EmitType, modalMethods: ReturnMethods }) {
  const { createMessage } = useMessage();
  const { L } = useLocalization('AbpIdentity');
  const ouTree = ref<any[]>([]);

  const getContentMenus = computed(() => {
    return (node: any) => {
      return [
        {
          label: L('Edit'),
          handler: () => {
            modalMethods.openModal(true, {  id: node.dataRef.id });
          },
          icon: 'ant-design:edit-outlined',
        },
        {
          label: L('OrganizationUnit:AddChildren'),
          handler: () => {
            handleAddNew(node.dataRef.id);
          },
          icon: 'ant-design:plus-outlined',
        },
        {
          label: L('Delete'),
          handler: () => {
            console.log(node);
            Modal.warning({
              title: L('AreYouSure'),
              content: L('ItemWillBeDeletedMessage'),
              okCancel: true,
              onOk: () => {
                deleteById(node.dataRef.id).then(() => {
                  createMessage.success(L('SuccessfullyDeleted'));
                  loadOuTree();
                });
              },
            });
          },
          icon: 'ant-design:delete-outlined',
        },
      ];
    };
  });

  function loadOuTree() {
    getAll().then((res) => {
      const tree = listToTree(res.items, {
        id: 'id',
        pid: 'parentId',
      });
      ouTree.value = tree;
    });
  }

  function handleAddNew(parentId?: string) {
    modalMethods.openModal(true, { parentId: parentId });
  }

  function handleSelect(selectedKeys) {
    emit('select', selectedKeys[0]);
  }

  function handleDrop(opt) {
    const api =
      opt.dropPosition === -1
        ? move(opt.dragNode.eventKey) // parent
        : move(opt.dragNode.eventKey, opt.node.eventKey); // children
    api.then(() => loadOuTree());
  }

  onMounted(() => {
    loadOuTree();
  });
  return {
    loadOuTree,
    ouTree,
    getContentMenus,
    handleDrop,
    handleAddNew,
    handleSelect,
  };
}
