import React, { useEffect, useState } from "react";
import { LoadingOverlay, Group, Button, Title } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { IconCheck, IconX } from "@tabler/icons";
import { updateNotification } from "@mantine/notifications";
import UsersTable from "./UsersTable";
import ErrorFetch from "../error-fetch";
import useFetch from "../useFetch";

const Users = () => {
  const navigate = useNavigate();

  // Custom hook (useEffect) for fetch
  const { data, isLoading, error } = useFetch("http://localhost:8800/users");

  const userActivationHandler = (userData) => {
    console.log("ENABLE/DISABLE");

    const updatedUserData = {
      username: userData.username,
      role: userData.role,
      email: userData.email,
      isBlocked: userData.isBlocked ? false : true,
      avatar: userData.avatar,
    };

    // Update user data
    fetch("http://localhost:8800/users/" + userData.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUserData),
    })
      .then((response) => {
        // Do a checker from the response
        console.log(response.status + " - " + response.statusText);
        if (response.ok) {
          return response.json();
        } else {
          throw Error(response.status + " - " + response.statusText);
        }
      })
      .then(() => {
        updateNotification({
          id: "load-data",
          color: "teal",
          title: "Successfully update user.",
          message: "Redirect to previous page. Please wait...",
          icon: <IconCheck size={16} />,
          autoClose: 5000,
          disallowClose: true,
        });
        navigate("/users");
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

  const addNewUserHandler = () => {
    navigate("/add-user");
  };

  const Content = () => {
    return (
      <React.Fragment>
        {!error && !isLoading && <Title order={4}>Managing Users</Title>}
        {data && (
          <UsersTable
            onUserActivation={userActivationHandler}
            usersData={data}
          />
        )}
        {!error && !isLoading && (
          <Group position="right" mt="md">
            <Button onClick={addNewUserHandler} type="submit">
              Add new user
            </Button>
          </Group>
        )}
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      {error && <ErrorFetch error={error} />}
      {<Content />}
    </React.Fragment>
  );
};

export default Users;
