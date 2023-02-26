import React, { useEffect } from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import Arts, { state, loadData } from '../Components/Arts.js';
import  DatasContextProvider  from '../Contexts/DatasContext';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: jest.fn().mockReturnValue({ pathname: '/' }),
}));





describe('Arts', () => {

    it('should call useEffect', async() => {
        const spy = jest.spyOn(React, 'useEffect');
       await  act(() => {
            render(<DatasContextProvider>
                <Arts />
            </DatasContextProvider>);
        });
        expect(spy).toHaveBeenCalled;
    });


    it('test renders" ', async () => {
         render(
            <DatasContextProvider>
                <Arts />
            </DatasContextProvider>);

        await waitFor(() => {
        expect(screen.getByTestId("Cards-elements")).toBeInTheDocument();
        })

 
       
    });

});
