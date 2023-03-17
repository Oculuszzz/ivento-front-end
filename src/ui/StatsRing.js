import {
  RingProgress,
  Text,
  SimpleGrid,
  Paper,
  Center,
  Group,
} from "@mantine/core";
import {
  IconArrowDownRight,
  IconArrowUpRight,
  IconArrowRight,
} from "@tabler/icons-react";

const icons = {
  up: IconArrowUpRight,
  down: IconArrowDownRight,
  right: IconArrowRight,
};

export function StatsRing({ data }) {
  const stats = data.map((stat) => {
    const Icon = icons[stat.icon];
    return (
      <Paper withBorder radius="md" p="xs" key={stat.label}>
        <Group>
          <RingProgress
            size={80}
            roundCaps
            thickness={8}
            sections={[{ value: stat.progress, color: stat.color }]}
            label={
              <Center>
                <Icon stroke={1.5} />
              </Center>
            }
          />
          <div>
            <Text color="dimmed" size="md" transform="uppercase" weight={700}>
              {stat.label}
            </Text>
            <Group>
              <Text weight={700} size="xl">
                {stat.stats}
              </Text>
              <Text size="sm">{stat.stats2}</Text>
            </Group>
          </div>
        </Group>
      </Paper>
    );
  });

  return (
    <SimpleGrid cols={3} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
      {stats}
    </SimpleGrid>
  );
}
