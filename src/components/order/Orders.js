import React, { useEffect, useState } from "react";
import { Card, SimpleGrid, Box, Title } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { IconX } from "@tabler/icons-react";
import { showNotification } from "@mantine/notifications";
import SearchInput from "../../ui/SearchInput";
import TableOrder from "./TableOrder";
import useAxiosFetch from "../hooks/useAxiosFetch";

const Orders = () => {
  const navigate = useNavigate();
  const { search } = useParams();
  const [tableData, setTableData] = useState([]);
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [url, setUrl] = useState("customer-orders");

  // Custom hook (useEffect) for fetch
  const { data, isLoading, error } = useAxiosFetch(url);

  useEffect(() => {
    if (!search || search.trim().length === 0) {
      setUrl("customer-orders");
    } else {
      setUrl(`customer-orders/search/?search=${search}`);
    }
  }, [search]);

  useEffect(() => {
    if (error) {
      showNotification({
        id: "load-data",
        color: "red",
        title: "Failed to retrieve data.",
        message:
          "Please refresh/reload the page, if reoccurring same problem please contact administrator.",
        icon: <IconX size={16} />,
        autoClose: 5000,
      });
    }
  }, [error]);

  useEffect(() => {
    setIsTableLoading(isLoading);

    if (data) {
      setTableData(data);
    }
  }, [data, isLoading]);

  const searchHandler = (value) => {
    if (value === search || (!search && value.trim().length === 0)) {
      // refresh
      navigate(0);
      return;
    }
    setIsTableLoading(true);

    if (!value || value.trim().length === 0) {
      navigate(`/orders/`);
    } else {
      navigate(`/orders/search/${value}`);
    }
  };

  return (
    <React.Fragment>
      <SimpleGrid cols={1} verticalSpacing="lg">
        <Card p="lg" radius="md" withBorder>
          <SimpleGrid cols={1} verticalSpacing="lg">
            <Title color="dimmed" order={3} transform="uppercase" weight={700}>
              Order Management
            </Title>
            <SearchInput
              placeholder="Search by customer name..."
              onSearch={searchHandler}
            />
            <Box sx={{ height: 602 }}>
              <TableOrder tableData={tableData} isLoading={isTableLoading} />
            </Box>
          </SimpleGrid>
        </Card>
      </SimpleGrid>
    </React.Fragment>
  );
};

export default Orders;
