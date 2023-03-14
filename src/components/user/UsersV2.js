import React, { useState, useEffect } from "react";
import {
  Menu,
  ActionIcon,
  Group,
  Box,
  Avatar,
  Badge,
  Title,
  Text,
  Button,
  SimpleGrid,
  Card,
} from "@mantine/core";
import {
  IconDots,
  IconPencil,
  IconLockAccess,
  IconLockAccessOff,
  IconCheck,
  IconX,
} from "@tabler/icons";
import { showNotification, updateNotification } from "@mantine/notifications";
import { DataTable } from "mantine-datatable";
import { useNavigate } from "react-router-dom";
import useAxiosFetch from "../hooks/useAxiosFetch";
import { lastActive } from "../../utils/DateUtils";
import { userAxiosInstance } from "../../services/AxiosService";
import AuthHeader from "../../services/AuthHeader";

const PAGE_SIZE = 9;

const roleColors = {
  USER: "blue",
  ADMIN: "cyan",
};

const UsersV2 = () => {
  // Custom hook (useEffect) for fetch
  const { data, isLoading, error } = useAxiosFetch("users");

  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setRecords(data ? data.slice(from, to) : []);
  }, [page, data]);

  const userActivationHandler = (userData) => {
    showNotification({
      id: "load-data",
      loading: true,
      title: "Updating user",
      message: "Please wait and don't close this yet.",
      autoClose: false,
      disallowClose: true,
    });

    const url = userData.blocked ? `/enable-account` : `/disable-account`;

    userAxiosInstance.service
      .put(
        url,
        {
          id: userData.id,
        },
        {
          headers: AuthHeader(),
        }
      )
      .then((response) => {
        // handle success
        if (!response.status === 200) {
          throw Error(`Error - ${response.status} - ${response.statusText}`);
        } else {
          console.log("User updated");
          updateNotification({
            id: "load-data",
            color: "teal",
            title: "Successfully updated user.",
            //   message: "Redirect to previous page in 5 seconds. Please wait...",
            icon: <IconCheck size={16} />,
            autoClose: 5000,
            disallowClose: true,
          });

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
            title: "Failed to update user.",
            message:
              "Please try again, if reoccurring same problem please contact administrator.",
            icon: <IconX size={16} />,
            autoClose: 5000,
          });
        }
      });
  };

  const editUserHandler = (userId) => {
    navigate(`update-user/${userId}`);
  };

  const addNewUserHandler = () => {
    navigate("/add-user");
  };

  return (
    <Card p="lg" radius="md" withBorder>
      <SimpleGrid cols={1} verticalSpacing="lg">
        {!error && !isLoading && <Title order={4}>Users Management</Title>}
        <Box sx={{ height: 582 }}>
          <DataTable
            textSelectionDisabled
            withBorder
            columns={[
              {
                accessor: "username",
                title: <Text>User</Text>,
                // sortable: true,
                render: (user) => (
                  <Group spacing="sm">
                    <Avatar size={40} src={user.avatar} radius={40} />
                    <div>
                      <Text size="sm" weight={500}>
                        {user.username}
                      </Text>
                      <Text size="xs" color="dimmed">
                        {user.email}
                      </Text>
                    </div>
                  </Group>
                ),
              },
              {
                accessor: "role",
                // sortable: true,
                render: (user) => (
                  <Badge color={roleColors[user.role]}>{user.role}</Badge>
                ),
              },
              {
                accessor: "lastActive",
                // sortable: true,
                title: <Text>Last active</Text>,
                render: (user) => {
                  return `${lastActive(new Date(user.lastLoggedIn))} days ago`;
                },
              },
              {
                accessor: "status",
                // sortable: true,
                render: (user) => {
                  return !user.blocked ? (
                    <Badge fullWidth>Active</Badge>
                  ) : (
                    <Badge color="pink" fullWidth>
                      Disabled
                    </Badge>
                  );
                },
              },
              {
                accessor: "actions",
                title: "",
                render: (user) => {
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
                              editUserHandler(user.id);
                            }}
                            icon={<IconPencil size={16} stroke={1.5} />}
                          >
                            Edit user
                          </Menu.Item>
                          <Menu.Item
                            onClick={() => {
                              userActivationHandler(user);
                            }}
                            data={user}
                            icon={
                              user.blocked ? (
                                <IconLockAccess size={16} stroke={1.5} />
                              ) : (
                                <IconLockAccessOff size={16} stroke={1.5} />
                              )
                            }
                            color={user.blocked ? "blue" : "red"}
                          >
                            {user.blocked
                              ? "Enable account"
                              : "Disable account"}
                          </Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </Group>
                  );
                },
              },
            ]}
            records={records}
            fetching={isLoading}
            loaderVariant="oval"
            totalRecords={data ? data.length : 0}
            recordsPerPage={PAGE_SIZE}
            page={page}
            onPageChange={(p) => setPage(p)}
          />
        </Box>
        {!error && !isLoading && (
          <Group position="right" mt="md">
            <Button onClick={addNewUserHandler} type="submit">
              Add new user
            </Button>
          </Group>
        )}
      </SimpleGrid>
    </Card>
  );
};

export default UsersV2;
