import React, { useState, useEffect } from "react";
import { Group, Text, Menu, ActionIcon, Box } from "@mantine/core";
import { IconDots, IconPencil, IconTrash } from "@tabler/icons-react";
import { DataTable } from "mantine-datatable";
import { sortBy } from "lodash";
import DateUtils from "../../utils/DateUtils";
import { convertNumberToDecimal } from "../../utils/CurrencyUtils";

const PAGE_SIZE = 12;

const TableInventory = (props) => {
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState([]);
  const [sortStatus, setSortStatus] = useState([
    {
      columnAccessor: "brand",
      direction: "asc",
    },
  ]);

  useEffect(() => {
    const sortedData = sortBy(props.tableData, sortStatus.columnAccessor);
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;

    setRecords(
      sortStatus.direction === "desc"
        ? sortedData.reverse().slice(from, to)
        : sortedData.slice(from, to)
    );
  }, [sortStatus, page, props.tableData]);

  const productStatsRowContent = (quantity) => {
    if (quantity >= 20) {
      return (
        <Box
          sx={(theme) => ({
            display: "block",
            backgroundColor: theme.colors.green[4],
            textAlign: "center",
            padding: theme.spacing.sm,
            borderRadius: theme.radius.sm,
          })}
        />
      );
    } else if (quantity < 20 && quantity !== 0) {
      return (
        <Box
          sx={(theme) => ({
            display: "block",
            backgroundColor: theme.colors.yellow[4],
            textAlign: "center",
            padding: theme.spacing.sm,
            borderRadius: theme.radius.sm,
          })}
        />
      );
    } else {
      return (
        <Box
          sx={(theme) => ({
            display: "block",
            backgroundColor: theme.colors.red[4],
            textAlign: "center",
            padding: theme.spacing.sm,
            borderRadius: theme.radius.sm,
          })}
        />
      );
    }
  };

  const editProductHandler = (item) => {
    props.onEditProduct(item);
  };

  const deleteProductHandler = (item) => {
    props.onDeleteProduct(item);
  };

  const actionsRowContent = (item) => {
    return (
      <Group spacing={0} position="right">
        <Menu transition="pop" withArrow position="bottom-end">
          <Menu.Target>
            <ActionIcon color="gray">
              <IconDots size={20} stroke={1.5} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              onClick={(event) => {
                event.preventDefault();
                editProductHandler(item);
              }}
              icon={<IconPencil size={16} stroke={1.5} />}
            >
              Edit product
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                deleteProductHandler(item);
              }}
              icon={<IconTrash size={16} stroke={1.5} />}
              color={"red"}
            >
              Delete product
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    );
  };

  return (
    <DataTable
      textSelectionDisabled
      withBorder
      fetching={props.isLoading}
      columns={[
        {
          accessor: "stats",
          title: "",
          width: "1%",
          render: (record) => productStatsRowContent(record.quantity),
        },
        {
          accessor: "productCode",
          title: <Text>Product Code</Text>,
          sortable: true,
          width: "10%",
          render: (record) => record.productCode,
        },
        {
          accessor: "brand",
          title: <Text>Brand</Text>,
          sortable: true,
          width: "10%",
          render: (record) => record.brand,
        },

        {
          accessor: "name",
          title: <Text>Product Name</Text>,
          sortable: true,
          width: "60%",
          render: (record) => record.name,
        },
        {
          accessor: "price",
          title: <Text>Price Per-unit (RM)</Text>,
          textAlignment: "right",
          render: (record) =>
            Number(convertNumberToDecimal(record.price)).toFixed(2),
        },
        {
          accessor: "quantity",
          sortable: true,
          textAlignment: "right",
          render: (record) => record.quantity,
        },
        {
          accessor: "lastUpdate",
          title: <Text>Last Update</Text>,
          textAlignment: "center",
          width: "8%",
          render: (record) =>
            DateUtils.convertDateTimeToDateTimeString(record.lastUpdate),
        },
        {
          accessor: "actions",
          title: "",
          textAlignment: "right",
          width: "5%",
          render: (record) => {
            return actionsRowContent(record);
          },
        },
      ]}
      records={records}
      loaderVariant="oval"
      totalRecords={props.tableData ? props.tableData.length : 0}
      recordsPerPage={PAGE_SIZE}
      page={page}
      onPageChange={(p) => setPage(p)}
      sortStatus={sortStatus}
      onSortStatusChange={setSortStatus}
    />
  );
};

export default TableInventory;
