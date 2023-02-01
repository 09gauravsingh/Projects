import { useEffect } from 'react';
import {fetchData} from '../src/DisplayPage/Display';

export const ErrorBoundary = ({ children }) => {
    const [hasError, setHasError] = useState(false);
    useEffect(() => {
        try {
          fetchData()
        } catch (error) {
            setHasError(true);
        }
    }, []);
    if (hasError) {
        return <h1>Something went wrong</h1>;
    } else {
        return children;
    }
}
