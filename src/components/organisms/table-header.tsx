import { TableHead, TableHeader as TableHeaderComponent, TableRow } from '@/components/ui/table';

interface TableHeaderProps {
  headerGroups: any[];
  flexRender: (header: any, context: any) => JSX.Element;
}

const TableHeader: React.FC<TableHeaderProps> = ({ headerGroups, flexRender }) => {
  return (
    <TableHeaderComponent>
      {headerGroups.map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeaderComponent>
  );
};

export default TableHeader;
