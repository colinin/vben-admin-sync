<template>
  <div>
    <CollapseContainer :title="L('SecuritySettings')" :canExpan="false">
      <List>
        <template v-for="item in secureSettingList" :key="item.key">
          <ListItem>
            <ListItemMeta>
              <template #title>
                {{ item.title }}
                <Switch
                  v-if="item.switch"
                  class="extra"
                  default-checked
                  v-model:checked="item.switch.checked"
                  @change="handleChange(item, $event)"
                />
                <div v-else-if="item.extra" class="extra" @click="toggleCommand(item)">
                  {{ item.extra }}
                </div>
              </template>
              <template #description>
                <div>
                  <span>{{ item.description }}</span>
                  <Tag v-if="item.tag" :color="item.tag.color">{{ item.tag.title }}</Tag>
                </div>
              </template>
            </ListItemMeta>
          </ListItem>
        </template>
      </List>
    </CollapseContainer>
    <SettingFormModal @register="registerModal" />
  </div>
</template>
<script lang="ts">
  import type { ListItem } from './useProfile';
  import { List, Switch, Tag } from 'ant-design-vue';
  import { defineComponent, ref, onMounted } from 'vue';
  import { CollapseContainer } from '/@/components/Container';
  import { useModal } from '/@/components/Modal';
  import { useProfile } from './useProfile';
  import { useLocalization } from '/@/hooks/abp/useLocalization';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { changeTwoFactorEnabled } from '/@/api/account/profiles';
  import SettingFormModal from './SettingFormModal.vue';

  export default defineComponent({
    components: {
      CollapseContainer,
      List,
      ListItem: List.Item,
      ListItemMeta: List.Item.Meta,
      Switch,
      Tag,
      SettingFormModal,
    },
    setup() {
      const { createMessage } = useMessage();
      const { L } = useLocalization('AbpAccount');
      const { getSecureSettingList } = useProfile();
      const secureSettingList = ref<ListItem[]>([]);
      const [registerModal, { openModal }] = useModal();

      onMounted(() => {
        getSecureSettingList().then((res) => {
          secureSettingList.value = res;
        });
      });

      function toggleCommand(item: ListItem) {
        openModal(true, item);
      }

      function handleChange(item: ListItem, checked: boolean) {
        switch (item.key) {
          case 'twofactor':
            changeTwoFactorEnabled(checked).then(() => {
              createMessage.success(L('Successful'));
            });
            break;
        }
      }

      return {
        L,
        secureSettingList,
        handleChange,
        toggleCommand,
        registerModal,
      };
    },
  });
</script>
<style lang="less" scoped>
  .extra {
    float: right;
    margin-top: 10px;
    margin-right: 30px;
    font-weight: normal;
    color: #1890ff;
    cursor: pointer;
  }
</style>
