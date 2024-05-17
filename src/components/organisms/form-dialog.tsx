import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { HashtagIcon, PlusIcon } from '@heroicons/react/20/solid';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from '@/components/ui/use-toast';
import { z } from 'zod';
import { useDispatch } from 'react-redux';
import { addColor } from '@/redux/slices/colorsSlice';

interface FormDialogProps {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

const FormSchema = z.object({
  name: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  hex: z.string().refine(
    (value) => {
      const hexRegex = /^([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
      return hexRegex.test(value);
    },
    {
      message: 'Invalid hex color code.',
    },
  ),
});

const FormDialog: React.FC<FormDialogProps> = ({ isModalOpen, setIsModalOpen }) => {
  const dispatch = useDispatch();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      hex: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsModalOpen(false);
    dispatch(
      addColor({
        name: data.name,
        hex: data.hex,
      }),
    );
    form.reset();
    toast({
      title: 'You submitted the following values:',
      description: `Name: ${data.name}, Hex: #${data.hex}`,
    });
  }
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="ml-auto"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          <PlusIcon className="mr-2 h-4 w-4" /> Add
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add color</DialogTitle>
          <DialogDescription>Add name and hexa code for the new color.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hex"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hexa code</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <HashtagIcon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-300" />
                      <Input {...field} className="pl-6" />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FormDialog;
