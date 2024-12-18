import { Routes, Route } from 'react-router-dom';

import Home from '../pages/home';
import RootLayout from '../layouts/root';
import ProfilePage from '../pages/profile-page';
import GistDetailPage from '../pages/gist-detail-page';
import CreateGistPage from '../pages/create-gist-page';
import ProtectedRootLayout from '../layouts/protected-root';

export const App = () => {
    return (
        <div>
            <Routes>
                <Route element={<RootLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="gists/:id" element={<GistDetailPage />} />
                </Route>
                <Route element={<ProtectedRootLayout />}>
                    <Route path="profile" element={<ProfilePage />} />
                    <Route
                        path="profile/starred-gists"
                        element={<ProfilePage getStarredGists={true} />}
                    />
                    <Route path="gists/new" element={<CreateGistPage />} />
                </Route>
            </Routes>
        </div>
    );
};
