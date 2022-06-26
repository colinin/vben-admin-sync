import { useLocalization } from '/@/hooks/abp/useLocalization';
import { BasicColumn } from '/@/components/Table';
import { formatToDateTime } from '/@/utils/dateUtil';

const { L } = useLocalization('AbpMessageService');

export function getDataColumns(): BasicColumn[] {
  return [
    {
      title: 'id',
      dataIndex: 'id',
      width: 1,
      ifShow: false,
    },
    {
      title: L('Notifications:Title'),
      dataIndex: ['data', 'extraProperties', 'title'],
      align: 'left',
      width: 200,
      sorter: true,
      ellipsis: true,
      slots: { customRender: 'title' },
      className: '',
    },
    {
      title: L('Notifications:Content'),
      dataIndex: ['data', 'extraProperties','message'],
      align: 'left',
      width: 300,
      sorter: true,
      ellipsis: true,
      slots: { customRender: 'content' },
    },
    {
      title: L('Notifications:Type'),
      dataIndex: 'type',
      align: 'left',
      width: 180,
      sorter: true,
      ellipsis: true,
      slots: { customRender: 'type' },
    },
    {
      title: L('Notifications:SendTime'),
      dataIndex: 'creationTime',
      align: 'left',
      width: 180,
      sorter: true,
      ellipsis: true,
      format: (text) => {
        return text ? formatToDateTime(text) : '';
      },
    },
  ];
}
