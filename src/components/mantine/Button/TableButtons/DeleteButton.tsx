import { COLOR } from '@/src/types/enums/colors.enums';
import { IconTrash } from '@tabler/icons-react';

const DeleteButton = () => {
  return (
    <button>
      <IconTrash color={COLOR.delete}></IconTrash>
    </button>
  );
};

export default DeleteButton;
