import React, { useState } from "react";
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  Text,
  UnstyledButton,
  createStyles,
  rem,
} from "@mantine/core";
import {
  IconCalendarStats,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: "block",
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    color: theme.black,
    fontSize: theme.fontSizes.sm,

    "&:hover": {
      backgroundColor: theme.colors.gray[0],
      color: theme.black,
    },
  },

  box: {
    fontWeight: 500,
    display: "block",
    textDecoration: "none",
    color: theme.black,

    "&:hover": {
      backgroundColor: theme.colors.gray[0],
      color: theme.black,
    },
  },

  link: {
    fontWeight: 500,
    display: "block",
    textDecoration: "none",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    paddingLeft: rem(31),
    marginLeft: rem(30),
    fontSize: theme.fontSizes.sm,
    color: theme.colors.gray[7],
    borderLeft: `${rem(1)} solid ${theme.colors.gray[3]}`,

    "&:hover": {
      backgroundColor: theme.colors.gray[0],
      color: theme.black,
    },
  },

  chevron: {
    transition: "transform 200ms ease",
  },
}));

export const LinksGroup = (props) => {
  const { icon: Icon, label, initiallyOpened, parentLink, links } = props;

  const { classes, theme } = useStyles();
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const ChevronIcon = theme.dir === "ltr" ? IconChevronRight : IconChevronLeft;

  const Links = () => {
    return links.map((link) => (
      <Text
        component={Link}
        to={link.link}
        className={classes.link}
        key={link.label}
      >
        {link.label}
      </Text>
    ));
  };

  return (
    <React.Fragment>
      <UnstyledButton
        onClick={() => setOpened((o) => !o)}
        className={classes.control}
      >
        <Group position="apart" spacing={0}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ThemeIcon
              variant="gradient"
              gradient={{ from: "lime", to: "yellow", deg: 105 }}
              size={30}
            >
              <Icon size={18} />
            </ThemeIcon>
            {parentLink ? (
              <Text ml="md" component={Link} to={parentLink}>
                {label}
              </Text>
            ) : (
              <Box ml="md">{label}</Box>
            )}
          </Box>
          {hasLinks && (
            <ChevronIcon
              className={classes.chevron}
              size={14}
              stroke={1.5}
              style={{
                transform: opened
                  ? `rotate(${theme.dir === "rtl" ? -90 : 90}deg)`
                  : "none",
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? (
        <Collapse in={opened}>
          <Text>
            <Links />
          </Text>
        </Collapse>
      ) : null}
    </React.Fragment>
  );
};

const mockdata = {
  label: "Releases",
  icon: IconCalendarStats,
  links: [
    { label: "Upcoming releases", link: "/" },
    { label: "Previous releases", link: "/" },
    { label: "Releases schedule", link: "/" },
  ],
};

export function NavbarLinksGroup() {
  return (
    <Box
      sx={(theme) => ({
        minHeight: 220,
        padding: theme.spacing.md,
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
      })}
    >
      <LinksGroup {...mockdata} />
    </Box>
  );
}
