// Import fonts (register them in tailwind.config.js)
import '@fontsource-variable/inter';

import { GregorianCalendar } from '@internationalized/date';
import { NextUIProvider } from '@nextui-org/react';
import { IconContext } from '@phosphor-icons/react';
import nProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useEffect } from 'react';
import { Outlet, useNavigate, useNavigation } from 'react-router';

nProgress.configure({
  showSpinner: false,
  template:
    '<div class="bar" role="bar" style="background: hsl(var(--color-primary));"></div>',
});

export default function RootLayout() {
  const navigate = useNavigate();
  const navigation = useNavigation();

  useEffect(() => {
    if (navigation.state === 'loading') nProgress.start();
    else nProgress.done();
  }, [navigation.state]);

  return (
    <IconContext.Provider value={{ size: 16, weight: 'bold' }}>
      <NextUIProvider
        navigate={navigate}
        locale="en-US"
        className="h-full"
        validationBehavior="native"
        createCalendar={calendar => {
          if (calendar === 'gregory') return new GregorianCalendar();
          throw new Error(`Unsupported calendar ${calendar}`);
        }}
      >
        <Outlet />
      </NextUIProvider>
    </IconContext.Provider>
  );
}
