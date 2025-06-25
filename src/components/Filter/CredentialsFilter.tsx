import React, { useEffect, useState } from "react";
import { Select, message, Spin } from "antd";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  DownOutlined,
} from "@ant-design/icons";
  import { getThirdPartyFilters } from "../../api/filter-api";

const { Option } = Select;

interface CredentialsFilterProps {
  title: string;
  showCounts: boolean;
  setShowCounts: (value: boolean) => void;
  selectLabel: string;
  selectedValue: string;
  onSelectChange: (value: string) => void;
}

const CredentialsFilter: React.FC<CredentialsFilterProps> = ({
  title,
  showCounts,
  setShowCounts,
  selectLabel,
  selectedValue,
  onSelectChange,
}) => {
  const [options, setOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await getThirdPartyFilters();
        console.log("Third-party filters API response:", res);

        const rawData = res?.data as { [key: string]: string }[];

        if (Array.isArray(rawData)) {
          const formattedOptions = rawData.map(
            (item) => Object.values(item)[0]
          );
          setOptions(formattedOptions);
        } else {
          message.warning("Unexpected data format from API.");
        }
      } catch (error) {
        console.error("Error fetching third-party filters:", error);
        message.error("Failed to fetch third-party filters.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="col-span-3">
      <div className="bg-white p-4 shadow rounded border space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-md font-semibold">{title}</h3>
          <button
            onClick={() => setShowCounts(!showCounts)}
            className="text-gray-600 hover:text-gray-800"
            title={showCounts ? "Hide Count" : "Show Count"}
          >
            {showCounts ? <EyeOutlined /> : <EyeInvisibleOutlined />}
          </button>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">
            {selectLabel}
          </label>

          {loading ? (
            <Spin />
          ) : (
            <Select
              value={selectedValue}
              onChange={(value) => onSelectChange(value)}
              suffixIcon={<DownOutlined />}
              className="w-full"
              placeholder="Select Third Party"
            >
              {options.map((opt) => (
                <Option key={opt} value={opt}>
                  {opt}
                </Option>
              ))}
            </Select>
          )}
        </div>
      </div>
    </div>
  );
};

export default CredentialsFilter;
