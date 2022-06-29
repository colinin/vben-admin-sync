import { useLocalization } from '/@/hooks/abp/useLocalization';
import { BasicColumn } from '/@/components/Table';

const { L } = useLocalization('AbpTextTemplating');

export function getDataColumns(): BasicColumn[] {
  return [
    {
      title: L('DisplayName:Name'),
      dataIndex: 'displayName',
      align: 'left',
      width: 200,
      sorter: true,
      ellipsis: true,
    },
    {
      title: L('DisplayName:IsInlineLocalized'),
      dataIndex: 'isInlineLocalized',
      align: 'left',
      width: 150,
      sorter: true,
      ellipsis: true,
      slots: { customRender: 'inline' },
    },
    {
      title: L('DisplayName:IsLayout'),
      dataIndex: 'isLayout',
      align: 'left',
      width: 150,
      sorter: true,
      ellipsis: true,
      slots: { customRender: 'layout' },
    },
    {
      title: L('Layout'),
      dataIndex: 'layout',
      align: 'left',
      width: 200,
      sorter: true,
      ellipsis: true,
    },
    {
      title: L('DisplayName:DefaultCultureName'),
      dataIndex: 'defaultCultureName',
      align: 'left',
      width: 200,
      sorter: true,
      ellipsis: true,
    },
  ];
}
