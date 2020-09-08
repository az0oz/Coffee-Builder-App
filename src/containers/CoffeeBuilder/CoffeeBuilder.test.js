import React from 'react';
import { CoffeeBuilder } from './CoffeeBuilder'

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import BuildControls from '../../components/Coffee/BuildControls/BuildControls';

configure({adapter: new Adapter()})

describe('<CoffeeBuilder />', () => {
    let wrapper;

    beforeEach(() => {
         wrapper = shallow(<CoffeeBuilder initIngredientsHandler={() => {}} />)
    })

    it('should render two <BuildControls /> when receiving ingredients', () => {
        wrapper.setProps({ingredients: {
            shot: 0
        }})
        expect(wrapper.find(BuildControls)).toHaveLength(1)
    });


})

