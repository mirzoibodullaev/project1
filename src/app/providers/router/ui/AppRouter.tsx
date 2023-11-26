import { Suspense, useCallback } from "react";
import { Route, Routes } from "react-router-dom";
import {
    AppRoutesProps,
    routeConfig,
} from "shared/config/routeConfig/routeConfig";
import PageLoader from "widgets/PageLoader/ui/PageLoader";
import { RequireAuth } from "./RequireAuth";
import { Page } from "shared/ui/Page/Page";

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: AppRoutesProps) => {
        const element = (
            <Suspense fallback={<PageLoader />}>{route.element}</Suspense>
        );
        return (
            <Route
                key={route.path}
                path={route.path}
                element={
                    route.authOnly ? (
                        <RequireAuth>{element}</RequireAuth>
                    ) : (
                        element
                    )
                }
            />
        );
    }, []);

    return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};
export default AppRouter;
