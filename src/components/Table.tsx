import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

interface CustomTableProps<T> {
  data: T[];
  columns: ColumnsType<T>;
  title?: string;
}

const CustomTable = <T extends object>({
  data,
  columns,
  title,
}: CustomTableProps<T>) => {
  return (
    <div className="custom-table-header">
      {title && <h1 className="text-xl font-semibold mb-4">{title}</h1>}
      <Table dataSource={data} columns={columns} bordered pagination={false} />
    </div>
  );
};

export default CustomTable;
