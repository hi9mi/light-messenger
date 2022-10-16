import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Text } from './text';

export default {
  title: 'Text',
  component: Text,
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const DefaultText = Template.bind({});
DefaultText.args = {
  children:
    'Default text loram ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor incididunt ut labore et dolore magna aliquyam. Ut enim ad minim veniam, justify merge20421st et dolore magna aliquyam. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy eirmod tempor incididunt ut <labore></labore>',
};
