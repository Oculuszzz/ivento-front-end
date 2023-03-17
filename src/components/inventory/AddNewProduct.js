import { useState } from "react";
import {
  Card,
  Stack,
  Title,
  TextInput,
  Textarea,
  Group,
  Button,
  NumberInput,
} from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons";
import { useForm } from "@mantine/form";
import { showNotification, updateNotification } from "@mantine/notifications";
import { Navigate, useNavigate } from "react-router-dom";
import { validateInput } from "../../utils/FormUtils";
import { convertDecimalToNumber } from "../../utils/CurrencyUtils";
import { productAxiosInstance } from "../../services/AxiosService";
import AuthHeader from "../../services/AuthHeader";

const AddNewProduct = () => {
  const formProps = useForm({
    initialValues: {
      productCode: "",
      brand: "",
      productName: "",
      quantity: 0,
      price: 1.0,
    },
    validate: {
      productCode: (value) => validateInput("productName", value).error,
      brand: (value) => validateInput("brand", value).error,
      productName: (value) => validateInput("productName", value).error,
      quantity: (value) => validateInput("quantity", value).error,
    },
  });
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();

  const submitHandler = (values) => {
    setIsDisabled(true);

    showNotification({
      id: "load-data",
      loading: true,
      title: "Add new product",
      message: "Please wait and don't close this yet.",
      autoClose: false,
      disallowClose: true,
    });

    // Construct object for add new product
    const newProductData = {
      productCode: values.productCode,
      brand: values.brand,
      name: values.productName,
      quantity: values.quantity,
      price: Number(convertDecimalToNumber(values.price)),
      lastUpdate: new Date().toISOString(),
    };

    productAxiosInstance.service
      .post("add-new-product", newProductData, {
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
            title: "Successfully add new product.",
            message: "Redirect to previous page. Please wait...",
            icon: <IconCheck size={16} />,
            autoClose: 5000,
            disallowClose: true,
          });
          navigate("/inventory");
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
            title: "Failed to add new product.",
            message:
              "Please try again, if reoccurring same problem please contact administrator.",
            icon: <IconX size={16} />,
            autoClose: 5000,
          });
          setIsDisabled(false);
        }
      });
  };

  return (
    <Card p="lg" radius="md" withBorder>
      <Stack spacing="sm">
        <form onSubmit={formProps.onSubmit((values) => submitHandler(values))}>
          <Stack spacing="md">
            <Title order={4}>Add Product</Title>
            <TextInput
              withAsterisk
              disabled={isDisabled}
              id="productCode"
              label="Product Code"
              placeholder="Product code"
              {...formProps.getInputProps("productCode")}
            />
            <TextInput
              withAsterisk
              disabled={isDisabled}
              id="brand"
              label="Brand"
              placeholder="Brand"
              {...formProps.getInputProps("brand")}
            />
            <Textarea
              withAsterisk
              disabled={isDisabled}
              id="productName"
              label="Product Name"
              placeholder="Product name"
              {...formProps.getInputProps("productName")}
            />
            <NumberInput
              withAsterisk
              disabled={isDisabled}
              defaultValue={1}
              id="quantity"
              placeholder="Quantity"
              label="Quantity"
              min={0}
              {...formProps.getInputProps("quantity")}
            />
            <NumberInput
              withAsterisk
              label="Price per-unit (RM)"
              defaultValue={0.05}
              min={0.05}
              precision={2}
              step={0.05}
              {...formProps.getInputProps("price")}
            />
            <Group position="apart" mt="md">
              <Button
                disabled={isDisabled}
                component="a"
                href="/inventory/"
                variant="subtle"
              >
                Cancel
              </Button>
              <Button disabled={isDisabled} type="submit">
                Submit
              </Button>
            </Group>
          </Stack>
        </form>
      </Stack>
    </Card>
  );
};

export default AddNewProduct;
