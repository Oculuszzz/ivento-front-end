import { useState, useEffect } from "react";
import {
  Card,
  Stack,
  Title,
  TextInput,
  Textarea,
  Group,
  Button,
  NumberInput,
  LoadingOverlay,
} from "@mantine/core";
import { IconCheck, IconX } from "@tabler/icons";
import { useForm } from "@mantine/form";
import { showNotification, updateNotification } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { validateInput } from "../../utils/FormUtils";
import { useParams } from "react-router-dom";
import {
  convertDecimalToNumber,
  convertNumberToDecimal,
} from "../../utils/CurrencyUtils";
import useAxiosFetch from "../hooks/useAxiosFetch";
import { productAxiosInstance } from "../../services/AxiosService";
import AuthHeader from "../../services/AuthHeader";

const UpdateProduct = () => {
  const formProps = useForm({
    initialValues: {
      productCode: "",
      brand: "",
      productName: "",
      quantity: 0,
      price: 0.05,
    },
    validate: {
      productCode: (value) => validateInput("productName", value).error,
      brand: (value) => validateInput("brand", value).error,
      productName: (value) => validateInput("productName", value).error,
      quantity: (value) => validateInput("quantity", value).error,
    },
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);

  const { data, isLoading, error } = useAxiosFetch(
    `products/find-product?id=${id}`
  );

  useEffect(() => {
    if (data) {
      formProps.setValues({
        productCode: data.productCode,
        brand: data.brand,
        productName: data.name,
        quantity: data.quantity,
        price: Number(convertNumberToDecimal(data.price)),
      });
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      // Do something
      navigate("*");
    }
  }, [error, navigate]);

  const submitHandler = (values) => {
    setIsDisabled(true);

    showNotification({
      id: "load-data",
      loading: true,
      title: "Updating product",
      message: "Please wait and don't close this yet.",
      autoClose: false,
      disallowClose: true,
    });

    // Construct object for update existing product
    const updatedProductData = {
      ...data,
      productCode: values.productCode,
      brand: values.brand,
      name: values.productName,
      quantity: values.quantity,
      price: Number(convertDecimalToNumber(values.price)),
      lastUpdate: new Date().toISOString(),
    };

    console.log(updatedProductData);

    // Update user data
    productAxiosInstance.service
      .put("update-product", updatedProductData, {
        headers: AuthHeader(),
      })
      .then((response) => {
        // handle success
        if (!response.status === 200) {
          throw Error(`Error - ${response.status} - ${response.statusText}`);
        } else {
          console.log("User updated");
          updateNotification({
            id: "load-data",
            color: "teal",
            title: "Successfully updated product.",
            //   message: "Redirect to previous page in 5 seconds. Please wait...",
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
            title: "Failed to update product.",
            message:
              "Please try again, if reoccurring same problem please contact administrator.",
            icon: <IconX size={16} />,
            autoClose: 5000,
          });
        }
      });
  };

  return (
    <Card p="lg" radius="md" withBorder>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      <Stack spacing="sm">
        <form onSubmit={formProps.onSubmit((values) => submitHandler(values))}>
          <Stack spacing="md">
            <Title order={4}>
              Update Product - {data.brand} - {data.name}
            </Title>
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
              id="quantity"
              placeholder="Quantity"
              label="Quantity"
              min={0}
              {...formProps.getInputProps("quantity")}
            />{" "}
            <NumberInput
              withAsterisk
              disabled={isDisabled}
              id="price"
              label="Price per-unit (RM)"
              min={0.05}
              precision={2}
              step={0.05}
              {...formProps.getInputProps("price")}
            />
            <Group position="apart" mt="md">
              <Button
                disabled={isDisabled}
                component="a"
                href="/inventory"
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

export default UpdateProduct;
