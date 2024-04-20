import {useEffect, useState} from "react";

type MediaQuery = string;

function useMediaQuery(query: MediaQuery): boolean {
    const [matches, setMatches] = useState<boolean>(() => window.matchMedia(query).matches);

    useEffect(() => {
        const mediaQueryList = window.matchMedia(query);

        const handleMediaQueryChange = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };

        setMatches(mediaQueryList.matches);

        mediaQueryList.addEventListener('change', handleMediaQueryChange);

        return () => {
            mediaQueryList.removeEventListener('change', handleMediaQueryChange);
        };
    }, [query]);

    return matches;
}

export default useMediaQuery;