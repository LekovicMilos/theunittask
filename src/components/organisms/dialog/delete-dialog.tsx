import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogClose,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { removeColor } from '@/redux/slices/colorsSlice';
import { toast } from '@/components/ui/use-toast';
import { Color } from '@/components/organisms/table/data-table';

interface DeleteDialogProps {
  open: boolean;
  onOpenChange: () => void;
  deleteColor: Color | null;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ open, onOpenChange, deleteColor }) => {
  const dispatch = useDispatch();
  function onDelete() {
    dispatch(removeColor(deleteColor?.name || ''));
    onOpenChange();
    toast({
      title: `You successfully removed color ${deleteColor?.name}!`,
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete color</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete color {deleteColor?.name}?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="my-2">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" data-testid="delete" onClick={onDelete} className="my-2">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
