import type { ComponentType } from 'react';
import { createBrowserRouter, redirect } from 'react-router';
import { LoadingPlaceholder } from '../shared/components/LoadingPlaceholder';
import { AppLayout } from './AppLayout';
import { NotFoundPage } from './NotFoundPage';
import { RouteErrorPage } from './RouteErrorPage';

export const SIGN_IN_PATH = '/sign-in';

// The code of a page is downloaded only when the page is opened.
function page(load: () => Promise<{ default: ComponentType }>) {
  return async () => ({ Component: (await load()).default });
}

export const router = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    ErrorBoundary: RouteErrorPage,
    HydrateFallback: LoadingPlaceholder,
    children: [
      {
        // A failure of one page leaves the menu on the screen.
        ErrorBoundary: RouteErrorPage,
        children: [
          { index: true, loader: () => redirect(SIGN_IN_PATH) },
          { path: 'sign-in', lazy: page(() => import('../features/auth/pages/SignInPage')) },
          { path: 'lessons', lazy: page(() => import('../features/lessons/pages/LessonsPage')) },
          {
            path: 'lessons/:lessonId',
            lazy: page(() => import('../features/lessons/pages/LessonSummaryPage')),
          },
          { path: 'students', lazy: page(() => import('../features/students/pages/StudentsPage')) },
          {
            path: 'students/:studentId',
            lazy: page(() => import('../features/students/pages/StudentCardPage')),
          },
          {
            path: 'students/:studentId/proposals/:proposalId',
            lazy: page(() => import('../features/students/pages/AdaptationProposalPage')),
          },
          {
            path: 'students/:studentId/homework/new',
            lazy: page(() => import('../features/students/pages/HomeworkAssignmentPage')),
          },
          {
            path: 'library',
            lazy: page(() => import('../features/library/pages/AuthorLibraryPage')),
          },
          {
            path: 'library/upload',
            lazy: page(() => import('../features/library/pages/MaterialUploadPage')),
          },
          {
            path: 'library/materials/:materialId/split',
            lazy: page(() => import('../features/library/pages/DocumentSplitPage')),
          },
          {
            path: 'library/materials/:materialId/report',
            lazy: page(() => import('../features/library/pages/ParsingReportPage')),
          },
          {
            path: 'library/materials/:materialId/flagged',
            lazy: page(() => import('../features/library/pages/FlaggedItemsPage')),
          },
          {
            path: 'library/exercises/:exerciseId/presentation',
            lazy: page(() => import('../features/library/pages/ExercisePresentationPage')),
          },
          { path: 'today', lazy: page(() => import('../features/today/pages/DailyQueuePage')) },
          {
            path: 'today/tasks/:taskId',
            lazy: page(() => import('../features/today/pages/TaskPage')),
          },
          { path: 'level', lazy: page(() => import('../features/level/pages/MyLevelPage')) },
          { path: 'profile', lazy: page(() => import('../features/profile/pages/ProfilePage')) },
          { path: '*', Component: NotFoundPage },
        ],
      },
    ],
  },
]);
