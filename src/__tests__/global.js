import React from 'react'
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import POSTER_SAMPLE from './samples/poster.json'
import SHOWS_SAMPLE from './samples/shows.json'
import SEARCH_SAMPLE from './samples/search.json'

configure({ adapter: new Adapter() });

global.React = React

global._shows = SHOWS_SAMPLE
global._search = SEARCH_SAMPLE
global._poster = POSTER_SAMPLE