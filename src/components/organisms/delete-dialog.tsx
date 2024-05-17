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
import { useDispatch } from "react-redux";
import { removeColor } from "@/redux/slices/colorsSlice";
import { toast } from '@/components/ui/use-toast';

interface DeleteDialogProps {
  open: boolean;
  onOpenChange: () => void;
  deleteColor: any;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ open, onOpenChange, deleteColor }) => {
  const dispatch = useDispatch();
  function onDelete(name: string) {
    dispatch(removeColor(deleteColor.name))
    onOpenChange(false);
    toast({
      title: `You successfully removed color ${deleteColor.name}!`
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
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" onClick={() => onDelete(deleteColor?.name)}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
