import { MemoryRouter } from "react-router"
import Approuter from "../unit/Approuter"

export default renderWithRouter = (component, initialRoute = '/') => {
    return (
        <MemoryRouter initialEntries={[initialRoute]}>
            <Approuter />
            {component}
        </MemoryRouter>
    )
}