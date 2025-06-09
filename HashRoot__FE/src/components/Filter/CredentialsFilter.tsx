import React from 'react';
import { Select } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined, DownOutlined } from '@ant-design/icons';

const { Option } = Select;

interface CredentialsFilterProps {
  title: string;
  showCounts: boolean;
  setShowCounts: (value: boolean) => void;
  selectLabel: string;
  selectedValue: string;
  onSelectChange: (value: string) => void;
  selectOptions: string[];
}

const CredentialsFilter: React.FC<CredentialsFilterProps> = ({
  title,
  showCounts,
  setShowCounts,
  selectLabel,
  selectedValue,
  onSelectChange,
  selectOptions,
}) => {
  return (
    <div className="col-span-3">
      <div className="bg-white p-4 shadow rounded border space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-md font-medium">{title}</h3>
          <button
            onClick={() => setShowCounts(!showCounts)}
            className="text-gray-600 hover:text-gray-800"
            title={showCounts ? 'Hide Count' : 'Show Count'}
          >
            {showCounts ? <EyeOutlined /> : <EyeInvisibleOutlined />}
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">{selectLabel}</label>
          <Select
            value={selectedValue}
            onChange={onSelectChange}
            suffixIcon={<DownOutlined />}
            className="w-full"
          >
            {selectOptions.map((opt) => (
              <Option key={opt} value={opt}>
                {opt}
              </Option>
            ))}
          </Select>
        </div>
      </div>
    </div>
  );
};

export default CredentialsFilter;
