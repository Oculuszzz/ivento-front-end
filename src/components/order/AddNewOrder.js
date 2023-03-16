import { useEffect, useState } from "react";
import {
  Card,
  Stack,
  Title,
  TextInput,
  Textarea,
  Group,
  Button,
  Grid,
  Box,
} from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons";
import { useForm } from "@mantine/form";
import { showNotification, updateNotification } from "@mantine/notifications";
import { LoadingOverlay } from "@mantine/core";
import { Navigate, useNavigate } from "react-router-dom";
import { validateInput } from "../../utils/FormUtils";
import ProductOrderSelection from "./ProductOrderSelection";
import TableAddOrder from "./TableAddOrder";
import useAxiosFetch from "../hooks/useAxiosFetch";
import { customerOrderAxiosInstance } from "../../services/AxiosService";
import AuthHeader from "../../services/AuthHeader";

const MAX_ORDER_ITEM = 5;

const constructJsonOrder = (customerInfo, listProducts) => {
  let ttPrice = 0;

  const products = listProducts.map((item) => {
    ttPrice += Number(item.totalPrice);

    return {
      productId: item.id,
      productCode: item.productCode,
      brand: item.brand,
      name: item.name,
      price: Number(item.price),
      totalPrice: Number(item.totalPrice),
      quantity: Number(item.requestedQuantity),
    };
  });

  return {
    name: customerInfo.customerName,
    phoneNumber: customerInfo.customerPhoneNum,
    address: customerInfo.customerAddress,
    companyName: customerInfo.customerCompanyName,
    companyAddress: customerInfo.customerCompanyAddress,
    totalPrice: Number(ttPrice),
    products,
    status: "NEW_ORDER",
    lastUpdate: new Date().toISOString(),
  };
};

const AddNewCustomerOrder = () => {
  // Custom hook (useEffect) for fetch
  const navigate = useNavigate();
  const { data, isLoading, error } = useAxiosFetch("products");
  const formProps = useForm({
    initialValues: {
      customerName: "",
      customerPhoneNum: "",
      customerAddress: "",
      customerCompanyName: "",
      customerCompanyAddress: "",
    },
    validate: {
      customerName: (value) => validateInput("customerName", value).error,
      customerPhoneNum: (value) =>
        validateInput("customerPhoneNum", value).error,
      customerAddress: (value) => validateInput("customerAddress", value).error,
    },
  });
  const [isDisabled, setIsDisabled] = useState(false);
  const [disabledSubmitBtn, setDisabledSubmitBtn] = useState(true);
  const [disabledAddOrderForm, setDisabledAddOrderForm] = useState(false);
  const [listOrders, setListOrders] = useState([]);

  // Fetch error
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

  // Check limit order
  useEffect(() => {
    if (listOrders && listOrders.length >= MAX_ORDER_ITEM) {
      setDisabledAddOrderForm(true);
    } else {
      setDisabledAddOrderForm(false);
    }

    if (listOrders && listOrders.length > 0) {
      setDisabledSubmitBtn(false);
    } else {
      setDisabledSubmitBtn(true);
    }
  }, [listOrders]);

  const addProductHandler = (value) => {
    setListOrders((prevState) => [...prevState, value]);
  };

  const deleteOrderHandler = (order) => {
    setListOrders(listOrders.filter((item) => item.id !== order.id));
  };

  const submitHandler = (values) => {
    setIsDisabled(true);
    setDisabledAddOrderForm(true);
    setDisabledSubmitBtn(true);

    showNotification({
      id: "load-data",
      loading: true,
      title: "Adding customer order",
      message: "Please wait and don't close this yet.",
      autoClose: false,
      disallowClose: true,
    });

    // Construct Order JSON
    const orderJson = constructJsonOrder(values, listOrders);

    customerOrderAxiosInstance.service
      .post("add-new-customer-order", orderJson, {
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
            title: "Successfully added customer order.",
            message: "Redirect to previous page. Please wait...",
            icon: <IconCheck size={16} />,
            autoClose: 5000,
            disallowClose: true,
          });
          <Navigate to="/orders" />;
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
            title: "Failed to add customer order.",
            message:
              "Please try again, if reoccurring same problem please contact administrator.",
            icon: <IconX size={16} />,
            autoClose: 5000,
          });
          setIsDisabled(false);
          setDisabledAddOrderForm(
            !(listOrders && listOrders.length >= MAX_ORDER_ITEM)
          );
          setDisabledSubmitBtn(
            !(listOrders && listOrders.length >= MAX_ORDER_ITEM)
          );
        }
      });

    navigate("/orders");
  };

  return (
    <Card p="lg" radius="md" withBorder>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      <Stack spacing="sm">
        <form onSubmit={formProps.onSubmit((values) => submitHandler(values))}>
          <Grid grow>
            <Grid.Col span={10}>
              <Title order={4}>Add Customer Order</Title>
            </Grid.Col>

            <Grid.Col span={5}>
              <Box
                sx={(theme) => ({
                  backgroundColor: theme.colors.gray[1],
                  padding: theme.spacing.xl,
                  borderRadius: theme.radius.md,
                })}
              >
                <Stack spacing="md">
                  <Title order={5}>Customer Info</Title>
                  <TextInput
                    withAsterisk
                    disabled={isDisabled}
                    id="customerName"
                    label="Customer Name"
                    placeholder="Customer name"
                    {...formProps.getInputProps("customerName")}
                  />
                  <TextInput
                    withAsterisk
                    disabled={isDisabled}
                    id="customerPhoneNum"
                    label="Phone Number"
                    placeholder="011-### ####"
                    description='Enter your phone number without "-"'
                    {...formProps.getInputProps("customerPhoneNum")}
                  />
                  <Textarea
                    withAsterisk
                    disabled={isDisabled}
                    id="customerAddress"
                    label="Address"
                    placeholder="15329 Melaka 21st"
                    autosize
                    minRows={4}
                    maxRows={4}
                    {...formProps.getInputProps("customerAddress")}
                  />
                  <TextInput
                    disabled={isDisabled}
                    id="companyName"
                    label="Company Name"
                    description="Optional"
                    placeholder="Axes Sdn Bhd"
                    {...formProps.getInputProps("customerCompanyName")}
                  />
                  <Textarea
                    disabled={isDisabled}
                    id="companyAddress"
                    label="Company Address"
                    description="Optional"
                    placeholder="15329 Melaka 21st"
                    autosize
                    minRows={4}
                    maxRows={4}
                    {...formProps.getInputProps("customerCompanyAddress")}
                  />
                </Stack>
              </Box>
            </Grid.Col>

            <Grid.Col span={5}>
              <ProductOrderSelection
                disabled={disabledAddOrderForm}
                data={data}
                selectedItems={listOrders}
                onAddProduct={addProductHandler}
              />
            </Grid.Col>

            <Grid.Col span={10}>
              <TableAddOrder
                tableData={listOrders}
                onDeleteOrder={deleteOrderHandler}
              />
            </Grid.Col>

            <Grid.Col span={10}>
              <Group position="apart" mt="md">
                <Button
                  disabled={isDisabled}
                  component="a"
                  href="/inventory"
                  variant="subtle"
                >
                  Cancel
                </Button>
                <Button disabled={disabledSubmitBtn} type="submit">
                  Submit
                </Button>
              </Group>
            </Grid.Col>
          </Grid>
        </form>
      </Stack>
    </Card>
  );
};

export default AddNewCustomerOrder;
