import { render, screen, act, waitFor } from '@testing-library/react';
import DatasContextProvider from '../Contexts/DatasContext';
import InfoObject from '../Pages/InfoObject.js';
import { BrowserRouter, Routes, MemoryRouter, Route } from 'react-router-dom'
import React from 'react'
import Error404 from "../Pages/404";
// const mockedUsedNavigate = jest.fn();
// jest.mock('react-router-dom', () => ({
//     ...jest.requireActual('react-router-dom'),
//     useLocation: jest.fn().mockReturnValue({ pathname: 'localhost:3000/art/1' }),
//     useNavigate: () => mockedUsedNavigate
// }));





describe('Arts', () => {

    it('should call useEffect', async () => {
        const spy = jest.spyOn(React, 'useEffect');
        act(() => {
            render(


                <DatasContextProvider>
                    <MemoryRouter initialEntries={["/art/247144"]}>
                        <Routes>

                            <Route path="/art/:objectID" element={<InfoObject />}>

                            </Route>
                        </Routes>
                    </MemoryRouter>
                </DatasContextProvider>


            );
        });
        expect(spy).toHaveBeenCalled();
    });


    it('test renders" ', async () => {
        render(

            <DatasContextProvider>
                <MemoryRouter initialEntries={["/art/1"]}>
                    <Routes>
                        <Route path="/art/:objectID" element={<InfoObject />}>
                            <Route path="404" element={<Error404 />} />
                        </Route>
                    </Routes>
                </MemoryRouter>
            </DatasContextProvider>
        );


        await waitFor(() => {
            expect(screen.getByTestId("Loading")).toBeInTheDocument();


        }, 
        )
    });

});
