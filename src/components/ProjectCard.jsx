import { Text, View } from "react-native";
import { Button, GhostButton } from "./Button";
import { TagIcon } from "react-native-heroicons/outline";
import { currencyFormatter } from "../currencyFormater";
import Svg, { Rect } from "react-native-svg";
import { CoverImage } from "./CoverImage";
import { TreeIcon } from "./Icons/TreeIcon";

const ProgressBar = ({ percentage }) => (
  <Svg width="100%" height="4" xmlns="http://www.w3.org/2000/svg">
    <Rect width={`${percentage}%`} height="4" fill="#F59E0B" />
  </Svg>
);

const GreyBar = ({ percentage = 100 }) => (
  <Svg width="100%" height="4" xmlns="http://www.w3.org/2000/svg">
    <Rect width={`${percentage}%`} height="4" className="fill-gray-500" />
  </Svg>
);

export const Title = ({ props, children }) => (
  <Text className="font-inter-600 text-black text-base mb-4" {...props}>
    {children}
  </Text>
);

export const TagList = ({ props, children }) => (
  <View
    className="flex flex-row align-middle border-t border-gray-100 pt-4"
    {...props}
  >
    {children}
  </View>
);

export const Tag = ({ props, icon = null, children }) => (
  <View
    className="flex flex-row justify-center align-middle border rounded border-gray-200 m-1 px-2 py-1"
    {...props}
  >
    {icon ? <TagListIcons icon={icon} /> : null}
    <Text className="ml-2">{children}</Text>
  </View>
);

export const Card = ({ children }) => {
  return (
    <View className="rounded border border-gray-100 bg-white w-full drop-shadow mb-4">
      {children}
    </View>
  );
};

const TagListIcons = ({ icon }) => {
  switch (icon) {
    case "tree":
      return <TreeIcon color="#71717A" />;
    default:
      return <TagIcon width="16" height="16" color="#71717A" />;
  }
};

export const ProjectCard = ({ project, compact, navigation }) => {
  const tagList = [
    {
      icon: "tree",
      content: `${project.treeAmount} Árvores`,
    },
    {
      icon: "tag",
      content: currencyFormatter.format(project.fullPrice),
    },
  ];

  return (
    <Card>
      <CoverImage compact={compact} />
      {compact ? <GreyBar /> : <ProgressBar percentage={65} />}
      <View className="p-4">
        <Title>{project.address}</Title>
        <TagList>
          {tagList.map((tag) => (
            <Tag icon={tag.icon} key={String(tag.content)}>
              {tag.content}
            </Tag>
          ))}
        </TagList>

        {compact ? null : (
          <View className="flex flex-row border-t border-gray-100 py-4 mt-4">
            <Button
              onPress={() => navigation.navigate("ProjectDetails", { project })}
            >
              Aceitar
            </Button>
            <GhostButton onPress={() => navigation.navigate("Projects")}>
              Recusar
            </GhostButton>
          </View>
        )}
      </View>
    </Card>
  );
};

export const CompactProjectCard = ({ project }) => (
  <ProjectCard project={project} compact />
);
