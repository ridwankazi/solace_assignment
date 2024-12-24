import { Advocate } from '@/types/advocate';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
interface AdvocatesTableProps {
  advocates: Advocate[];
}

export function AdvocatesTable({ advocates }: AdvocatesTableProps) {
  const columnHelper = createColumnHelper<Advocate>();

  const columns = [
    columnHelper.accessor('firstName', {
      header: 'First Name',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('lastName', {
      header: 'Last Name',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('city', {
      header: 'City',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('degree', {
      header: 'Degree',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('specialties', {
      header: 'Specialties',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('yearsOfExperience', {
      header: 'Years of Experience',
      cell: info => info.getValue(),
    }),
    columnHelper.accessor('phoneNumber', {
      header: 'Phone Number',
      cell: info => info.getValue(),
    }),
  ];

  const table = useReactTable({
    data: advocates,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th
                key={header.id}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td
                key={cell.id}
                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
              >
                {flexRender(
                  cell.column.columnDef.cell,
                  cell.getContext()
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
} 