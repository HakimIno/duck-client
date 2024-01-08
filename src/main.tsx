import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import ProtectedRoutes from './components/ProtectedRoutes.tsx'
import { ApolloProvider } from '@apollo/client'
import { client } from './utils/apollo-client.ts'
import { NextUIProvider } from '@nextui-org/react'
import loadable from '@loadable/component';

const Feed = loadable(() => import('./page/Feed.tsx'));
const Upload = loadable(() => import('./page/Upload.tsx'));
const Profile = loadable(() => import('./page/Profile.tsx'));
const Post = loadable(() => import('./page/Post.tsx'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoutes>
        <Feed />
      </ProtectedRoutes>
    )
  },
  {
    path: '/upload',
    element: (
      <ProtectedRoutes>
        <Upload />
      </ProtectedRoutes>
    )
  },
  {
    path: '/following',
    element: (
      <ProtectedRoutes>
        <Profile />
      </ProtectedRoutes>
    )
  },
  {
    path: '/live',
    element: (
      <ProtectedRoutes>
        <Profile />
      </ProtectedRoutes>
    )
  },
  {
    path: '/profile/:id',
    element: (
      <ProtectedRoutes>
        <Profile />
      </ProtectedRoutes>
    )

  },
  {
    path: '/post/:id',
    element: (
      <ProtectedRoutes>
        <Post />
      </ProtectedRoutes>
    )
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <NextUIProvider>
        <RouterProvider router={router} />
        <App />
      </NextUIProvider>
    </ApolloProvider>

  </React.StrictMode >,
)
