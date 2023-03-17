import { Alert } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons";

const ErrorFetch = (props) => {
  return (
    <Alert
      icon={<IconAlertCircle size="1rem" />}
      title="Server Error!"
      color="red"
    >
      Error retrieve data from server, please try to refresh/reload page. If
      same error occur please contact administrator.
    </Alert>
  );
};

export default ErrorFetch;
