import '@testing-library/jest-dom';
import { setGlobalConfig } from '@storybook/testing-react';
//@ts-ignore
import * as globalStorybookConfig from '../.storybook/preview.cjs';

setGlobalConfig(globalStorybookConfig);
