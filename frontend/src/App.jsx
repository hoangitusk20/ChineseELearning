import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./shared/layouts/AuthLayout";
import LoginPage from "./features/Auth/LoginPage";
import MainLayout from "./shared/layouts/MainLayout";
import HomePage from "./features/Home/HomePage";
import store from "./shared/store";
import { Provider } from "react-redux";
import RegisterPage from "./features/Auth/RegisterPage";
import LearnByTopicPage from "./features/LearnByTopic/LearnByTopicPage";
import LearnByVocabPage from "./features/LearnByVocab/LearnByVocabPage";
import LearnWritingPage from "./features/LearnWriting/LearnWritingPage";
import MaterialsPage from "./features/Materials/MaterialsPage";
import PrivateRoute from "./shared/components/PrivateRoute";
import ProfilePage from "./features/Profile/ProfilePage";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/create-story-from-topic"
              element={
                <PrivateRoute>
                  <LearnByTopicPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/create-story-from-vocabulary"
              element={
                <PrivateRoute>
                  <LearnByVocabPage />
                </PrivateRoute>
              }
            />
            <Route path="/practice-writing" element={<LearnWritingPage />} />
            <Route path="/learning-materials" element={<MaterialsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
