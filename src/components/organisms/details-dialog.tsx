'use client';

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogHeader,
  DialogDescription,
} from '@/components/ui/dialog';

interface DetailsDialogProps {
  open: boolean;
  onOpenChange: () => void;
  selectedColor: string | null;
}

type Color = {
  name: string;
  hex: string;
  group: string;
  rgb: string;
  theme: string;
};

const DetailsDialog: React.FC<DetailsDialogProps> = ({ open, onOpenChange, selectedColor }) => {
  const [data, setData] = React.useState<Color | null>(null);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    open &&
      fetch(`http://localhost:3000/api/colors/${selectedColor}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setData(data.data);
          setLoading(false);
        });
  }, [selectedColor, open]);

  if (open && isLoading) return <p>Loading...</p>;
  if (open && !data) return <p>No profile data</p>;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Color details</DialogTitle>
          <DialogDescription>
            <span className="text-md mb-2 mt-2 block">
              <span className="font-bold">Name:</span> {data?.name}
            </span>
            <span className="text-md mb-2 block">
              <span className="font-bold">Hexa:</span> #{data?.hex}
            </span>
            <span className="text-md mb-2 block">
              <span className="font-bold">Group:</span> {data?.group}
            </span>
            <span className="text-md mb-2 block">
              <span className="font-bold">Rgb:</span> {data?.rgb}
            </span>
            <span className="text-md block">
              <span className="font-bold">Rgb:</span> {data?.theme}
            </span>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsDialog;
