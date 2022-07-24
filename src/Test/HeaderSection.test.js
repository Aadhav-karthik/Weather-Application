
import { fireEvent, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithProviders from './testStore';
import HeaderSection from '../Components/HeaderSection';


it("Header displayed correctly", () => {
    renderWithProviders(<HeaderSection />);
    expect(screen.getByTestId('pageHeader').textContent).toBe('ReactWeather');
});

it("City dropdown input option validation Chennai", () => {
    renderWithProviders(<HeaderSection />);
    fireEvent.change(screen.getByTestId('searchBar'), { target: { value: "Ch" } });
    expect(screen.getByTestId('dropdownList').textContent).toBe("Chennai");

})

it("City dropdown input option validation Bengaluru", () => {
    renderWithProviders(<HeaderSection />);
    fireEvent.change(screen.getByTestId('searchBar'), { target: { value: "B" } });
    expect(screen.getByTestId('dropdownList').textContent).toBe("Bengaluru");
})

it("Mouse Click City Dropdown verification", () => {
    renderWithProviders(<HeaderSection />);
    
    fireEvent(screen.getByTestId('searchBar'), new MouseEvent('click', { bubbles: true }));
    expect(screen.getByTestId("dropdownList").textContent).toContain("Chennai");

    fireEvent(screen.getByTestId('searchBar'), new MouseEvent('click', { bubbles: true }));
    expect(screen.queryByTestId("dropdownList")).not.toContain("Chennai");
})