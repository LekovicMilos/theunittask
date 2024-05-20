'use client';

import React, { useState, useEffect, MouseEvent } from 'react';
import { TrashIcon, ArrowsUpDownIcon } from '@heroicons/react/20/solid';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import TableHeader from '@/components/organisms/table/table-header';
import DeleteDialog from '@/components/organisms/dialog/delete-dialog';
import DetailsDialog from '@/components/organisms/dialog/details-dialog';
import FormDialog from '@/components/organisms/dialog/form-dialog';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useSelector, useDispatch } from 'react-redux';
import { addColors } from '@/redux/slices/colorsSlice';
import Pagination from '@/components/organisms/table/pagination';
import { usePagination } from '@/components/organisms/table/hooks/usePagination';

export type Color = {
  name: string;
  hex: string;
};

export type ReduxState = {
  colors: Color[];
};

export function DataTable({ data }: { data: Color[] }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addColors(data));
  }, [data, dispatch]);
  const colors = useSelector((state: ReduxState) => state.colors);
  const [deleteColor, setDeleteColor] = useState<Color | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const handleDelete = (e: MouseEvent, color: Color) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDeleteModalOpen(true);
    setDeleteColor(color);
  };

  const columns: ColumnDef<Color>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => {
              if (column.getIsSorted() === 'desc') {
                column.toggleSorting(false);
              } else {
                column.toggleSorting(true);
              }
            }}
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
        return (
          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
            onClick={(e) => handleDelete(e, row.original)}
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        );
      },
    },
  ];
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: colors,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const filteredData = table.getSortedRowModel().rows;
  const itemsPerPage = 10;

  const { paginatedData, currentPage, totalPages, handlePreviousPage, handleNextPage } =
    usePagination(filteredData, itemsPerPage);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetaisModalOpen] = useState(false);

  const handleDetailsOpen = (color: string) => {
    setSelectedColor(color);
    setIsDetaisModalOpen(true);
  };

  return (
    <div className="w-full">
      <h1 className="text-4xl">Dashboard</h1>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter color names..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) => {
            const filterValue = event.target.value;
            table.getColumn('name')?.setFilterValue(filterValue);
          }}
          className="max-w-48 lg:max-w-xs"
        />
        <FormDialog isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </div>
      <div className="rounded-md border">
        <DeleteDialog
          open={isDeleteModalOpen}
          onOpenChange={() => setIsDeleteModalOpen(!isDeleteModalOpen)}
          deleteColor={deleteColor}
        />
        <DetailsDialog
          open={isDetailsModalOpen}
          onOpenChange={() => setIsDetaisModalOpen(!isDetailsModalOpen)}
          selectedColor={selectedColor}
        />
        <Table>
          <TableHeader
            headerGroups={table.getHeaderGroups()}
            flexRender={(header, context) => flexRender(header, context) as JSX.Element}
          />
          <TableBody>
            {paginatedData.length ? (
              paginatedData.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  onClick={() => handleDetailsOpen(row.original.name)}
                  className="cursor-pointer"
                >
                  {/* @ts-expect-error: Expecting error */}
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell
                      key={cell.id}
                      className={index === row.getVisibleCells().length - 1 ? 'text-right' : ''}
                    >
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
      />
    </div>
  );
}
