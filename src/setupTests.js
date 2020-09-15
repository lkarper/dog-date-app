import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

global.URL.createObjectURL = jest.fn();

global.scrollTo = jest.fn();
