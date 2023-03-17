import React, { useState, useEffect } from "react";
import { Title, SimpleGrid, Box, Card } from "@mantine/core";
import { showNotification, updateNotification } from "@mantine/notifications";
import { useNavigate, useParams } from "react-router-dom";
import { IconCheck, IconX } from "@tabler/icons";
import useAxiosFetch from "../hooks/useAxiosFetch";
import TableInventory from "./TableInventory";
import SearchInput from "../../ui/SearchInput";
import { productAxiosInstance } from "../../services/AxiosService";
import AuthHeader from "../../services/AuthHeader";

const Inventory = () => {
  const navigate = useNavigate();
  const { search } = useParams();
  const [tableData, setTableData] = useState([]);
  const [isTableLoading, setIsTableLoading] = useState(true);
  const [url, setUrl] = useState("products");

  // Custom hook (useEffect) for fetch
  const { data, isLoading, error } = useAxiosFetch(url);

  useEffect(() => {
    if (!search || search.trim().length === 0) {
      setUrl("products");
    } else {
      setUrl(`products/search/?search=${search}`);
    }
  }, [search]);

  useEffect(() => {
    setIsTableLoading(isLoading);

    if (data) {
      setTableData(data);
    }
  }, [data, isLoading]);

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

  const searchHandler = (value) => {
    if ((!search && value.trim().length === 0) || search === value) {
      // refresh
      // navigate(0);
      return;
    }

    setIsTableLoading(true);

    if (!value || value.trim().length === 0) {
      navigate(`/inventory/`);
    } else {
      navigate(`/inventory/search/${value}`);
    }
  };

  const editProductHandler = (product) => {
    navigate(`/inventory/update-product/${product.id}`);
  };

  const deleteProductHandler = (product) => {
    showNotification({
      id: "load-data",
      loading: true,
      title: "Deleting product",
      message: "Please wait and don't close this yet.",
      autoClose: false,
      disallowClose: true,
    });

    productAxiosInstance.service
      .delete(`/delete-product?id=${product.id}`, {
        headers: AuthHeader.getAuthHeader(),
      })
      .then((response) => {
        // handle success
        if (!response.status === 200) {
          throw Error(`Error - ${response.status} - ${response.statusText}`);
        } else {
          updateNotification({
            id: "load-data",
            color: "teal",
            title: "Successfully deleted product.",
            //   message: "Redirect to previous page in 5 seconds. Please wait...",
            icon: <IconCheck size={16} />,
            autoClose: 5000,
            disallowClose: true,
          });
          // Refresh page
          navigate(0);
        }
      })
      .catch((error) => {
        // Catch the error
        if (error.name === "AbortError") {
          console.log("fecth abort error");
        } else {
          updateNotification({
            id: "load-data",
            color: "red",
            title: "Failed to delete product.",
            message:
              "Please try again, if reoccurring same problem please contact administrator.",
            icon: <IconX size={16} />,
            autoClose: 5000,
          });
        }
      });
  };

  return (
    <React.Fragment>
      <Card p="lg" radius="md" withBorder>
        <SimpleGrid cols={1} verticalSpacing="lg">
          <Title color="dimmed" order={3} transform="uppercase" weight={700}>
            Inventory Management
          </Title>
          <SearchInput
            placeholder="Search products..."
            onSearch={searchHandler}
          />
          <Box sx={{ height: 602 }}>
            <TableInventory
              tableData={tableData}
              isLoading={isTableLoading}
              onEditProduct={editProductHandler}
              onDeleteProduct={deleteProductHandler}
            />
          </Box>
        </SimpleGrid>
      </Card>
    </React.Fragment>
  );
};

export default Inventory;
