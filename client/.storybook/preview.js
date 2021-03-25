import { ThemeProvider } from '@emotion/react';
import { addDecorator } from '@storybook/react';
import { withThemesProvider } from 'storybook-addon-emotion-theme';
import theme from './../src/theme'
import { INITIAL_VIEWPORTS} from '@storybook/addon-viewport';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  viewport: {
    viewports: {
       ...INITIAL_VIEWPORTS,
    },
  },
}

addDecorator(storyFn => (
  <ThemeProvider theme={theme}>
      <div style={{margin: "0 auto"}}>
        {storyFn()}
      </div>
  </ThemeProvider>
));

addDecorator(withThemesProvider([theme]));