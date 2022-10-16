import { ComponentMeta, ComponentStory } from '@storybook/react';

import { AuthLayout } from '.';
import { Button, Heading, Input } from '../../';

export default {
  title: 'AuthLayout',
  component: AuthLayout,
} as ComponentMeta<typeof AuthLayout>;

const Template: ComponentStory<typeof AuthLayout> = (args) => (
  <AuthLayout {...args}>
    <Heading className="mb-60 text-center">Auth form</Heading>
    <form className="mb-6 flex flex-col gap-y-40">
      <Input label="Email" fullWidth />
      <Input label="Username" fullWidth />
      <Input label="password" fullWidth />
      <Button
        type="button"
        className="self-end"
        color="blue"
        size="lg"
        uppercase
      >
        Submit
      </Button>
    </form>
  </AuthLayout>
);

export const DefaultAuthLayout = Template.bind({});
