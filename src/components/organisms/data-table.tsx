'use client';

import * as React from 'react';
import { ArrowsUpDownIcon, TrashIcon } from '@heroicons/react/20/solid';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import TableHeader from '@/components/organisms/table-header';
import DeleteDialog from '@/components/organisms/delete-dialog';
import FormDialog from '@/components/organisms/form-dialog';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useSelector, useDispatch } from "react-redux";
import { addColors } from "@/redux/slices/colorsSlice";

export type Color = {
  name: string;
  hex: string;
};

export function DataTable({ data }) {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(addColors(data));
  }, [data]);
  const colors = useSelector((state: any) => state.colors);
  const [deleteColor, setDeleteColor] = React.useState<Color | null>(null);

  const handleDelete = (color) => {
    setIsDeleteModalOpen(true);
    setDeleteColor(color);
  };

  const columns: ColumnDef<Color>[] = [
    {
      accessorKey: 'name',
      enableSorting: true,
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Name
            <ArrowsUpDownIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="capitalize">{row.getValue('name')}</div>,
    },
    {
      accessorKey: 'hex',
      header: 'Hexa code',
      cell: ({ row }) => <div className="lowercase">#{row.getValue('hex')}</div>,
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const color = row.original;

        return (
          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
            onClick={() => handleDelete(row.original)}
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        );
      },
    },
  ];
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: colors,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const filteredData = table.getFilteredRowModel().rows;

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter color names..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) => {
            const filterValue = event.target.value;
            table.getColumn('name')?.setFilterValue(filterValue);
          }}
          className="max-w-sm"
        />
        <FormDialog
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
      <div className="rounded-md border">
        <DeleteDialog
          open={isDeleteModalOpen}
          onOpenChange={setIsDeleteModalOpen}
          deleteColor={deleteColor}
        />
        <Table>
          <TableHeader headerGroups={table.getHeaderGroups()} flexRender={flexRender} />
          <TableBody>
            {filteredData.length ? (
              filteredData.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
