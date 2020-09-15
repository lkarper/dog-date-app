import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

global.URL.createObjectURL = jest.fn();

global.scrollTo = jest.fn();

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
    GeolocateControl: jest.fn(),
    Map: jest.fn(() => ({
      addControl: jest.fn(),
      on: jest.fn(),
      remove: jest.fn(),
    })),
    NavigationControl: jest.fn(),
    Marker: jest.fn(() => ({
        setLngLat: jest.fn(() => ({
            addTo: jest.fn(),
        })),
    })),
  }));
