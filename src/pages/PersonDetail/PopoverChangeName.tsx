import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { EditOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Input, Popover } from 'antd';

import { Gap, View } from 'components';

import { useChangeName } from './hooks';

interface IPopoverChangeName {
  name: string;
}

export const PopoverChangeName: React.FC<IPopoverChangeName> = ({ name }) => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(name);

  const id = useParams<{ id: string }>().id!;

  const { changeName } = useChangeName(id);

  return (
    <Popover
      content={
        <View display="flex">
          <Input
            value={value}
            onChange={(ev) => setValue(ev.target.value)}
            data-testid="input-change-name"
          />
          <Gap size={16} />
          <Button
            icon={<SaveOutlined />}
            onClick={() => {
              changeName(value);
              setVisible(false);
            }}
            data-testid="button-save-name"
          >
            Save
          </Button>
        </View>
      }
      title="Change character's name"
      trigger="click"
      visible={true}
      onVisibleChange={setVisible}
      destroyTooltipOnHide
    >
      <View
        display="inline-flex"
        alignItems="center"
        style={{
          cursor: 'pointer',
        }}
        data-testid="showpopup-name"
      >
        {name} <Gap size={12} />
        <EditOutlined />
      </View>
    </Popover>
  );
};
