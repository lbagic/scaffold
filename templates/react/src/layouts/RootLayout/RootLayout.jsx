import { GregorianCalendar } from '@internationalized/date';
import { NextUIProvider } from '@nextui-org/react';
import { IconContext } from '@phosphor-icons/react';
import { Outlet, useNavigate } from 'react-router-dom';

export default function RootLayout() {
  const navigate = useNavigate();

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
