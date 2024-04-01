import React, { Key } from 'react';
import dayjs from 'dayjs';
import { Tabs, Tab } from "@nextui-org/react";
import { TbHome } from "react-icons/tb";
import { ButtonGroup } from '../group';
import './app.css';
import { ControlButtonProps } from '../button';

/**
 * Verlichting:
 * - Navlichten
 * - Toplicht
 * - Ankerlicht
 * - Stoomlicht
 * - Deklicht
 * - Kompas
 * - Binnenverlichting (aan)
 * - Stuurautomaat (aan)
 * - AIS (aan)
 * - Koelkast (aan)
 * - @TODO: sfeerverlichting (RGB leds, Philips Hue)
 * 
 * Groepen:
 * - Mast: toplicht, stoomlicht, ankerlicht, deklicht
 * - Dek: deklicht, kompas, navlichten
 * - Binnen: Binnenverlichting, koelkast, stuurautomaat, AIS, (sfeerverlichting)
 * - Scenes: motoren ('s-nachts), zeilen ('s-nachts), ankeren ('s-nachts)
 */

const z = (x: number) => String(x < 10 ? `0${x}` : x);

const App: React.FC = () => {
  const [ selectedTab, replaceSelectedTab ] = React.useState('home');
  const [ time, replaceTime ] = React.useState([ new Date().getHours(), new Date().getHours() ]);
  const [ date, replaceDate ] = React.useState([ dayjs().format('DD'), dayjs().format('MMMM'), dayjs().format('YYYY') ]);
  const setTab = React.useCallback((key: Key) => replaceSelectedTab(String(key)), [ replaceSelectedTab ]);

  // @TODO: replace with app state manager
  const [ buttonState, replaceButtonState ] = React.useState({
    toplicht: false,
    stoomlicht: false,
    deklicht: false,
    ankerlicht: false,
    kompaslicht: false,
    navlichten: false,
    cabinelichten: true,
    koelkast: false,
    stuurautomaat: true,
    ais: true,
  });

  const toggleButton = React.useCallback((key: keyof typeof buttonState) => () => replaceButtonState((currentState) => {
    return {
      ...currentState,
      [key]: !currentState[key],
    };
  }), []);
  
  const isNight = React.useMemo(() => {
    const [ hours ] = time;
    return (hours >= 20 || hours <= 8);
  }, [ time ]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      replaceTime([ new Date().getHours(), new Date().getMinutes() ]);
      replaceDate([ dayjs().format('DD'), dayjs().format('MMMM'), dayjs().format('YYYY') ]);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const activateScene = React.useCallback((name: string) => () => {
    switch (name) {
      case 'Alles uit':
        replaceButtonState({
          toplicht: false,
          stoomlicht: false,
          deklicht: false,
          ankerlicht: false,
          kompaslicht: false,
          navlichten: false,
          cabinelichten: false,
          koelkast: false,
          stuurautomaat: false,
          ais: false,
        });
        break;
      case 'Standaard aan':
        replaceButtonState({
          toplicht: false,
          stoomlicht: false,
          deklicht: false,
          ankerlicht: false,
          kompaslicht: false,
          navlichten: false,
          cabinelichten: true,
          koelkast: false,
          stuurautomaat: true,
          ais: true,
        });
        break;
      case 'Nachtzeilen':
        replaceButtonState({
          toplicht: true,
          stoomlicht: false,
          deklicht: false,
          ankerlicht: false,
          kompaslicht: true,
          navlichten: true,
          cabinelichten: true,
          koelkast: false,
          stuurautomaat: true,
          ais: true,
        });
        break;
      case 'Ankeren':
        replaceButtonState({
          toplicht: false,
          stoomlicht: false,
          deklicht: false,
          ankerlicht: true,
          kompaslicht: false,
          navlichten: false,
          cabinelichten: true,
          koelkast: false,
          stuurautomaat: false,
          ais: true,
        });
        break;
    }
  }, []);

  const mast: ControlButtonProps[] = [{ label: 'Toplicht', state: buttonState.toplicht, onPress: toggleButton('toplicht') }, { label: 'Stoomlicht', state: buttonState.stoomlicht, onPress: toggleButton('stoomlicht') }, { label: 'Deklicht', state: buttonState.deklicht, onPress: toggleButton('deklicht') }, { label: 'Ankerlicht', state: buttonState.ankerlicht, onPress: toggleButton('ankerlicht') }];
  const outside: ControlButtonProps[] = [{ label: 'Deklicht', state: buttonState.deklicht, onPress: toggleButton('deklicht') }, { label: 'Kompaslicht', state: buttonState.kompaslicht, onPress: toggleButton('kompaslicht') }, { label: 'Navlichten', state: buttonState.navlichten, onPress: toggleButton('navlichten') }];
  const inside: ControlButtonProps[] = [{ label: 'Cabinelichten', state: buttonState.cabinelichten, onPress: toggleButton('cabinelichten') }, { label: 'Koelkast', state: buttonState.koelkast, onPress: toggleButton('koelkast') }, { label: 'Stuurautomaat', state: buttonState.stuurautomaat, onPress: toggleButton('stuurautomaat') }, { label: 'AIS', state: buttonState.ais, onPress: toggleButton('ais') }];
  const scenes: ControlButtonProps[] = [{ color: '#e11d48', momentary: true, label: 'Alles uit', onPress: activateScene('Alles uit')}, { color: '#16a34a', momentary: true, label: 'Standaard aan', onPress: activateScene('Standaard aan') }, { color: '#3730a3', momentary: true, label: 'Nachtzeilen', onPress: activateScene('Nachtzeilen') }, { color: '#115e59', momentary: true, label: 'Ankeren', onPress: activateScene('Ankeren') }];
  const home: ControlButtonProps[] = [
    { color: '#115e59', momentary: true, label: 'Mast', onPress: () => setTab('mast') },
    { color: '#164e63', momentary: true, label: 'Scenes', onPress: () => setTab('scenes') },
    { color: '#1e293b', momentary: true, label: 'Buiten', onPress: () => setTab('outside') },
    { color: '#1e1b4b', momentary: true, label: 'Binnen', onPress: () => setTab('inside') },
  ]
  
  return (
    <main className={["select-none", "text-foreground", "bg-background", isNight ? "dark" : "light"].join(' ')}>
      <div className="app">
        <div className="row">
          <h1 className="text-3xl font-bold">
            X-Miles
          </h1>
        </div>

        <div className="row" style={{ marginTop: '6px', opacity: 0.7 }}>
          <p className="text-m">
            {date.join(' ').toLowerCase()}, <code>{time.map(z).join(':')}</code>
          </p>
        </div>

        {selectedTab === 'home' && (<ButtonGroup buttons={home} />)}
        {selectedTab === 'scenes' && (<ButtonGroup buttons={scenes} />)}
        {selectedTab === 'mast' && (<ButtonGroup buttons={mast} />)}
        {selectedTab === 'outside' && (<ButtonGroup buttons={outside} />)}
        {selectedTab === 'inside' && (<ButtonGroup buttons={inside} />)}

        <div className="bottom-row">
          <Tabs size='lg' radius='full' color='danger' selectedKey={selectedTab} onSelectionChange={setTab}>
            <Tab key="home" title={<span className="tab-label"><TbHome size={14} /> Home</span>} />
            <Tab key="scenes" title="Scenes" />
            <Tab key="mast" title="Mast" />
            <Tab key="outside" title="Buiten" />
            <Tab key="inside" title="Binnen" />
          </Tabs>
        </div>
      </div>
    </main>
  );
}

export default App;
